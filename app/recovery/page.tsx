"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { getStoredProfile } from "@/lib/storage";
import { RecoveryPlanResponse, WeekPlan } from "@/types";
import { ShieldCheck, AlertTriangle, Clock, Calendar, Check, Sparkles, BookOpen, Terminal } from "lucide-react";

export default function RecoveryPage() {
  const [cgpa, setCgpa] = useState<number>(6.8);
  const [backlogs, setBacklogs] = useState<number>(1);
  const [semester, setSemester] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(24);
  const [targetRole, setTargetRole] = useState<string>("full-stack");
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<RecoveryPlanResponse | null>(null);

  useEffect(() => {
    const profile = getStoredProfile();
    setCgpa(profile.cgpa);
    setBacklogs(profile.backlogs);
    setSemester(profile.semester);
    setHoursPerWeek(profile.weeklyHours);
    setTargetRole(profile.targetRoleId);

    // Initial plan fetch
    fetchPlan(profile.cgpa, profile.backlogs, profile.semester, profile.weeklyHours, profile.targetRoleId);
  }, []);

  const fetchPlan = async (
    c: number,
    b: number,
    s: number,
    h: number,
    r: string
  ) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recovery-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cgpa: c,
          backlogs: b,
          semester: s,
          hoursPerWeek: h,
          targetRole: r,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPlan(data);
      }
    } catch (err) {
      console.error("Failed to generate recovery plan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPlan(cgpa, backlogs, semester, hoursPerWeek, targetRole);
  };

  const riskBadgeStyles = {
    LOW: "bg-[#10B981] text-white",
    MODERATE: "bg-[#FFE14D] text-[#0A0A0A]",
    HIGH: "bg-[#A855F7] text-white",
    CRITICAL: "bg-[#FF5CAA] text-white",
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#0A0A0A] bg-brutal-grid select-none">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          {/* Header */}
          <div className="border-b-[3px] border-[#0A0A0A] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sticker color="emerald" rotate="-2" size="sm">
                  ACADEMIC DEFENSE & RESKILLING
                </Sticker>
                <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                  • BALANCED TIME BUDGETS
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                Career Recovery & Backlog Balancer
              </h1>
              <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
                Zero backlog shame. Having backlogs or a lower CGPA in college is a solvable engineering
                scheduling problem. Input your current semester parameters to generate a 12-week split blueprint.
              </p>
            </div>
          </div>

          {/* Form & Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Input Parameters Form (Col 5) */}
            <div className="lg:col-span-5">
              <BrutalCard color="white" shadowSize="md" className="p-6">
                <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-5">
                  <h3 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A]">
                    Student Telemetry Inputs
                  </h3>
                  <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                    DYNAMIC RE-CALC
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                        Active Backlogs
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={backlogs}
                        onChange={(e) => setBacklogs(Number(e.target.value))}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-lg font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                        Current CGPA
                      </label>
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="10"
                        value={cgpa}
                        onChange={(e) => setCgpa(Number(e.target.value))}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-lg font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                        Semester
                      </label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(Number(e.target.value))}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                          <option key={s} value={s}>
                            Semester {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                        Weekly Study Hours
                      </label>
                      <input
                        type="number"
                        min="8"
                        max="60"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-lg font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                      Placement Target Role
                    </label>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                    >
                      <option value="full-stack">Full-Stack Web Engineering</option>
                      <option value="data-ai">Data Science & Applied AI</option>
                      <option value="backend">Backend & Systems Architecture</option>
                      <option value="cloud-devops">Cloud & DevOps Engineering</option>
                      <option value="cybersecurity">Cybersecurity & InfoSec</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <BrutalButton
                      type="submit"
                      variant="yellow"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Computing Recovery Vector..." : "Recalculate 12-Week Split"}
                    </BrutalButton>
                  </div>
                </form>
              </BrutalCard>
            </div>

            {/* Diagnostic Profile Summary (Col 7) */}
            <div className="lg:col-span-7">
              {plan && (
                <div className="space-y-4">
                  {/* Top Stats Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A]">
                      <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                        RISK ASSESSMENT
                      </span>
                      <span
                        className={`inline-block mt-1 font-mono text-xs font-bold uppercase px-2 py-0.5 border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] ${
                          riskBadgeStyles[plan.riskScore]
                        }`}
                      >
                        {plan.riskScore} RISK
                      </span>
                    </div>

                    <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A]">
                      <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                        ESTIMATED REBOUND
                      </span>
                      <span className="font-heading text-2xl font-black text-[#0A0A0A]">
                        {plan.timeToReboundMonths} Months
                      </span>
                    </div>

                    <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A]">
                      <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                        WEEKLY RATIO
                      </span>
                      <span className="font-heading text-sm font-extrabold text-[#A855F7]">
                        {plan.academicVsUpskillRatio}
                      </span>
                    </div>
                  </div>

                  {/* Reassurance & Manifesto Card */}
                  <BrutalCard color="yellow" shadowSize="md" className="p-6">
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#0A0A0A] uppercase">
                      <ShieldCheck className="w-4 h-4 text-[#0A0A0A]" />
                      STUDENT-TO-STUDENT REALITY CHECK
                    </div>
                    <p className="font-sans text-sm md:text-base font-bold text-[#0A0A0A] leading-relaxed mb-3">
                      &quot;{plan.reassuranceMessage}&quot;
                    </p>
                    <p className="font-sans text-xs text-[#2A2A2A] leading-relaxed border-t-[2px] border-[#0A0A0A] pt-2">
                      <span className="font-bold">Strategy:</span> {plan.adviceSummary}
                    </p>
                  </BrutalCard>
                </div>
              )}
            </div>
          </div>

          {/* 12-Week Detailed Breakdown */}
          {plan && (
            <div>
              <div className="border-b-[3px] border-[#0A0A0A] pb-3 mb-6 flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#0A0A0A]">
                  Week-by-Week Execution Timeline
                </h3>
                <span className="font-mono text-xs font-bold border-[2px] border-[#0A0A0A] bg-[#FFFFFF] px-2.5 py-1 shadow-[2px_2px_0px_#0A0A0A]">
                  🛡️ WEEKS 7, 8, 11, 12 = EXAM SHIELD SURGE
                </span>
              </div>

              <div className="space-y-6">
                {plan.weeklyPlan.map((week) => {
                  const isExamWeek = plan.examSprintWeeks.includes(week.weekNumber);
                  return (
                    <div
                      key={week.weekNumber}
                      className={`border-[3px] border-[#0A0A0A] p-6 shadow-[5px_5px_0px_#0A0A0A] transition-all hover:-translate-y-1 ${
                        isExamWeek ? "bg-[#FFFBEB]" : "bg-[#FFFFFF]"
                      }`}
                    >
                      {/* Week Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-black border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                            WEEK {String(week.weekNumber).padStart(2, "0")}
                          </span>
                          <span className="font-heading text-xl font-extrabold text-[#0A0A0A] uppercase">
                            {week.focusArea}
                          </span>
                        </div>

                        {/* Split Bar */}
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <div className="w-36 h-5 border-[2px] border-[#0A0A0A] flex overflow-hidden">
                            <div
                              className="bg-[#FFE14D] h-full"
                              style={{
                                width: `${Math.round((week.academicHours / hoursPerWeek) * 100)}%`,
                              }}
                              title={`Academics: ${week.academicHours}h`}
                            />
                            <div
                              className="bg-[#A855F7] h-full"
                              style={{
                                width: `${Math.round((week.upskillingHours / hoursPerWeek) * 100)}%`,
                              }}
                              title={`Upskilling: ${week.upskillingHours}h`}
                            />
                          </div>
                          <span className="font-bold text-[#0A0A0A]">
                            {week.academicHours}h Acad / {week.upskillingHours}h Code
                          </span>
                        </div>
                      </div>

                      {/* Tasks Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Academic Tasks */}
                        <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 shadow-[2px_2px_0px_#0A0A0A]">
                          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-2">
                            <BookOpen className="w-3.5 h-3.5 text-[#0A0A0A]" />
                            Academic Remediation ({week.academicHours} Hours)
                          </div>
                          <ul className="space-y-1.5 font-sans text-xs text-[#2A2A2A]">
                            {week.academicTasks.map((t, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="font-bold text-[#A855F7]">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Upskilling Tasks */}
                        <div className="border-[2px] border-[#0A0A0A] bg-[#FFFFFF] p-3 shadow-[2px_2px_0px_#0A0A0A]">
                          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-2">
                            <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                            Engineering Upskill ({week.upskillingHours} Hours)
                          </div>
                          <ul className="space-y-1.5 font-sans text-xs text-[#2A2A2A]">
                            {week.upskillingTasks.map((t, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="font-bold text-[#10B981]">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Milestone Badge */}
                      <div className="flex items-center justify-between border-t-[2px] border-[#0A0A0A] pt-2 text-xs font-mono text-[#444444]">
                        <span className="font-bold text-[#0A0A0A]">
                          🎯 Week Milestone: {week.milestone}
                        </span>
                        {week.burnoutWarning && (
                          <span className="text-[#FF5CAA] font-bold">
                            ⚠️ High intensity warning
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
