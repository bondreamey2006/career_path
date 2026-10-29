"use client";

import React from "react";
import { Sticker } from "../ui/Sticker";
import { BrutalButton } from "../ui/BrutalButton";
import { HeroMockup } from "./HeroMockup";
import { SquiggleArrow } from "../ui/Doodles";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Sticker Badge */}
          <div className="inline-block">
            <Sticker color="yellow" rotate="-2" size="md">
              🚀 Powered by Adaptive AI & Skill Gap Analytics for SY/TY Students
            </Sticker>
          </div>

          {/* H1 Headline Exactly as Requested */}
          <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#0A0A0A] leading-[1.05]">
            Your Intelligent{" "}
            <span className="relative inline-block bg-[#FFE14D] border-[3px] border-[#0A0A0A] px-2 shadow-[4px_4px_0px_#0A0A0A] -rotate-1 mx-1">
              GPS
            </span>{" "}
            for Career Recovery, Skill Growth, &{" "}
            <span className="relative inline-block bg-[#A855F7] text-white border-[3px] border-[#0A0A0A] px-2 shadow-[4px_4px_0px_#0A0A0A] rotate-1 mt-1">
              Job Readiness.
            </span>
          </h1>

          {/* Blunt, Student-to-Student Subheadline */}
          <p className="font-sans text-base sm:text-lg text-[#2A2A2A] font-medium leading-relaxed max-w-2xl">
            Stuck with active backlogs, a low CGPA, or feeling lost in a career pivot? Stop drowning
            in panic. We map out an unforgiving, step-by-step technical journey with realistic hourly
            budgets to turn novice students into confident, hireable software engineers.
          </p>

          {/* Dual CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <BrutalButton
              variant="primary"
              size="lg"
              href="/roadmaps"
              icon={<ArrowRight className="w-5 h-5 text-white" />}
            >
              Explore Career Roadmaps
            </BrutalButton>

            <BrutalButton
              variant="secondary"
              size="lg"
              href="/simulator"
            >
              Simulate What-If Scenarios
            </BrutalButton>
          </div>

          {/* Social Proof Metric Doodad */}
          <div className="pt-4 flex items-center gap-4 border-t-[2px] border-[#0A0A0A] max-w-lg">
            <div className="flex -space-x-2">
              {["#FF5CAA", "#FFE14D", "#10B981", "#6366F1"].map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className="w-8 h-8 rounded-none border-[2px] border-[#0A0A0A] flex items-center justify-center font-mono text-[10px] font-bold text-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A]"
                >
                  SY
                </div>
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-[#333333] uppercase">
              Used by 1,400+ engineering students clearing backlogs this semester
            </span>
          </div>
        </div>

        {/* Right Column: Hero Mockup Window */}
        <div className="lg:col-span-5 relative">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
};
