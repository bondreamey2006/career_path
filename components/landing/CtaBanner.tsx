"use client";

import React from "react";
import { BrutalButton } from "../ui/BrutalButton";
import { Sticker } from "../ui/Sticker";
import { Starburst, SquiggleArrow } from "../ui/Doodles";
import { ArrowRight, Terminal } from "lucide-react";

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      <div className="relative border-[4px] border-[#0A0A0A] bg-[#A855F7] p-8 sm:p-14 shadow-[12px_12px_0px_#0A0A0A] overflow-hidden text-white">
        {/* Decorative Doodles */}
        <div className="absolute top-4 right-4 hidden sm:block">
          <Starburst size={48} color="#FFE14D" />
        </div>
        <div className="absolute bottom-6 left-6 hidden lg:block opacity-30">
          <Terminal size={90} className="text-[#0A0A0A]" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="mb-4">
            <Sticker color="yellow" rotate="-2" size="md">
              TIME TO EXECUTE ⚡
            </Sticker>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-none mb-6">
            STOP DREADING PLACEMENTS.{" "}
            <span className="bg-[#FFE14D] text-[#0A0A0A] px-2 border-[3px] border-[#0A0A0A] inline-block shadow-[4px_4px_0px_#0A0A0A] rotate-1">
              START SHIPPING.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-white font-medium max-w-xl mb-8 leading-relaxed">
            Backlogs and low GPAs feel like a death sentence until you put a live, indexed,
            authenticated production app in front of a hiring lead. Map your recovery in under 5 minutes.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <BrutalButton
              variant="yellow"
              size="xl"
              href="/roadmaps"
              icon={<ArrowRight className="w-5 h-5 text-[#0A0A0A]" />}
            >
              Start Free Roadmap
            </BrutalButton>

            <BrutalButton
              variant="secondary"
              size="xl"
              href="/simulator"
            >
              Simulate Time-To-Ready
            </BrutalButton>
          </div>
        </div>
      </div>
    </section>
  );
};
