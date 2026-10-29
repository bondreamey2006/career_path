import { StudentProfile } from "@/types";

const STORAGE_KEY = "careerpath_student_profile";

export const DEFAULT_PROFILE: StudentProfile = {
  name: "Dev Student",
  targetRoleId: "full-stack",
  semester: 5,
  cgpa: 6.8,
  backlogs: 1,
  weeklyHours: 24,
  completedNodes: ["fs-101", "fs-102"],
  customSkills: ["JavaScript (ES6+)", "TypeScript", "HTML/CSS", "Git & GitHub"],
  streakDays: 14,
  lastActive: new Date().toISOString(),
};

export function getStoredProfile(): StudentProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("careerpath-profile-updated"));
  } catch (err) {
    console.error("Failed to save profile to localStorage:", err);
  }
}

export function toggleNodeCompletion(nodeId: string): StudentProfile {
  const profile = getStoredProfile();
  const exists = profile.completedNodes.includes(nodeId);
  const updatedNodes = exists
    ? profile.completedNodes.filter((id) => id !== nodeId)
    : [...profile.completedNodes, nodeId];

  const updatedProfile: StudentProfile = {
    ...profile,
    completedNodes: updatedNodes,
  };
  saveStoredProfile(updatedProfile);
  return updatedProfile;
}
