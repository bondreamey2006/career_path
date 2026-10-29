"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { Gauge } from "@/components/ui/Gauge";
import { CAREER_ROLES } from "@/data/roles";
import { MASTER_SKILLS } from "@/data/skills";
import { SkillGapResponse } from "@/types";
import { Check, AlertTriangle, ArrowRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export default function SkillGapPage() {
  const [targetRole, setTargetRole] = useState("full-stack");
  const [inputMode, setInputMode] = useState<"chips" | "resume">("chips");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "ts",
    "js",
    "react",
    "git",
  ]);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SkillGapResponse | null>(null);

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const runSkillGapAudit = async () => {
    setLoading(true);
    try {
      const payload = {
        role: targetRole,
        ...(inputMode === "resume" && { resumeText }),
        ...(inputMode === "chips" && { skills: selectedSkills }),
      };

      const res = await fetch("/api/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setResults(data);
      }
    } catch (err) {
      console.error("Skill gap audit failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sample quick resume template
  const loadSampleResume = () => {
    setResumeText(
      `Third-year Computer Engineering student with solid experience in JavaScript, TypeScript, React 18, and basic Git. Built full-stack college event booking site using Next.js and Tailwind CSS. Familiar with fundamental algorithms and REST API concepts.`
    );
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
                <Sticker color="pink" rotate="-2" size="sm">
                  RECRUITER GAP AUDIT
                </Sticker>
                <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                  • DETERMINISTIC WEIGHTS
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                Skill Gap Analyzer
              </h1>
              <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
                Select your target placement domain, check your current competencies or paste raw resume text.
                We isolate critical missing technical keywords and rank them by recruiter scrutiny.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form: Role & Inputs (Col 6) */}
            <div className="lg:col-span-6 space-y-6">
              <BrutalCard color="white" shadowSize="md" className="p-6">
                <h3 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A] mb-4">
                  1. Target Engineering Domain
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {CAREER_ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setTargetRole(role.id)}
                      className={`p-3 text-left border-[2px] border-[#0A0A0A] font-mono text-xs font-bold transition-all ${
                        targetRole === role.id
                          ? "bg-[#FFE14D] shadow-[3px_3px_0px_#0A0A0A] -translate-y-0.5"
                          : "bg-[#FFFFFF] hover:bg-[#F4F0E6]"
                      }`}
                    >
                      <div className="text-[#0A0A0A] uppercase">{role.title}</div>
                      <div className="text-[10px] text-[#555555] mt-0.5">
                        {role.benchmarkHours}h benchmark
                      </div>
                    </button>
                  ))}
                </div>

                {/* Input Mode Selector */}
                <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-2 mb-4">
                  <h3 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A]">
                    2. Provide Your Current Skills
                  </h3>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <button
                      onClick={() => setInputMode("chips")}
                      className={`px-2.5 py-1 border-[2px] border-[#0A0A0A] font-bold uppercase ${
                        inputMode === "chips"
                          ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]"
                          : "bg-white text-black"
                      }`}
                    >
                      Checklist
                    </button>
                    <button
                      onClick={() => setInputMode("resume")}
                      className={`px-2.5 py-1 border-[2px] border-[#0A0A0A] font-bold uppercase ${
                        inputMode === "resume"
                          ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]"
                          : "bg-white text-black"
                      }`}
                    >
                      Paste Resume
                    </button>
                  </div>
                </div>

                {/* Checklist Mode */}
                {inputMode === "chips" && (
                  <div>
                    <span className="block font-mono text-xs text-[#555555] uppercase mb-2">
                      Tap skills you currently possess ({selectedSkills.length} selected):
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-2 border-[2px] border-[#0A0A0A] bg-[#F4F0E6]">
                      {MASTER_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill.id);
                        return (
                          <button
                            key={skill.id}
                            type="button"
                            onClick={() => toggleSkill(skill.id)}
                            className={`border-[1.5px] border-[#0A0A0A] px-2 py-1 font-mono text-xs font-bold transition-all shadow-[1.5px_1.5px_0px_#0A0A0A] ${
                              isSelected
                                ? "bg-[#10B981] text-white"
                                : "bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#FFE14D]"
                            }`}
                          >
                            {isSelected && "✓ "}
                            {skill.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Paste Resume Mode */}
                {inputMode === "resume" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-[#555555] uppercase">
                        Paste projects, skills summary, or tech experience:
                      </span>
                      <button
                        type="button"
                        onClick={loadSampleResume}
                        className="text-[#A855F7] font-bold hover:underline"
                      >
                        [Insert Sample Student Bio]
                      </button>
                    </div>
                    <textarea
                      rows={6}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="e.g. Experienced with JavaScript, React, Next.js, and Git. Built a full-stack student portal with authentication..."
                      className="w-full border-[3px] border-[#0A0A0A] p-3 font-mono text-xs bg-[#FFFFFF] shadow-[3px_3px_0px_#0A0A0A] outline-none"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-6 pt-4 border-t-[2px] border-[#0A0A0A]">
                  <BrutalButton
                    variant="yellow"
                    size="lg"
                    onClick={runSkillGapAudit}
                    disabled={loading}
                    className="w-full"
                    icon={<Sparkles className="w-4 h-4 text-[#0A0A0A]" />}
                  >
                    {loading ? "Analyzing Gap Vector..." : "Run Skill Gap Audit"}
                  </BrutalButton>
                </div>
              </BrutalCard>
            </div>

            {/* Right Output HUD: Results & Severity Breakdown (Col 6) */}
            <div className="lg:col-span-6 space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* Gauge Readout Card */}
                  <BrutalCard color="white" shadowSize="md" className="p-6 text-center">
                    <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-2 mb-4">
                      <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                        AUDIT RESULTS FOR {results.roleTitle.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs font-bold border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                        {results.matchedSkills.length} MATCHED • {results.missingSkills.length} MISSING
                      </span>
                    </div>

                    <div className="flex justify-center my-2">
                      <Gauge score={results.readinessScore} size={220} label="ROLE FIT READINESS" />
                    </div>
                  </BrutalCard>

                  {/* Matched vs Missing Chips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Matched Skills */}
                    <BrutalCard color="white" shadowSize="sm" className="p-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#10B981] border-b-[2px] border-[#0A0A0A] pb-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        Matched Skills ({results.matchedSkills.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {results.matchedSkills.length === 0 ? (
                          <span className="font-mono text-xs text-[#666666]">
                            No direct matches found.
                          </span>
                        ) : (
                          results.matchedSkills.map((s, idx) => (
                            <span
                              key={idx}
                              className="border-[1.5px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[1.5px_1.5px_0px_#0A0A0A]"
                            >
                              ✓ {s}
                            </span>
                          ))
                        )}
                      </div>
                    </BrutalCard>

                    {/* Missing Skills */}
                    <BrutalCard color="white" shadowSize="sm" className="p-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#FF5CAA] border-b-[2px] border-[#0A0A0A] pb-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-[#FF5CAA]" />
                        Missing Competencies ({results.missingSkills.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {results.missingSkills.length === 0 ? (
                          <span className="font-mono text-xs text-[#10B981] font-bold">
                            Zero gaps! You match all benchmark core skills.
                          </span>
                        ) : (
                          results.missingSkills.map((s, idx) => (
                            <span
                              key={idx}
                              className="border-[1.5px] border-[#0A0A0A] bg-[#FF5CAA] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[1.5px_1.5px_0px_#0A0A0A]"
                            >
                              ✕ {s}
                            </span>
                          ))
                        )}
                      </div>
                    </BrutalCard>
                  </div>

                  {/* Severity Ranked Missing List */}
                  {results.severityRankedMissing.length > 0 && (
                    <BrutalCard color="white" shadowSize="md" className="p-6">
                      <h4 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2 mb-4">
                        Recruiter Severity Ranking
                      </h4>
                      <div className="space-y-3">
                        {results.severityRankedMissing.map((item, idx) => (
                          <div
                            key={idx}
                            className="border-[2px] border-[#0A0A0A] p-3 bg-[#F4F0E6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#0A0A0A]"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-heading text-sm font-extrabold text-[#0A0A0A]">
                                  {item.skill}
                                </span>
                                <span
                                  className={`px-2 py-0.2 border-[1.5px] border-[#0A0A0A] font-mono text-[10px] font-bold uppercase shadow-[1.5px_1.5px_0px_#0A0A0A] ${
                                    item.severity === "CRITICAL"
                                      ? "bg-[#FF5CAA] text-white"
                                      : item.severity === "HIGH"
                                      ? "bg-[#A855F7] text-white"
                                      : "bg-[#FFE14D] text-black"
                                  }`}
                                >
                                  {item.severity}
                                </span>
                              </div>
                              <p className="font-sans text-xs text-[#444444]">
                                {item.recommendation}
                              </p>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#0A0A0A] bg-white border-[1.5px] border-[#0A0A0A] px-2 py-1 shrink-0 self-start sm:self-auto">
                              ~{item.learningHours}h to clear
                            </span>
                          </div>
                        ))}
                      </div>
                    </BrutalCard>
                  )}

                  {/* Tactical Action Plan */}
                  <BrutalCard color="yellow" shadowSize="md" className="p-6">
                    <h4 className="font-heading text-lg font-extrabold uppercase text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2 mb-3">
                      Priority Action Sequence
                    </h4>
                    <ul className="space-y-2 font-mono text-xs font-bold text-[#0A0A0A]">
                      {results.actionPlan.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="bg-[#0A0A0A] text-white px-1.5 py-0.5 border-[1px] border-[#0A0A0A] shrink-0">
                            0{idx + 1}
                          </span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </BrutalCard>
                </div>
              ) : (
                /* Empty / Idle State */
                <BrutalCard color="white" shadowSize="md" className="p-8 text-center border-dashed">
                  <div className="w-16 h-16 border-[3px] border-[#0A0A0A] bg-[#FFE14D] mx-auto flex items-center justify-center shadow-[4px_4px_0px_#0A0A0A] mb-4">
                    <FileText className="w-8 h-8 text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold uppercase text-[#0A0A0A] mb-2">
                    Awaiting Candidate Telemetry
                  </h3>
                  <p className="font-sans text-sm text-[#444444] max-w-sm mx-auto mb-6">
                    Pick your target engineering role on the left and tap &quot;Run Skill Gap Audit&quot; to calculate your readiness percentage and isolated critical keywords.
                  </p>
                  <BrutalButton
                    variant="primary"
                    size="md"
                    onClick={runSkillGapAudit}
                  >
                    Quick Run with Defaults
                  </BrutalButton>
                </BrutalCard>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
