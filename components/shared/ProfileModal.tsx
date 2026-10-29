"use client";

import React, { useState, useEffect } from "react";
import { StudentProfile } from "@/types";
import { getStoredProfile, saveStoredProfile } from "@/lib/storage";
import { BrutalButton } from "../ui/BrutalButton";
import { X, Sparkles, User, Award } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (profile: StudentProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());

  useEffect(() => {
    if (isOpen) {
      setProfile(getStoredProfile());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredProfile(profile);
    if (onSaved) onSaved(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
      <div className="relative w-full max-w-lg border-[3px] border-[#0A0A0A] bg-[#FFFFFF] shadow-[10px_10px_0px_#0A0A0A] p-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-[3px] border-[#0A0A0A] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-[2px] border-[#0A0A0A] bg-[#FFE14D] flex items-center justify-center shadow-[2px_2px_0px_#0A0A0A]">
              <User className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                Student Identity Profile
              </h3>
              <p className="font-mono text-xs text-[#555555]">
                Local profile used for personalized calculations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-[2px] border-[#0A0A0A] bg-[#FF5CAA] text-white flex items-center justify-center shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#e04392] active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
              Your Name / Alias
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[3px_3px_0px_#0A0A0A]"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
              Target Placement Role
            </label>
            <select
              value={profile.targetRoleId}
              onChange={(e) => setProfile({ ...profile, targetRoleId: e.target.value })}
              className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[3px_3px_0px_#0A0A0A]"
            >
              <option value="full-stack">Full-Stack Web Engineering</option>
              <option value="data-ai">Data Science & Applied AI</option>
              <option value="backend">Backend & Systems Architecture</option>
              <option value="cloud-devops">Cloud & DevOps Engineering</option>
              <option value="cybersecurity">Cybersecurity & InfoSec</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                Current Semester
              </label>
              <select
                value={profile.semester}
                onChange={(e) => setProfile({ ...profile, semester: Number(e.target.value) })}
                className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[3px_3px_0px_#0A0A0A]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                Current CGPA (0-10)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={profile.cgpa}
                onChange={(e) => setProfile({ ...profile, cgpa: Number(e.target.value) })}
                className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[3px_3px_0px_#0A0A0A]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                Active Backlogs
              </label>
              <input
                type="number"
                min="0"
                max="15"
                value={profile.backlogs}
                onChange={(e) => setProfile({ ...profile, backlogs: Number(e.target.value) })}
                className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[3px_3px_0px_#0A0A0A]"
                required
              />
              <span className="font-mono text-[10px] text-[#666666]">
                0 = None, 1+ = In recovery
              </span>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                Weekly Study Hours
              </label>
              <input
                type="number"
                min="5"
                max="70"
                value={profile.weeklyHours}
                onChange={(e) => setProfile({ ...profile, weeklyHours: Number(e.target.value) })}
                className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[3px_3px_0px_#0A0A0A]"
                required
              />
              <span className="font-mono text-[10px] text-[#666666]">
                20-30h recommended
              </span>
            </div>
          </div>

          <div className="pt-4 border-t-[2px] border-[#0A0A0A] flex items-center justify-end gap-3">
            <BrutalButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </BrutalButton>
            <BrutalButton
              type="submit"
              variant="primary"
              size="sm"
              icon={<Award className="w-4 h-4" />}
            >
              Save Profile & Recalculate
            </BrutalButton>
          </div>
        </form>
      </div>
    </div>
  );
};
