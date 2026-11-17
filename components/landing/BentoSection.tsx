"use client";

import React, { useState } from "react";
import { BentoCard } from "../ui/BentoCard";
import { SlideReveal } from "../ui/SlideReveal";
import { Check, Sparkles, AlertCircle, Terminal, FileText, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

export const BentoSection: React.FC = () => {
  // Card 1 mini interactive state
  const [nodes, setNodes] = useState([
    { id: 1, title: "TypeScript Generics", done: true },
    { id: 2, title: "PostgreSQL ACID", done: true },
    { id: 3, title: "Docker Multi-stage", done: false },
  ]);

  // Card 4 simulator slider state
  const [studyHours, setStudyHours] = useState(25);
  const calculatedReadiness = Math.min(94, Math.round(40 + studyHours * 1.6));

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <SlideReveal direction="up">
        <div className="mb-12 border-b-[3px] border-[#0A0A0A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5CAA] border-[2px] border-[#0A0A0A] bg-[#FFFFFF] px-2.5 py-1 shadow-[2px_2px_0px_#0A0A0A] inline-block mb-3">
              ZERO FLUFF ARCHITECTURE
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A]">
              THE RECOVERY & PLACEMENT ENGINES
            </h2>
          </div>
          <p className="font-sans text-base text-[#222222] max-w-md font-medium">
            Everything you need to systematically rebuild academic standing, eliminate skill gaps,
            and present unshakeable proof-of-work to tech recruiters.
          </p>
        </div>
      </SlideReveal>

      {/* Asymmetric Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* CARD 01: Adaptive Roadmaps (Col span 7) */}
        <SlideReveal direction="left" className="md:col-span-7">
          <BentoCard
            numberLabel="01/05"
            tag="ROADMAP GRAPH"
            title="Adaptive Node-Based Roadmaps"
            description="From zero to production-grade deployment across 5 high-demand tech stacks. Mark nodes complete and watch your readiness compound."
            ctaLink="/roadmaps"
            ctaText="EXPLORE ALL 5 ROADMAPS"
            bgColor="bg-[#FFFFFF]"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#555555]">
                <span>STAGE 02: CORE STACK</span>
                <span className="text-[#10B981]">
                  {nodes.filter((n) => n.done).length}/{nodes.length} COMPLETE
                </span>
              </div>

              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() =>
                    setNodes(
                      nodes.map((n) =>
                        n.id === node.id ? { ...n, done: !n.done } : n
                      )
                    )
                  }
                  className={`flex items-center justify-between p-2.5 border-[2px] border-[#0A0A0A] cursor-pointer transition-all shadow-[2px_2px_0px_#0A0A0A] ${
                    node.done ? "bg-[#DCFCE7]" : "bg-[#F4F0E6] hover:bg-[#FFE14D]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 border-[2px] border-[#0A0A0A] flex items-center justify-center ${
                        node.done ? "bg-[#10B981] text-white" : "bg-white"
                      }`}
                    >
                      {node.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="font-heading text-sm font-bold text-[#0A0A0A]">
                      {node.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#555555]">
                    {node.done ? "UNLOCKED" : "PENDING"}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>
        </SlideReveal>

        {/* CARD 02: Skill Gap Analyzer (Col span 5) */}
        <SlideReveal direction="right" delay={0.1} className="md:col-span-5">
          <BentoCard
            numberLabel="02/05"
            tag="GAP AUDIT"
            title="Skill Gap Analyzer"
            description="Audit your candidate skills against real job descriptions. Instant severity triage of critical vs optional requirements."
            ctaLink="/skill-gap"
            ctaText="AUDIT YOUR SKILLS"
            bgColor="bg-[#F4F0E6]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span>TARGET: FULL-STACK</span>
                <span className="border-[2px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                  74% MATCH
                </span>
              </div>

              <div>
                <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase mb-1.5">
                  MATCHED COMPETENCIES (EMERALD)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="border-[2px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A]">
                    TypeScript
                  </span>
                  <span className="border-[2px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A]">
                    React 18
                  </span>
                  <span className="border-[2px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A]">
                    Node.js
                  </span>
                </div>
              </div>

              <div>
                <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase mb-1.5">
                  CRITICAL MISSING (HOT PINK)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="border-[2px] border-[#0A0A0A] bg-[#FF5CAA] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A]">
                    PostgreSQL ACID
                  </span>
                  <span className="border-[2px] border-[#0A0A0A] bg-[#FF5CAA] text-white px-2 py-0.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A]">
                    Docker
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>
        </SlideReveal>

        {/* CARD 03: Career Recovery & Backlog Module (Col span 5) */}
        <SlideReveal direction="left" delay={0.2} className="md:col-span-5">
          <BentoCard
            numberLabel="03/05"
            tag="RECOVERY MATRIX"
            title="Career Recovery & Backlog Balancer"
            description="Dynamic academic vs upskilling split. Defend your exam credits while building live portfolio software."
            ctaLink="/recovery"
            ctaText="GENERATE RECOVERY PLAN"
            bgColor="bg-[#F4F0E6]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span>WEEKLY 24H ALLOCATION</span>
                <span className="text-[#FF5CAA]">1 BACKLOG ACTIVE</span>
              </div>

              {/* Stacked Split Bar Chart */}
              <div className="border-[2px] border-[#0A0A0A] h-8 flex overflow-hidden shadow-[2px_2px_0px_#0A0A0A]">
                <div
                  className="bg-[#FFE14D] border-r-[2px] border-[#0A0A0A] flex items-center justify-center font-mono text-xs font-bold text-[#0A0A0A]"
                  style={{ width: "40%" }}
                  title="40% Academics (10h/wk)"
                >
                  40% ACAD
                </div>
                <div
                  className="bg-[#A855F7] flex items-center justify-center font-mono text-xs font-bold text-white"
                  style={{ width: "60%" }}
                  title="60% Tech Upskilling (14h/wk)"
                >
                  60% UPSKILLING
                </div>
              </div>

              <div className="p-2 border-[2px] border-[#0A0A0A] bg-[#FFFFFF] font-mono text-[11px] text-[#222222]">
                <span className="font-bold text-[#0A0A0A]">🛡️ Exam Shield:</span> Academic hours
                surge to 80% during Weeks 7 & 11 to guarantee semester clearance.
              </div>
            </div>
          </BentoCard>
        </SlideReveal>

        {/* CARD 04: What-If Simulator (Col span 7) */}
        <SlideReveal direction="right" delay={0.25} className="md:col-span-7">
          <BentoCard
            numberLabel="04/05"
            tag="WHAT-IF ENGINE"
            title="What-If Career Readiness Simulator"
            description="Adjust weekly study hours and commitment time. Watch how diminishing returns and consistent compounding project your job readiness curve."
            ctaLink="/simulator"
            ctaText="LAUNCH WHAT-IF ENGINE"
            bgColor="bg-[#FFFFFF]"
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between font-mono text-xs font-bold mb-1.5">
                  <span>WEEKLY STUDY HOURS: {studyHours}H/WK</span>
                  <span className="border-[2px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                    {calculatedReadiness}% READINESS
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="45"
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full accent-[#A855F7] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#666666] mt-1">
                  <span>8h (Low)</span>
                  <span>25h (Optimal)</span>
                  <span>45h (Burnout Risk)</span>
                </div>
              </div>

              <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-2.5 font-mono text-xs flex items-center justify-between">
                <span>PROJECTED JOB-READY DATE:</span>
                <span className="font-bold text-[#A855F7]">
                  {studyHours >= 20 ? "IN 14 WEEKS" : "IN 26 WEEKS"}
                </span>
              </div>
            </div>
          </BentoCard>
        </SlideReveal>

        {/* CARD 05: AI Career Mentor & ATS Builder (Col span 12) */}
        <SlideReveal direction="up" delay={0.3} className="md:col-span-12">
          <BentoCard
            numberLabel="05/05"
            tag="AI MENTOR & ATS"
            title="AI Career Mentor & ATS Resume Screening Engine"
            description="Tactical student-to-student advice powered by Gemini (with rule-based fallback) and automated resume scoring with bullet-point rewrites."
            ctaLink="/mentor"
            ctaText="TALK TO MENTOR OR SCAN RESUME"
            bgColor="bg-[#FFFFFF]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mini Chat Preview */}
              <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 space-y-2">
                <div className="font-mono text-[10px] font-bold text-[#555555] uppercase border-b-[1.5px] border-[#0A0A0A] pb-1">
                  TACTICAL MENTOR CHAT
                </div>
                <div className="bg-[#FFFFFF] border-[2px] border-[#0A0A0A] p-2 text-xs font-mono text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
                  Student: &quot;Can I bypass the 6.5 CGPA company cutoff?&quot;
                </div>
                <div className="bg-[#FFE14D] border-[2px] border-[#0A0A0A] p-2 text-xs font-mono text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
                  Mentor: &quot;100%. Product startups care 10x more about live Vercel links and PostgreSQL indexing than first-year physics marks.&quot;
                </div>
              </div>

              {/* Mini ATS Score Stamp */}
              <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 flex flex-col justify-between">
                <div className="font-mono text-[10px] font-bold text-[#555555] uppercase border-b-[1.5px] border-[#0A0A0A] pb-1">
                  RESUME ATS AUDIT
                </div>
                <div className="flex items-center gap-4 py-2">
                  <div className="w-16 h-16 border-[3px] border-[#0A0A0A] bg-[#10B981] text-white flex flex-col items-center justify-center font-heading font-extrabold shadow-[3px_3px_0px_#0A0A0A]">
                    <span className="text-xl leading-none">86</span>
                    <span className="text-[10px] font-mono">/100</span>
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <div className="font-bold text-[#0A0A0A]">PASSED AUTOMATED SCREENER</div>
                    <div className="text-[11px] text-[#444444]">+4 Action verbs & metrics added</div>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-[#A855F7] font-bold">
                  Click to scan full resume text →
                </div>
              </div>
            </div>
          </BentoCard>
        </SlideReveal>

        {/* CARD 06: Portfolio & Project Quality (Col span 6) */}
        <SlideReveal direction="left" delay={0.35} className="md:col-span-6">
          <BentoCard
            numberLabel="06"
            tag="FEATURE #3 • RECRUITER AUDIT"
            title="Portfolio & Project Quality Evaluator"
            description="Evaluates project complexity, code quality, originality, documentation, and real-world implementation. Weed out tutorial clone markers before recruiters filter you out."
            ctaLink="/project-audit"
            ctaText="AUDIT YOUR GITHUB PROJECT"
            bgColor="bg-[#FFFFFF]"
          >
            <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-[#0A0A0A]">5-PILLAR EVALUATION:</span>
                <span className="border-[1.5px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-0.5 text-[10px]">
                  RECRUITER READY
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  ⚡ Architectural Complexity
                </div>
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  🛡️ Strict TypeScript & Tests
                </div>
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  💎 Original Problem Solver
                </div>
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  🌐 Live Production CI/CD
                </div>
              </div>
            </div>
          </BentoCard>
        </SlideReveal>

        {/* CARD 07: Problem-Solving & Analytical Thinking (Col span 6) */}
        <SlideReveal direction="right" delay={0.4} className="md:col-span-6">
          <BentoCard
            numberLabel="07"
            tag="FEATURE #2 • REASONING RIGOR"
            title="Problem-Solving & Analytical Thinking"
            description="Evaluates logical reasoning, algorithmic thinking, debugging, and decision-making abilities. Test your instincts on race conditions, N+1 bottlenecks, and the 14 core patterns."
            ctaLink="/problem-solving"
            ctaText="TAKE ANALYTICAL DIAGNOSTIC"
            bgColor="bg-[#FFFFFF]"
          >
            <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-[#0A0A0A]">DIAGNOSTIC SUITE:</span>
                <span className="border-[1.5px] border-[#0A0A0A] bg-[#A855F7] text-white px-2 py-0.5 text-[10px]">
                  14 PATTERNS
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  🧠 Sliding Window & DFS/BFS
                </div>
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  🐞 Async TOCTOU Concurrency
                </div>
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  ⚡ Redis Cache Stampede
                </div>
                <div className="p-1.5 border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF]">
                  🎯 Cognitive Blind Spot Map
                </div>
              </div>
            </div>
          </BentoCard>
        </SlideReveal>
      </div>
    </section>
  );
};
