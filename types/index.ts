export type RoleCategory =
  | "Full-Stack Web Development"
  | "Data Science & AI"
  | "Backend & Systems"
  | "Cloud & DevOps"
  | "Cybersecurity & InfoSec";

export interface SkillItem {
  id: string;
  name: string;
  category: "Language" | "Framework" | "Database" | "DevOps" | "Concept" | "Tool";
  weight: number; // 1 to 5 importance
  description: string;
}

export interface CareerRole {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: RoleCategory;
  accentColor: string; // neo-brutalist hex
  badgeText: string;
  benchmarkHours: number;
  averageSalary: string;
  demandTier: "HIGH" | "VERY HIGH" | "CRITICAL";
  coreSkills: SkillItem[];
  commonPitfalls: string[];
  careerPivotAdvice: string;
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: "Documentation" | "Practice" | "Video Course" | "Open Source";
}

export interface RoadmapNodeItem {
  id: string;
  title: string;
  phaseId: string;
  stageNumber: number;
  description: string;
  estimatedHours: number;
  category: string;
  skillsUnlocked: string[];
  importance: "CRITICAL" | "CORE" | "ADVANCED";
  resources: RoadmapResource[];
}

export interface RoadmapPhase {
  id: string;
  roleId: string;
  stageNumber: number;
  title: string;
  description: string;
  badge: string;
  nodes: RoadmapNodeItem[];
}

export interface RoleRoadmap {
  roleId: string;
  roleTitle: string;
  totalEstimatedHours: number;
  phases: RoadmapPhase[];
}

export interface SkillGapRequest {
  role: string;
  resumeText?: string;
  skills?: string[];
}

export interface SeverityRankedSkill {
  skill: string;
  category: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  recommendation: string;
  learningHours: number;
}

export interface SkillGapResponse {
  role: string;
  readinessScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  severityRankedMissing: SeverityRankedSkill[];
  actionPlan: string[];
  roleTitle: string;
}

export interface RecoveryPlanRequest {
  cgpa: number;
  backlogs: number;
  semester: number;
  hoursPerWeek: number;
  targetRole: string;
}

export interface WeekPlan {
  weekNumber: number;
  academicHours: number;
  upskillingHours: number;
  focusArea: string;
  academicTasks: string[];
  upskillingTasks: string[];
  milestone: string;
  burnoutWarning?: string;
}

export interface RecoveryPlanResponse {
  riskScore: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  timeToReboundMonths: number;
  academicVsUpskillRatio: string;
  adviceSummary: string;
  weeklyPlan: WeekPlan[];
  examSprintWeeks: number[];
  reassuranceMessage: string;
}

export interface SimulateRequest {
  studyHours: number;
  weeks: number;
  currentSkills?: string[];
  targetRole: string;
}

export interface SimulationCurvePoint {
  week: number;
  readiness: number;
  cumulativeHours: number;
  milestone: string;
  paceDescription: string;
}

export interface SimulateResponse {
  projectedReadinessCurve: SimulationCurvePoint[];
  estimatedWeeksToJobReady: number;
  finalReadiness: number;
  recommendedIntensity: string;
  burnoutRisk: "LOW" | "BALANCED" | "HIGH" | "UNSUSTAINABLE";
  verdict: string;
}

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface StudentProfile {
  name: string;
  targetRoleId: string;
  semester: number;
  cgpa: number;
  backlogs: number;
  weeklyHours: number;
  completedNodes: string[];
  customSkills: string[];
  streakDays: number;
  lastActive?: string;
}

export interface MentorRequest {
  messages: ChatMessage[];
  profile?: Partial<StudentProfile>;
}

export interface MentorResponse {
  reply: string;
  suggestions?: string[];
  mode: "gemini" | "rule-based-fallback";
}

export interface AtsCheckRequest {
  resumeText: string;
  targetRole: string;
}

export interface AtsBulletSuggestion {
  originalExample: string;
  improvedVersion: string;
  rationale: string;
}

export interface AtsCheckResponse {
  atsScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingFeedback: string[];
  bulletSuggestions: AtsBulletSuggestion[];
  placementFitSummary: string;
}

export interface ReadinessOverview {
  readinessScore: number;
  streakDays: number;
  modulesCompleted: number;
  totalModules: number;
  activeMilestone: string;
  targetRoleTitle: string;
  backlogStatus: string;
}

// ==========================================
// FEATURE 1: PORTFOLIO & PROJECT QUALITY TYPES
// ==========================================

export interface ProjectAuditRequest {
  projectName: string;
  targetRole: string;
  repoUrl?: string;
  liveUrl?: string;
  description: string;
  complexityMarkers: string[];
  codeQualityMarkers: string[];
  originalityTier: "tutorial-clone" | "modified-tutorial" | "bespoke-solution";
  documentationLevel: "minimal-readme" | "standard-readme" | "deep-architecture-docs";
  deploymentStatus: "not-deployed" | "free-tier-live" | "production-ci-cd-custom-domain";
}

export interface ProjectAuditDimension {
  name: string;
  score: number; // 0 to 100
  weight: number;
  verdict: string;
  feedback: string[];
  upgradeActions: string[];
}

export interface ProjectAuditResponse {
  overallScore: number; // 0 to 100
  tier: "TUTORIAL CLONE (HIGH RISK)" | "EMERGING JUNIOR" | "PRODUCTION-GRADE (INTERVIEW MAGNET)";
  summary: string;
  dimensions: {
    complexity: ProjectAuditDimension;
    codeQuality: ProjectAuditDimension;
    originality: ProjectAuditDimension;
    documentation: ProjectAuditDimension;
    realWorldImplementation: ProjectAuditDimension;
  };
  recruiterTeardown: string;
  criticalFixes: string[];
  suggestedArchitectureUpgrades: string[];
}

// ==========================================
// FEATURE 2: PROBLEM-SOLVING & ANALYTICAL THINKING TYPES
// ==========================================

export interface ProblemSolvingOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface ProblemSolvingQuestion {
  id: string;
  dimension: "algorithmic" | "debugging" | "decision-making";
  dimensionTitle: string;
  title: string;
  scenario: string;
  codeSnippet?: string;
  difficulty: "CORE" | "CRITICAL" | "ADVANCED";
  options: ProblemSolvingOption[];
}

export interface ProblemSolvingEvaluationRequest {
  targetRole: string;
  answers: Record<string, string>; // questionId -> optionId
}

export interface PatternMasteryItem {
  pattern: string;
  status: "MASTERED" | "NEEDS_PRACTICE" | "CRITICAL_GAP";
  targetCount: number;
  rationale: string;
}

export interface ProblemSolvingEvaluationResponse {
  overallScore: number;
  tier: "FOUNDATIONAL" | "COMPETENT" | "EXEMPLARY / INTERVIEW-READY";
  algorithmicScore: number;
  debuggingScore: number;
  decisionMakingScore: number;
  totalQuestions: number;
  correctCount: number;
  blindSpots: string[];
  patternMasteryRoadmap: PatternMasteryItem[];
  tacticalPlaybook: string[];
  explanations: Record<string, { isCorrect: boolean; explanation: string; correctOptionId: string }>;
}

