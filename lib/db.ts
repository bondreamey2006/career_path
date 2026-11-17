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
  ProjectAuditRequest,
  ProjectAuditResponse,
  ProjectAuditDimension,
  ProblemSolvingQuestion,
  ProblemSolvingEvaluationRequest,
  ProblemSolvingEvaluationResponse,
} from "@/types";
import { CAREER_ROLES } from "@/data/roles";
import { ROLE_ROADMAPS } from "@/data/roadmaps";
import { MASTER_SKILLS, SKILL_SYNONYMS } from "@/data/skills";
import {
  computeRecoveryMetrics,
  generate12WeekRecoveryPlan,
} from "@/data/recoveryTemplates";
import { PROBLEM_SOLVING_QUESTIONS } from "@/data/problemSolvingData";

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

// ==========================================
// FEATURE 1: PORTFOLIO & PROJECT QUALITY ENGINE
// ==========================================

export async function auditProjectQuality(
  req: ProjectAuditRequest
): Promise<ProjectAuditResponse> {
  const role = (await getRoleBySlug(req.targetRole)) || CAREER_ROLES[0];
  const descLower = (req.description || "").toLowerCase();
  const nameLower = (req.projectName || "").toLowerCase();

  // 1. Complexity Score (Weight: 25%)
  const complexityCount = req.complexityMarkers?.length || 0;
  let rawComplexity = Math.min(100, complexityCount * 16 + 10);
  if (descLower.includes("cache") || descLower.includes("redis")) rawComplexity += 8;
  if (descLower.includes("queue") || descLower.includes("worker") || descLower.includes("kafka")) rawComplexity += 10;
  if (descLower.includes("acid") || descLower.includes("transaction")) rawComplexity += 8;
  const complexityScore = Math.min(98, Math.max(20, rawComplexity));

  const complexityDimension: ProjectAuditDimension = {
    name: "Project Complexity",
    score: complexityScore,
    weight: 0.25,
    verdict:
      complexityScore >= 80
        ? "Enterprise System Architecture"
        : complexityScore >= 55
        ? "Standard Web CRUD Tier"
        : "Trivial / Low Architectural Rigor",
    feedback: [
      complexityScore >= 80
        ? "Exhibits non-trivial backends (caching, queues, or distributed state management)."
        : "Lacks asynchronous workers or database query optimization.",
      `Identified ${complexityCount} advanced complexity architectural markers.`,
    ],
    upgradeActions: [
      "Add Redis caching with TTL and cache-aside invalidation for hotspot queries.",
      "Introduce a background task queue (BullMQ or Celery) for non-blocking I/O.",
      "Add database transactions (ACID) to ensure data consistency under race conditions.",
    ],
  };

  // 2. Code Quality & Architecture Score (Weight: 20%)
  const qualityCount = req.codeQualityMarkers?.length || 0;
  const rawQuality = Math.min(96, Math.max(25, qualityCount * 18 + 15));

  const codeQualityDimension: ProjectAuditDimension = {
    name: "Code Quality & Architecture",
    score: rawQuality,
    weight: 0.2,
    verdict:
      rawQuality >= 80
        ? "Production-Grade Clean Code"
        : rawQuality >= 55
        ? "Acceptable Junior Formatting"
        : "Unstructured / Fragile Prototype",
    feedback: [
      rawQuality >= 80
        ? "Strict TypeScript with type safety, custom error boundaries, and modular directory separation."
        : "Lacks automated test suites or strict compiler boundaries.",
      `Identified ${qualityCount} production hygiene markers.`,
    ],
    upgradeActions: [
      "Turn on strict mode in tsconfig.json and eliminate all 'any' types.",
      "Write at least 5 unit tests for core business calculations with Jest or Vitest.",
      "Integrate GitHub Actions to fail pull requests on lint or TypeScript compilation errors.",
    ],
  };

  // 3. Originality & Authenticity Score (Weight: 25%)
  const isTutorialCloneKeyword =
    nameLower.includes("clone") ||
    nameLower.includes("netflix") ||
    nameLower.includes("spotify") ||
    nameLower.includes("todo") ||
    nameLower.includes("weather app") ||
    descLower.includes("youtube tutorial");

  let originalityScore = 75;
  if (req.originalityTier === "tutorial-clone" || isTutorialCloneKeyword) {
    originalityScore = 32;
  } else if (req.originalityTier === "modified-tutorial") {
    originalityScore = 65;
  } else if (req.originalityTier === "bespoke-solution") {
    originalityScore = 94;
  }

  const originalityDimension: ProjectAuditDimension = {
    name: "Originality & Authenticity",
    score: originalityScore,
    weight: 0.25,
    verdict:
      originalityScore >= 80
        ? "Bespoke Authentic Problem-Solver"
        : originalityScore >= 50
        ? "Modified Template (Moderate Match)"
        : "Recognized Tutorial Clone (Auto-Filtered by Screeners)",
    feedback: [
      originalityScore < 50
        ? "CRITICAL: Tech recruiters instantly flag Netflix/Spotify/Todo clones as low-effort copied tutorials."
        : "Solves an authentic problem with a custom domain schema.",
    ],
    upgradeActions: [
      "Pivot the product premise to solve a local or campus problem (e.g., student backlog planner, lab slot booking).",
      "Invent a unique feature that never existed in the original video tutorial.",
      "Commit directly to GitHub over at least 3 weeks rather than dumping a single initial commit.",
    ],
  };

  // 4. Documentation & README Rigor (Weight: 15%)
  let documentationScore = 30;
  if (req.documentationLevel === "standard-readme") documentationScore = 68;
  else if (req.documentationLevel === "deep-architecture-docs") documentationScore = 95;

  const documentationDimension: ProjectAuditDimension = {
    name: "Documentation & README Rigor",
    score: documentationScore,
    weight: 0.15,
    verdict:
      documentationScore >= 85
        ? "Senior-Level Technical Specifications"
        : documentationScore >= 60
        ? "Standard Readable README"
        : "Deficient / Missing Setup Instructions",
    feedback: [
      documentationScore >= 85
        ? "Includes architecture diagram, environment variable specifications, and load test benchmarks."
        : "Recruiters cannot evaluate system design without an architectural overview.",
    ],
    upgradeActions: [
      "Embed a Mermaid or SVG architectural diagram explaining data flow and database schemas.",
      "Document API contracts with example curl requests and JSON response payloads.",
      "Add a 1-minute Loom video demo or animated GIF preview at the very top of your README.",
    ],
  };

  // 5. Real-World Implementation & Deployment (Weight: 15%)
  let deploymentScore = 20;
  const hasLiveUrl = req.liveUrl && req.liveUrl.trim().length > 5;
  if (req.deploymentStatus === "production-ci-cd-custom-domain") deploymentScore = 96;
  else if (req.deploymentStatus === "free-tier-live" || hasLiveUrl) deploymentScore = 72;

  const deploymentDimension: ProjectAuditDimension = {
    name: "Real-World Implementation",
    score: deploymentScore,
    weight: 0.15,
    verdict:
      deploymentScore >= 85
        ? "Production-Deployed with CI/CD & Custom Domain"
        : deploymentScore >= 60
        ? "Hosted on Free Tier Platform"
        : "Localhost Only (Unverifiable Proof of Work)",
    feedback: [
      deploymentScore >= 60
        ? "Live public URL verifiable by technical interviewers."
        : "CRITICAL: If a recruiter cannot click a live link, your project effectively does not exist.",
    ],
    upgradeActions: [
      "Deploy to Vercel, Render, or Railway with automated GitHub commit triggers.",
      "Configure SSL and bind to a custom branded domain (e.g. yourname.dev).",
      "Add health check endpoints (`/api/health`) and basic uptime monitoring.",
    ],
  };

  // Overall Weighted Score
  const overallScore = Math.round(
    complexityDimension.score * complexityDimension.weight +
      codeQualityDimension.score * codeQualityDimension.weight +
      originalityDimension.score * originalityDimension.weight +
      documentationDimension.score * documentationDimension.weight +
      deploymentDimension.score * deploymentDimension.weight
  );

  let tier: "TUTORIAL CLONE (HIGH RISK)" | "EMERGING JUNIOR" | "PRODUCTION-GRADE (INTERVIEW MAGNET)" = "EMERGING JUNIOR";
  let summary = "";
  let recruiterTeardown = "";

  if (overallScore >= 80) {
    tier = "PRODUCTION-GRADE (INTERVIEW MAGNET)";
    summary = `Top 5% student capstone project for ${role.title}. Demonstrates authentic systems engineering, proof-of-work, and production hygiene.`;
    recruiterTeardown =
      "This project immediately passes recruiter screening rounds. It showcases end-to-end delivery, database resilience, and clear documentation. Use this as your primary interview talking piece.";
  } else if (overallScore >= 55) {
    tier = "EMERGING JUNIOR";
    summary = `Solid foundation for ${role.title}, but lacks architectural depth and metrics required to stand out against 500+ campus applicants.`;
    recruiterTeardown =
      "Interviewers will acknowledge basic competence, but you will face tough grilling on concurrency, edge cases, and testing. Implementing 2 of the suggested architecture upgrades will push you into the top tier.";
  } else {
    tier = "TUTORIAL CLONE (HIGH RISK)";
    summary = `High filtration risk. The project presents strong tutorial clone markers or lacks live deployment and documentation.`;
    recruiterTeardown =
      "Automated and human screeners at competitive tech startups reject projects like this within 15 seconds. You must break away from generic templates, add database depth, and deploy live.";
  }

  const criticalFixes: string[] = [];
  if (originalityScore < 50) {
    criticalFixes.push("Rename and rebrand project away from any clone nomenclature (Netflix, Spotify, Todo).");
  }
  if (deploymentScore < 50) {
    criticalFixes.push("Deploy immediately to a public URL (Vercel/Render). Live URLs triple interview call rates.");
  }
  if (documentationScore < 50) {
    criticalFixes.push("Add a comprehensive README with an architecture diagram and setup guide.");
  }
  if (complexityScore < 50) {
    criticalFixes.push("Add database indexing, relational foreign keys, or a Redis caching layer.");
  }

  return {
    overallScore,
    tier,
    summary,
    dimensions: {
      complexity: complexityDimension,
      codeQuality: codeQualityDimension,
      originality: originalityDimension,
      documentation: documentationDimension,
      realWorldImplementation: deploymentDimension,
    },
    recruiterTeardown,
    criticalFixes: criticalFixes.length > 0 ? criticalFixes : ["Project adheres to high standards. Focus on interview mocks."],
    suggestedArchitectureUpgrades: [
      "Database Optimization: Add explicit B-Tree composite indexes on high-frequency search fields.",
      "Asynchronous Worker: Offload slow external API calls or PDF/image processing to background workers.",
      "Observability: Add structured JSON logging and OpenTelemetry instrumentation.",
    ],
  };
}

// ==========================================
// FEATURE 2: PROBLEM-SOLVING & ANALYTICAL THINKING ENGINE
// ==========================================

export async function getProblemSolvingQuestions(): Promise<ProblemSolvingQuestion[]> {
  return PROBLEM_SOLVING_QUESTIONS;
}

export async function evaluateProblemSolving(
  req: ProblemSolvingEvaluationRequest
): Promise<ProblemSolvingEvaluationResponse> {
  const questions = PROBLEM_SOLVING_QUESTIONS;
  const totalQuestions = questions.length;
  let correctCount = 0;

  let algoTotal = 0;
  let algoCorrect = 0;
  let debugTotal = 0;
  let debugCorrect = 0;
  let decisionTotal = 0;
  let decisionCorrect = 0;

  const explanations: Record<string, { isCorrect: boolean; explanation: string; correctOptionId: string }> = {};

  for (const q of questions) {
    const selectedOptionId = req.answers[q.id];
    const correctOption = q.options.find((o) => o.isCorrect) || q.options[0];
    const isCorrect = selectedOptionId === correctOption.id;

    if (isCorrect) correctCount++;

    if (q.dimension === "algorithmic") {
      algoTotal++;
      if (isCorrect) algoCorrect++;
    } else if (q.dimension === "debugging") {
      debugTotal++;
      if (isCorrect) debugCorrect++;
    } else if (q.dimension === "decision-making") {
      decisionTotal++;
      if (isCorrect) decisionCorrect++;
    }

    const selectedOption = q.options.find((o) => o.id === selectedOptionId);
    explanations[q.id] = {
      isCorrect,
      explanation: selectedOption ? selectedOption.explanation : correctOption.explanation,
      correctOptionId: correctOption.id,
    };
  }

  const algorithmicScore = algoTotal > 0 ? Math.round((algoCorrect / algoTotal) * 100) : 0;
  const debuggingScore = debugTotal > 0 ? Math.round((debugCorrect / debugTotal) * 100) : 0;
  const decisionMakingScore = decisionTotal > 0 ? Math.round((decisionCorrect / decisionTotal) * 100) : 0;

  const overallScore = Math.round(
    algorithmicScore * 0.4 + debuggingScore * 0.35 + decisionMakingScore * 0.25
  );

  let tier: "FOUNDATIONAL" | "COMPETENT" | "EXEMPLARY / INTERVIEW-READY" = "COMPETENT";
  if (overallScore >= 80) tier = "EXEMPLARY / INTERVIEW-READY";
  else if (overallScore < 55) tier = "FOUNDATIONAL";

  const blindSpots: string[] = [];
  if (algorithmicScore < 60) {
    blindSpots.push("Monotonicity & Sliding Window: Tendency to default to brute-force or unneeded recursion.");
  }
  if (debuggingScore < 60) {
    blindSpots.push("Concurrency & TOCTOU Races: Overlooking asynchronous race conditions in shared state/databases.");
  }
  if (decisionMakingScore < 60) {
    blindSpots.push("Distributed State & Caching: Underestimating cache stampedes and shared rate limiters.");
  }

  const patternMasteryRoadmap: PatternMasteryItem[] = [
    {
      pattern: "Two Pointers & Sliding Window",
      status: algorithmicScore >= 70 ? "MASTERED" : "CRITICAL_GAP",
      targetCount: 6,
      rationale: "Solves 35% of array & string screening rounds with O(N) time and O(1) space guarantees.",
    },
    {
      pattern: "Fast & Slow Pointers (Floyd's Cycle)",
      status: algorithmicScore >= 60 ? "MASTERED" : "NEEDS_PRACTICE",
      targetCount: 4,
      rationale: "Essential for cycle detection in linked structures and distributed message queues.",
    },
    {
      pattern: "Binary Search on Answer Space",
      status: algorithmicScore >= 80 ? "MASTERED" : "CRITICAL_GAP",
      targetCount: 5,
      rationale: "Transforms NP-hard seeming allocation problems into O(N log(range)) monotonic searches.",
    },
    {
      pattern: "Topological Sort & Cycle Detection",
      status: algorithmicScore >= 70 ? "MASTERED" : "NEEDS_PRACTICE",
      targetCount: 5,
      rationale: "Directly tested in build dependency, course prerequisite, and scheduling rounds.",
    },
    {
      pattern: "Production Debugging & Concurrency",
      status: debuggingScore >= 70 ? "MASTERED" : "CRITICAL_GAP",
      targetCount: 8,
      rationale: "Senior interviewers test your ability to debug race conditions and N+1 query bottlenecks.",
    },
  ];

  const tacticalPlaybook: string[] = [];
  if (overallScore >= 80) {
    tacticalPlaybook.push("You are in the top tier for technical problem-solving! Focus on timed mock interviews with voice narration.");
    tacticalPlaybook.push("Practice system design trade-offs (consistent hashing, partition tolerance, circuit breakers).");
  } else {
    tacticalPlaybook.push("Stop solving random LeetCode problems blindly. Focus specifically on the 14 core patterns.");
    tacticalPlaybook.push("When tackling debugging questions, trace concurrency step-by-step before assuming sequential execution.");
    tacticalPlaybook.push("Always calculate worst-case Space Complexity first before writing recursive solutions.");
  }

  return {
    overallScore,
    tier,
    algorithmicScore,
    debuggingScore,
    decisionMakingScore,
    totalQuestions,
    correctCount,
    blindSpots: blindSpots.length > 0 ? blindSpots : ["None identified. Strong analytical reasoning across all dimensions."],
    patternMasteryRoadmap,
    tacticalPlaybook,
    explanations,
  };
}

