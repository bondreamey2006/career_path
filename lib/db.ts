import {
  CareerRole,
  RoleRoadmap,
  SkillItem,
  SkillGapRequest,
  SkillGapResponse,
  RecoveryPlanRequest,
  RecoveryPlanResponse,
  SimulateRequest,
  SimulateResponse,
  SimulationCurvePoint,
  AtsCheckRequest,
  AtsCheckResponse,
  ReadinessOverview,
  SeverityRankedSkill,
} from "@/types";
import { CAREER_ROLES } from "@/data/roles";
import { ROLE_ROADMAPS } from "@/data/roadmaps";
import { MASTER_SKILLS, SKILL_SYNONYMS } from "@/data/skills";
import {
  computeRecoveryMetrics,
  generate12WeekRecoveryPlan,
} from "@/data/recoveryTemplates";

/**
 * Data Access Layer (can be swapped for Supabase/Prisma later without touching API routes or UI)
 */

export async function getRoles(): Promise<CareerRole[]> {
  return CAREER_ROLES;
}

export async function getRoleBySlug(slug: string): Promise<CareerRole | undefined> {
  return CAREER_ROLES.find(
    (r) => r.slug.toLowerCase() === slug.toLowerCase() || r.id.toLowerCase() === slug.toLowerCase()
  );
}

export async function getRoadmapByRoleId(roleId: string): Promise<RoleRoadmap | undefined> {
  const normalizedId = roleId.toLowerCase();
  return (
    ROLE_ROADMAPS[normalizedId] ||
    ROLE_ROADMAPS["full-stack"]
  );
}

export async function getAllRoadmaps(): Promise<Record<string, RoleRoadmap>> {
  return ROLE_ROADMAPS;
}

export async function getMasterSkills(): Promise<SkillItem[]> {
  return MASTER_SKILLS;
}

/**
 * Skill extraction from raw resume text or skill array
 */
function extractSkills(text: string): Set<string> {
  const found = new Set<string>();
  const lower = text.toLowerCase();

  // Check synonym mappings
  for (const [term, skillId] of Object.entries(SKILL_SYNONYMS)) {
    // Regex boundary matching for clean words
    const regex = new RegExp(`(?:^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|[^a-z0-9])`, "i");
    if (regex.test(lower)) {
      found.add(skillId);
    }
  }

  // Check direct master skill names
  for (const skill of MASTER_SKILLS) {
    const skillNameLower = skill.name.toLowerCase();
    if (lower.includes(skillNameLower) || lower.includes(skill.id.toLowerCase())) {
      found.add(skill.id);
    }
  }

  return found;
}

export async function analyzeSkillGap(req: SkillGapRequest): Promise<SkillGapResponse> {
  const role = await getRoleBySlug(req.role) || CAREER_ROLES[0];
  const required = role.coreSkills;

  let candidateSkillIds = new Set<string>();

  if (req.resumeText && req.resumeText.trim().length > 0) {
    candidateSkillIds = extractSkills(req.resumeText);
  }

  if (req.skills && Array.isArray(req.skills)) {
    req.skills.forEach((s) => {
      const syn = SKILL_SYNONYMS[s.toLowerCase()] || s.toLowerCase();
      candidateSkillIds.add(syn);
    });
  }

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const severityRankedMissing: SeverityRankedSkill[] = [];

  let matchedWeight = 0;
  let totalWeight = 0;

  for (const skill of required) {
    totalWeight += skill.weight;
    if (candidateSkillIds.has(skill.id)) {
      matchedSkills.push(skill.name);
      matchedWeight += skill.weight;
    } else {
      missingSkills.push(skill.name);

      let severity: "CRITICAL" | "HIGH" | "MEDIUM" = "MEDIUM";
      if (skill.weight >= 5) severity = "CRITICAL";
      else if (skill.weight === 4) severity = "HIGH";

      severityRankedMissing.push({
        skill: skill.name,
        category: skill.category,
        severity,
        recommendation: `Target ${skill.name} in Stage 1/2 of roadmap. Highly scrutinized by tech recruiters for ${role.title}.`,
        learningHours: skill.weight * 7,
      });
    }
  }

  // Base readiness score
  const readinessScore = totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0;

  // Build targeted action plan
  const actionPlan: string[] = [];
  if (missingSkills.length === 0) {
    actionPlan.push("Ready to apply: Focus on interview mocks, portfolio polish, and direct outreach.");
  } else {
    actionPlan.push(`Priority 1: Immediately tackle ${severityRankedMissing.filter(s => s.severity === 'CRITICAL').map(s => s.skill).slice(0, 3).join(", ") || missingSkills[0]}`);
    actionPlan.push("Priority 2: Build a focused mini-project showcasing these exact missing skills on GitHub.");
    actionPlan.push("Priority 3: Update resume bullet points with quantifiable performance metrics.");
  }

  return {
    role: role.id,
    roleTitle: role.title,
    readinessScore,
    matchedSkills,
    missingSkills,
    severityRankedMissing,
    actionPlan,
  };
}

export async function getRecoveryPlan(req: RecoveryPlanRequest): Promise<RecoveryPlanResponse> {
  const role = await getRoleBySlug(req.targetRole) || CAREER_ROLES[0];
  const metrics = computeRecoveryMetrics(req.cgpa, req.backlogs, req.semester, req.hoursPerWeek);
  const weeklyPlan = generate12WeekRecoveryPlan(req.cgpa, req.backlogs, req.semester, req.hoursPerWeek, role.title);

  return {
    riskScore: metrics.riskScore,
    timeToReboundMonths: metrics.timeToReboundMonths,
    academicVsUpskillRatio: `${Math.round(metrics.academicRatio * 100)}% Academics / ${Math.round(metrics.upskillRatio * 100)}% Upskilling`,
    adviceSummary: metrics.adviceSummary,
    weeklyPlan,
    examSprintWeeks: [7, 8, 11, 12],
    reassuranceMessage: metrics.reassuranceMessage,
  };
}

export async function simulateReadiness(req: SimulateRequest): Promise<SimulateResponse> {
  const role = await getRoleBySlug(req.targetRole) || CAREER_ROLES[0];
  const weeks = Math.max(2, Math.min(52, req.weeks));
  const studyHours = Math.max(2, Math.min(80, req.studyHours));

  // Determine baseline readiness from current skills
  let baseline = 15;
  if (req.currentSkills && req.currentSkills.length > 0) {
    const matchedCount = req.currentSkills.filter((s) =>
      role.coreSkills.some((cs) => cs.name.toLowerCase().includes(s.toLowerCase()) || cs.id.toLowerCase() === s.toLowerCase())
    ).length;
    baseline = Math.min(50, Math.round((matchedCount / role.coreSkills.length) * 50) + 15);
  }

  // Calculate efficiency factor with diminishing returns
  // 10-25 hrs/week is the golden zone (1.0x).
  // 26-40 hrs/week has slight fatigue (0.85x).
  // >40 hrs/week has sharp diminishing returns (0.6x).
  let burnoutRisk: "LOW" | "BALANCED" | "HIGH" | "UNSUSTAINABLE" = "BALANCED";
  if (studyHours < 12) burnoutRisk = "LOW";
  else if (studyHours <= 28) burnoutRisk = "BALANCED";
  else if (studyHours <= 42) burnoutRisk = "HIGH";
  else burnoutRisk = "UNSUSTAINABLE";

  const curve: SimulationCurvePoint[] = [];
  let cumulativeEffective = 0;
  let estimatedWeeksToJobReady = -1;

  for (let w = 1; w <= weeks; w++) {
    let effectiveThisWeek = studyHours;
    if (studyHours > 42) {
      effectiveThisWeek = 28 + (14 * 0.75) + ((studyHours - 42) * 0.45);
    } else if (studyHours > 28) {
      effectiveThisWeek = 28 + ((studyHours - 28) * 0.8);
    }

    cumulativeEffective += effectiveThisWeek;

    // Asymptotic progress curve formula
    // Progress scales toward 98% maximum
    const maxGain = 98 - baseline;
    const progressFactor = 1 - Math.exp(-0.0052 * cumulativeEffective);
    const readiness = Math.min(98, Math.round(baseline + maxGain * progressFactor));

    if (readiness >= 80 && estimatedWeeksToJobReady === -1) {
      estimatedWeeksToJobReady = w;
    }

    let milestone = "Foundations in progress";
    if (readiness >= 90) milestone = "Interview-Ready & Portfolio Deployed";
    else if (readiness >= 75) milestone = "Core Capstone Deployed with Auth & DB";
    else if (readiness >= 55) milestone = "Component Architecture Mastered";
    else if (readiness >= 35) milestone = "Language Syntax & Git Confirmed";

    curve.push({
      week: w,
      readiness,
      cumulativeHours: Math.round(cumulativeEffective),
      milestone,
      paceDescription: `${studyHours}h/wk @ ${Math.round(readiness)}% readiness`,
    });
  }

  const finalReadiness = curve[curve.length - 1].readiness;
  if (estimatedWeeksToJobReady === -1) {
    // Project beyond input weeks if not yet reached
    const remainingTo80 = Math.max(0, 80 - finalReadiness);
    estimatedWeeksToJobReady = weeks + Math.ceil(remainingTo80 / (studyHours * 0.25));
  }

  let verdict = "";
  if (burnoutRisk === "UNSUSTAINABLE") {
    verdict = "⚠️ High burnout alert: 40+ hours/week while balancing college risks rapid fatigue. Pull back to 25-30h/week for sustainable compounding.";
  } else if (finalReadiness >= 85) {
    verdict = `🔥 Excellent pace! At ${studyHours} hrs/week, you hit job readiness (80%+) around Week ${estimatedWeeksToJobReady} with room for deep interview mocks.`;
  } else {
    verdict = `Steady progress: At ${studyHours} hrs/week, you reach ${finalReadiness}% readiness in ${weeks} weeks. Add ~4 hrs/week if you want to reach placement cutoffs faster.`;
  }

  return {
    projectedReadinessCurve: curve,
    estimatedWeeksToJobReady,
    finalReadiness,
    recommendedIntensity: studyHours >= 20 && studyHours <= 30 ? "OPTIMAL (20-30h/wk)" : "ADJUSTABLE",
    burnoutRisk,
    verdict,
  };
}

export async function checkResumeAts(req: AtsCheckRequest): Promise<AtsCheckResponse> {
  const role = await getRoleBySlug(req.targetRole) || CAREER_ROLES[0];
  const text = req.resumeText || "";
  const lower = text.toLowerCase();

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  let matchedWeight = 0;
  let totalWeight = 0;

  for (const skill of role.coreSkills) {
    totalWeight += skill.weight;
    const regex = new RegExp(`(?:^|[^a-z0-9])${skill.name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|[^a-z0-9])`, "i");
    const idRegex = new RegExp(`(?:^|[^a-z0-9])${skill.id}(?:$|[^a-z0-9])`, "i");

    if (regex.test(lower) || idRegex.test(lower) || lower.includes(skill.name.toLowerCase())) {
      matchedKeywords.push(skill.name);
      matchedWeight += skill.weight;
    } else {
      missingKeywords.push(skill.name);
    }
  }

  // Formatting checks
  const formattingFeedback: string[] = [];
  const hasNumbersOrMetrics = /\b\d+(?:%|\+|k|ms|s|x|rps)\b/i.test(text);
  const hasActionVerbs = /\b(architected|engineered|deployed|optimized|reduced|orchestrated|implemented|refactored)\b/i.test(text);
  const hasGitHubOrLiveUrl = /(?:github\.com|vercel\.app|render\.com|netlify\.app|https?:\/\/)/i.test(text);

  if (!hasNumbersOrMetrics) {
    formattingFeedback.push("Missing quantifiable metrics (e.g. 'reduced latency by 34%', 'handled 5,000 requests'). ATS and recruiters filter for impact numbers.");
  } else {
    formattingFeedback.push("Strong metric density detected (percentages, throughput, or speed gains).");
  }

  if (!hasActionVerbs) {
    formattingFeedback.push("Weak verb usage. Replace passive phrases like 'worked on' or 'helped with' with punchy verbs ('Architected', 'Containerized', 'Benchmarked').");
  }

  if (!hasGitHubOrLiveUrl) {
    formattingFeedback.push("No live deployment or GitHub links found! Live URLs are the single biggest proof-of-work factor for students with backlogs.");
  }

  // ATS Score calculation
  const keywordScore = totalWeight > 0 ? (matchedWeight / totalWeight) * 70 : 0;
  let hygieneBonus = 0;
  if (hasNumbersOrMetrics) hygieneBonus += 12;
  if (hasActionVerbs) hygieneBonus += 10;
  if (hasGitHubOrLiveUrl) hygieneBonus += 8;

  const atsScore = Math.min(96, Math.max(22, Math.round(keywordScore + hygieneBonus)));

  const bulletSuggestions = [
    {
      originalExample: "Built a website using React and Node.js for an online store.",
      improvedVersion: `Architected full-stack e-commerce platform using Next.js 14, PostgreSQL & Prisma; reduced query response latency by 42% via Redis caching.`,
      rationale: "Adds technical depth, specific database tooling, and an engineering metric.",
    },
    {
      originalExample: "Handled user authentication and database queries.",
      improvedVersion: `Engineered secure stateless authentication using JWT and HttpOnly cookies with RBAC, protecting 12 API endpoints from unauthorized traversal.`,
      rationale: "Shows concrete security mechanisms and exact scope of defense.",
    },
    {
      originalExample: "Worked on machine learning model to predict student scores.",
      improvedVersion: `Trained XGBoost regression model with 88.4% R² score; deployed inference endpoint using FastAPI with sub-80ms p95 response time.`,
      rationale: "Replaces vague claim with actual statistical accuracy and production latency.",
    },
  ];

  let placementFitSummary = "";
  if (atsScore >= 78) {
    placementFitSummary = "High ATS match. Your resume parses cleanly for automated screeners. Ensure your GitHub repos have crisp READMEs and live demo links.";
  } else if (atsScore >= 55) {
    placementFitSummary = "Moderate match. You have core skills but are missing several high-frequency tech keywords and quantifiable outcome bullets.";
  } else {
    placementFitSummary = "Critical keyword deficiency. Automated screening systems will likely discard this resume before a human engineer ever reads it.";
  }

  return {
    atsScore,
    matchedKeywords,
    missingKeywords,
    formattingFeedback,
    bulletSuggestions,
    placementFitSummary,
  };
}

export async function getReadinessOverview(): Promise<ReadinessOverview> {
  return {
    readinessScore: 82,
    streakDays: 14,
    modulesCompleted: 18,
    totalModules: 24,
    activeMilestone: "Full-Stack Project: Distributed Task Engine",
    targetRoleTitle: "Full-Stack Web Engineering",
    backlogStatus: "1 Cleared, 0 Active",
  };
}
