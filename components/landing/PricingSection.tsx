"use client";

import React from "react";
import { BrutalCard } from "../ui/BrutalCard";
import { BrutalButton } from "../ui/BrutalButton";
import { Sticker } from "../ui/Sticker";
import { Check, Zap, Sparkles, Building2 } from "lucide-react";
import { SlideReveal } from "../ui/SlideReveal";

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      <SlideReveal direction="up">
        <div className="mb-14 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2.5 py-1 shadow-[2px_2px_0px_#0A0A0A] inline-block mb-3">
            TRANSPARENT VALUE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A] mb-3">
            CHUNKY PLANS. NO TRICKS.
          </h2>
          <p className="font-sans text-base text-[#444444] max-w-xl mx-auto font-medium">
            Core features are 100% free for college students. Upgrade only when you want direct
            portfolio audits, personalized mock technical screens, or campus cohort licensing.
          </p>
        </div>
      </SlideReveal>

      {/* 3 Chunky Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
        {/* FREE PLAN */}
        <SlideReveal direction="left" delay={0.1}>
          <BrutalCard
            color="white"
            rotate="-1"
            shadowSize="md"
            className="p-8 h-full flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-6">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#555555]">
                  TIER 01
                </span>
                <span className="font-mono text-xs font-bold border-[2px] border-[#0A0A0A] bg-[#FFFFFF] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                  INDIVIDUAL STUDENT
                </span>
              </div>

              <h3 className="font-heading text-3xl font-extrabold uppercase text-[#0A0A0A] mb-1">
                FREE STUDENT
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-5xl font-black text-[#0A0A0A]">₹0</span>
                <span className="font-mono text-xs text-[#555555] uppercase font-bold">
                  / FOREVER
                </span>
              </div>

              <ul className="space-y-3 font-mono text-xs font-bold text-[#2A2A2A] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>All 5 Career Roadmaps & Progress Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Interactive What-If Readiness Simulator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>12-Week Academic vs Upskill Balancer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Resume Skill Gap Analyzer & Priority Ranks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Rule-Based AI Career Recovery Assistant</span>
                </li>
              </ul>
            </div>

            <BrutalButton variant="secondary" size="lg" href="/roadmaps" className="w-full">
              Start Free Today
            </BrutalButton>
          </BrutalCard>
        </SlideReveal>

        {/* PRO ACCELERATOR (RAISED AND ROTATED) */}
        <SlideReveal direction="up" delay={0.2} className="relative z-10 -mt-2 lg:-mt-4">
          <BrutalCard
            color="yellow"
            rotate="1"
            shadowSize="xl"
            hasTape={true}
            tapeText="MOST POPULAR FOR FINAL YEAR"
            className="p-8 h-full flex flex-col justify-between border-[4px]"
          >
            <div>
              <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-6">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#0A0A0A]">
                  TIER 02
                </span>
                <span className="font-mono text-xs font-bold border-[2px] border-[#0A0A0A] bg-[#FF5CAA] text-white px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                  PLACEMENT SPRINT
                </span>
              </div>

              <h3 className="font-heading text-3xl font-extrabold uppercase text-[#0A0A0A] mb-1">
                PRO RECOVERY
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-5xl font-black text-[#0A0A0A]">₹499</span>
                <span className="font-mono text-xs text-[#0A0A0A] uppercase font-bold">
                  / ONE-TIME
                </span>
              </div>

              <ul className="space-y-3 font-mono text-xs font-bold text-[#0A0A0A] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A0A0A] stroke-[3]" />
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A0A0A] stroke-[3]" />
                  <span>Full Gemini 1.5/2.0 AI Mentor with persistent context</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A0A0A] stroke-[3]" />
                  <span>Automated ATS Resume Rewrites with metric formulas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A0A0A] stroke-[3]" />
                  <span>Custom Backlog Re-Exam Syllabus Priority Breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0A0A0A] stroke-[3]" />
                  <span>GitHub README & Portfolio Architecture Audit</span>
                </li>
              </ul>
            </div>

            <BrutalButton
              variant="black"
              size="lg"
              href="/mentor"
              className="w-full text-white"
              icon={<Zap className="w-4 h-4 text-[#FFE14D]" />}
            >
              Get Pro Recovery Access
            </BrutalButton>
          </BrutalCard>
        </SlideReveal>

        {/* CAMPUS LABS */}
        <SlideReveal direction="right" delay={0.3}>
          <BrutalCard
            color="white"
            rotate="-2"
            shadowSize="md"
            className="p-8 h-full flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-6">
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#555555]">
                  TIER 03
                </span>
                <span className="font-mono text-xs font-bold border-[2px] border-[#0A0A0A] bg-[#FFFFFF] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                  TPO & COLLEGES
                </span>
              </div>

              <h3 className="font-heading text-3xl font-extrabold uppercase text-[#0A0A0A] mb-1">
                CAMPUS COHORT
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-5xl font-black text-[#0A0A0A]">₹29k</span>
                <span className="font-mono text-xs text-[#555555] uppercase font-bold">
                  / BATCH
                </span>
              </div>

              <ul className="space-y-3 font-mono text-xs font-bold text-[#2A2A2A] mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Department Placement Officer (TPO) Dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Real-time Cohort Skill-Gap Heatmap</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Early Intervention Alert for At-Risk Students</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981] stroke-[3]" />
                  <span>Automated Company Cutoff Matching Engine</span>
                </li>
              </ul>
            </div>

            <BrutalButton
              variant="outline"
              size="lg"
              href="mailto:contact@careerpath.edu"
              external
              className="w-full"
              icon={<Building2 className="w-4 h-4" />}
            >
              Contact Campus Team
            </BrutalButton>
          </BrutalCard>
        </SlideReveal>
      </div>
    </section>
  );
};
