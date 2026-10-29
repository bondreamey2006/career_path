"use client";

import React, { useState } from "react";
import { Gauge } from "../ui/Gauge";
import { Sticker } from "../ui/Sticker";
import { Check, Flame, Trophy, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroMockup: React.FC = () => {
  const [activeScore, setActiveScore] = useState(82);

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Floating Sticker Top Left */}
      <div className="absolute -top-6 -left-6 z-20 hidden sm:block">
        <Sticker color="yellow" rotate="-3" size="md">
          NO BACKLOG SHAME 🚫
        </Sticker>
      </div>

      {/* Floating Sticker Top Right */}
      <div className="absolute -top-4 -right-4 z-20">
        <Sticker color="pink" rotate="2" size="md">
          🔥 14 DAYS STREAK
        </Sticker>
      </div>

      {/* Floating Sticker Bottom Left */}
      <div className="absolute -bottom-5 -left-4 z-20">
        <Sticker color="emerald" rotate="2" size="sm">
          SKILL GAP: 3 LEFT
        </Sticker>
      </div>

      {/* Main Brutalist Window */}
      <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] shadow-[10px_10px_0px_#0A0A0A] relative overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[14px_14px_0px_#0A0A0A]">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b-[3px] border-[#0A0A0A] bg-[#F4F0E6] px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-[2px] border-[#0A0A0A] bg-[#FF5CAA]" />
            <span className="w-3.5 h-3.5 border-[2px] border-[#0A0A0A] bg-[#FFE14D]" />
            <span className="w-3.5 h-3.5 border-[2px] border-[#0A0A0A] bg-[#10B981]" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase ml-2 text-[#0A0A0A]">
              TELEMETRY_HUD.SYS
            </span>
          </div>

          <span className="font-mono text-[11px] font-bold uppercase bg-[#FFE14D] border-[2px] border-[#0A0A0A] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
            LIVE RUNTIME
          </span>
        </div>

        {/* Window Content */}
        <div className="p-6 space-y-6">
          {/* Top Status Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 shadow-[2px_2px_0px_#0A0A0A]">
              <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                TARGET ROLE
              </span>
              <span className="font-heading text-sm font-extrabold text-[#0A0A0A] uppercase truncate block">
                Full-Stack Web
              </span>
            </div>
            <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 shadow-[2px_2px_0px_#0A0A0A]">
              <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                ACADEMIC CLEARANCE
              </span>
              <span className="font-heading text-sm font-extrabold text-[#10B981] uppercase flex items-center gap-1">
                <Check className="w-4 h-4 stroke-[3]" /> 1 Cleared (0 Active)
              </span>
            </div>
          </div>

          {/* Central Animated Gauge */}
          <div className="flex justify-center">
            <Gauge score={activeScore} size={220} label="PLACEMENT READINESS" />
          </div>

          {/* Milestone Progress Track */}
          <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-4 shadow-[3px_3px_0px_#0A0A0A]">
            <div className="flex items-center justify-between font-mono text-xs font-bold uppercase mb-2">
              <span className="text-[#0A0A0A] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#A855F7]" />
                Stage 03: Production Systems
              </span>
              <span className="text-[#10B981]">18/24 NODES</span>
            </div>

            {/* Brutalist Progress Bar */}
            <div className="w-full h-4 border-[2px] border-[#0A0A0A] bg-[#FFFFFF] p-0.5">
              <div
                className="h-full bg-[#10B981] border-r-[2px] border-[#0A0A0A] transition-all duration-500"
                style={{ width: "75%" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#444444]">
              <span>Next: Redis Distributed Caching</span>
              <span className="font-bold text-[#0A0A0A]">+4% Readiness</span>
            </div>
          </div>

          {/* Interactive Button to Test Simulation */}
          <div className="pt-2 flex items-center justify-between">
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:underline"
            >
              <span>Test Simulator Response</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setActiveScore((prev) => (prev >= 90 ? 70 : prev + 6))}
              className="border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2.5 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 hover:bg-[#fad82f]"
            >
              Simulate Gain (+6%)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
