"use client";

import React, { useRef } from "react";
import { CAREER_ROLES } from "@/data/roles";
import { BrutalCard } from "../ui/BrutalCard";
import { BrutalButton } from "../ui/BrutalButton";
import { Sticker } from "../ui/Sticker";
import { ArrowRight, Clock, Banknote, Briefcase, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export const CareerPathsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="paths"
      ref={containerRef}
      className="py-20 border-t-[3px] border-[#0A0A0A] bg-[#F4F0E6] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0A0A] border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2.5 py-1 shadow-[2px_2px_0px_#0A0A0A] inline-block mb-3">
            VERIFIED SYLLABUS TRACKS
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0A0A]">
            CAREER PATH ACCELERATORS
          </h2>
        </div>

        {/* Scroll Control Arrows */}
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs text-[#555555] uppercase hidden sm:block">
            5 DOMAINS • SCROLL TO EXPLORE
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="w-10 h-10 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] flex items-center justify-center shadow-[3px_3px_0px_#0A0A0A] hover:bg-[#FFE14D] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="w-10 h-10 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] flex items-center justify-center shadow-[3px_3px_0px_#0A0A0A] hover:bg-[#FFE14D] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrolling Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto no-scrollbar scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {CAREER_ROLES.map((role, idx) => {
          const cardRotates = ["-1", "1", "-2", "2", "-1"] as const;
          const rotateVal = cardRotates[idx % cardRotates.length];

          return (
            <div
              key={role.id}
              className="min-w-[340px] sm:min-w-[380px] max-w-[400px] shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <BrutalCard
                color="white"
                rotate={rotateVal}
                shadowSize="lg"
                className="h-full flex flex-col justify-between p-6"
              >
                <div>
                  {/* Top Badge & Tier */}
                  <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                    <span
                      className="font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                      style={{
                        backgroundColor: role.accentColor,
                        color: role.accentColor === "#FFE14D" ? "#0A0A0A" : "#FFFFFF",
                      }}
                    >
                      {role.badgeText}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-[#0A0A0A]">
                      0{idx + 1}/05
                    </span>
                  </div>

                  {/* Role Title & Description */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0A] mb-2 leading-tight">
                    {role.title}
                  </h3>
                  <p className="font-sans text-sm text-[#333333] font-medium leading-relaxed mb-6">
                    {role.shortDesc}
                  </p>

                  {/* Benchmark Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 shadow-[2px_2px_0px_#0A0A0A] mb-6">
                    <div>
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-[#555555] uppercase">
                        <Clock className="w-3 h-3" />
                        BENCHMARK
                      </div>
                      <div className="font-heading text-sm font-extrabold text-[#0A0A0A]">
                        {role.benchmarkHours} Hours
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-[#555555] uppercase">
                        <Banknote className="w-3 h-3" />
                        SALARY TIER
                      </div>
                      <div className="font-heading text-xs font-bold text-[#10B981] truncate">
                        {role.averageSalary.split(" ")[0]}
                      </div>
                    </div>
                  </div>

                  {/* Core Skills Chips */}
                  <div className="mb-6">
                    <div className="font-mono text-[11px] font-bold uppercase text-[#555555] mb-2">
                      Core Unlocked Skills:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {role.coreSkills.slice(0, 5).map((skill) => (
                        <span
                          key={skill.id}
                          className="border-[1.5px] border-[#0A0A0A] bg-[#FFFFFF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0A0A0A] shadow-[1.5px_1.5px_0px_#0A0A0A]"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {role.coreSkills.length > 5 && (
                        <span className="font-mono text-[11px] font-bold text-[#555555] py-0.5">
                          +{role.coreSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t-[2px] border-[#0A0A0A]">
                  <BrutalButton
                    variant="primary"
                    size="md"
                    href={`/roadmaps?role=${role.slug}`}
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Open Roadmap Nodes
                  </BrutalButton>
                </div>
              </BrutalCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};
