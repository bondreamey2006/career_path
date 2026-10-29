import { WeekPlan } from "@/types";

export interface RecoveryProfile {
  riskScore: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  timeToReboundMonths: number;
  academicRatio: number; // e.g. 0.4 means 40% academics, 60% upskilling
  upskillRatio: number;
  adviceSummary: string;
  reassuranceMessage: string;
}

export function computeRecoveryMetrics(
  cgpa: number,
  backlogs: number,
  semester: number,
  hoursPerWeek: number
): RecoveryProfile {
  let riskScore: "LOW" | "MODERATE" | "HIGH" | "CRITICAL" = "LOW";

  if (backlogs >= 4 || (backlogs >= 2 && semester >= 6) || cgpa < 5.8) {
    riskScore = "CRITICAL";
  } else if (backlogs >= 2 || (backlogs === 1 && semester >= 6) || cgpa < 6.5) {
    riskScore = "HIGH";
  } else if (backlogs === 1 || cgpa < 7.2) {
    riskScore = "MODERATE";
  } else {
    riskScore = "LOW";
  }

  // Calculate allocation ratio
  let academicRatio = 0.3;
  if (backlogs > 3) {
    academicRatio = 0.65;
  } else if (backlogs >= 2) {
    academicRatio = 0.5;
  } else if (backlogs === 1) {
    academicRatio = 0.4;
  } else if (cgpa < 6.5) {
    academicRatio = 0.45;
  }

  // Minimum 10 upskilling hours if total is reasonable
  const upskillRatio = 1 - academicRatio;

  // Time to rebound estimation in months
  const timeToReboundMonths = Math.max(
    2,
    Math.min(10, Math.ceil((backlogs * 1.5) + (cgpa < 6.5 ? 3 : 1) + (semester >= 6 ? 1 : 0)))
  );

  let adviceSummary = "";
  let reassuranceMessage = "";

  if (riskScore === "CRITICAL") {
    adviceSummary =
      "All-hands triage: Your academic clearance directly controls campus placement eligibility cutoffs. We allocate 65% of your time to passing backlog re-exams using 5-year previous papers, and 35% to high-impact proof-of-work code.";
    reassuranceMessage =
      "Take a breath. Over 38% of Tier-1/2 engineers have cleared multiple backlogs and landed top product roles. Recruiters forgive a rough freshman year if your final-year GitHub has live, running systems.";
  } else if (riskScore === "HIGH") {
    adviceSummary =
      "Strategic balance: We protect your CGPA baseline while steadily burning down backlog credits. Upskilling continues at 50% capacity so you don't enter placement season with zero technical projects.";
    reassuranceMessage =
      "One or two backlogs are speedbumps, not a career autopsy. Clearing them systematically in the upcoming supplementary window resets your trajectory.";
  } else if (riskScore === "MODERATE") {
    adviceSummary =
      "Optimization phase: Your academics are stable with minor drag. We dedicate 60% of time to aggressive technical upskilling and 40% to exam security.";
    reassuranceMessage =
      "You are in a prime position to leapfrog peers who only focus on college marks. Two standout projects will make your resume pop.";
  } else {
    adviceSummary =
      "High-velocity acceleration: Zero backlogs and healthy CGPA. We dedicate 75% of your weekly time to high-value project builds, system design, and interview mocks.";
    reassuranceMessage =
      "Clean slate! Now focus on building actual distributed software that blows typical campus resumes out of the water.";
  }

  return {
    riskScore,
    timeToReboundMonths,
    academicRatio,
    upskillRatio,
    adviceSummary,
    reassuranceMessage,
  };
}

export function generate12WeekRecoveryPlan(
  cgpa: number,
  backlogs: number,
  semester: number,
  hoursPerWeek: number,
  targetRoleTitle: string
): WeekPlan[] {
  const { academicRatio, upskillRatio } = computeRecoveryMetrics(
    cgpa,
    backlogs,
    semester,
    hoursPerWeek
  );

  const plans: WeekPlan[] = [];
  const examSprintWeeks = [7, 8, 11, 12]; // Midterm and final exam periods

  for (let w = 1; w <= 12; w++) {
    const isExamSprint = examSprintWeeks.includes(w);
    const currAcadRatio = isExamSprint
      ? Math.min(0.85, academicRatio + 0.3)
      : academicRatio;
    const currUpskillRatio = 1 - currAcadRatio;

    const academicHours = Math.round(hoursPerWeek * currAcadRatio);
    const upskillingHours = Math.round(hoursPerWeek * currUpskillRatio);

    let focusArea = "";
    let academicTasks: string[] = [];
    let upskillingTasks: string[] = [];
    let milestone = "";
    let burnoutWarning: string | undefined = undefined;

    if (hoursPerWeek > 35) {
      burnoutWarning =
        "High study volume (>35h/wk): Ensure you take a mandatory full rest day on Sunday to prevent cognitive fatigue.";
    }

    if (w <= 2) {
      focusArea = "Audit & Triage Setup";
      academicTasks = [
        "Collect previous 5 years question papers for backlog subjects",
        "Highlight high-frequency 60% syllabus topics (Pareto principle)",
        "Schedule faculty / peer clearing slots for 2 hardest topics",
      ];
      upskillingTasks = [
        `Setup development environment & Git discipline for ${targetRoleTitle}`,
        "Complete Stage 1 foundation modules (Syntax, typing, async mechanics)",
        "Make initial GitHub repository with strict ESLint and README",
      ];
      milestone = "Diagnostic triage completed & study cadence locked.";
    } else if (w <= 4) {
      focusArea = "Core Knowledge Rebuild";
      academicTasks = [
        "Solve 2 full previous year exam papers under timed conditions",
        "Submit all internal lab files and assignments ahead of deadlines",
        "Make condensed one-page formula / concept cheat sheets",
      ];
      upskillingTasks = [
        "Build foundational project mini-milestone (CRUD or API service)",
        "Practice 5 core role-specific technical problem patterns",
        "Deploy first working demo to Vercel/Render with live link",
      ];
      milestone = "First working code deployed + 40% syllabus secured.";
    } else if (w <= 6) {
      focusArea = "Midterm Readiness & Component Architecture";
      academicTasks = [
        "Target internal midterm exams: aim for >75% to lift semester SGPA",
        "Attend laboratory viva prep and verify experiment outputs",
      ];
      upskillingTasks = [
        "Connect relational database / ORM (PostgreSQL & Prisma)",
        "Implement production JWT authentication and secure routing",
        "Document API contracts with Swagger / Postman collection",
      ];
      milestone = "Midterm exams conquered + auth & DB pipeline active.";
    } else if (w <= 8) {
      focusArea = "Exam Shield: Academic Defense Sprint";
      academicTasks = [
        "Intensive revision of backlog subject unit 3 & 4 (guaranteed 25 marks)",
        "Peer study group session to test recall on theoretical proofs",
        "Resolve all outstanding administrative backlog exam fee forms",
      ];
      upskillingTasks = [
        "Maintain minimum streak: 1 commit every other day to keep muscle memory",
        "Review clean architecture patterns for capstone project",
      ];
      milestone = "Backlog syllabus 85% mastered.";
    } else if (w <= 10) {
      focusArea = "Capstone Acceleration & Rebound Sprint";
      academicTasks = [
        "Light academic maintenance: flashcard review (1 hour daily)",
        "Final check on semester internal marks submission",
      ];
      upskillingTasks = [
        `Build flagship capstone for ${targetRoleTitle} with high complexity`,
        "Write Dockerfile, set up CI/CD pipeline, and stress-test performance",
        "Record 2-minute Loom/video demo explaining architecture decisions",
      ];
      milestone = "Flagship portfolio capstone feature-complete.";
    } else {
      focusArea = "End-Semester Finals & Placement Launch";
      academicTasks = [
        "End-semester examination clearance: lock in passing marks across all papers",
        "Celebrate academic turnaround and obtain clean marksheet copies",
      ];
      upskillingTasks = [
        "Run resume through ATS checker for target role keywords",
        "Craft honest, punchy narrative explaining academic comeback",
        "Send 10 targeted outreach messages to startup founders and tech leads",
      ];
      milestone = "Backlogs cleared + ATS-ready resume with live deployed work!";
    }

    plans.push({
      weekNumber: w,
      academicHours,
      upskillingHours,
      focusArea,
      academicTasks,
      upskillingTasks,
      milestone,
      burnoutWarning,
    });
  }

  return plans;
}
