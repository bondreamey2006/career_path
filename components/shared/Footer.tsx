"use client";

import React from "react";
import Link from "next/link";
import { CompassLogo } from "../ui/Doodles";
import { ArrowUpRight, Terminal, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t-[3px] border-[#0A0A0A] bg-[#F4F0E6] text-[#0A0A0A] select-none">
      {/* Top Banner Strip */}
      <div className="border-b-[3px] border-[#0A0A0A] bg-[#0A0A0A] text-[#F4F0E6] px-4 py-3 font-mono text-xs md:text-sm font-bold uppercase tracking-widest flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FFE14D]" />
          <span>PROJECT-BASED LEARNING (PBL) INITIATIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>ZERO CORPORATE JARGON • 100% PROOF-OF-WORK</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CompassLogo size={36} />
              <span className="font-heading text-2xl font-extrabold uppercase">
                Career<span className="bg-[#FFE14D] px-1 border-[2px] border-[#0A0A0A] ml-0.5">Path</span>
              </span>
            </div>
            <p className="font-sans text-sm text-[#2A2A2A] max-w-md font-medium leading-relaxed">
              Adaptive career recovery and tech reinvention platform built for engineering students
              navigating backlogs, low CGPAs, or ambitious career pivots. Replace anxiety with
              repeatable, week-by-week engineering milestones.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="font-mono text-xs font-bold uppercase border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
                BUILT BY STUDENTS, FOR STUDENTS
              </span>
            </div>
          </div>

          {/* Quick Tools Links */}
          <div>
            <h4 className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2 mb-3">
              Tools & Engines
            </h4>
            <ul className="space-y-2 font-mono text-xs font-bold uppercase">
              <li>
                <Link href="/roadmaps" className="hover:underline flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Career Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/skill-gap" className="hover:underline flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Skill Gap Analyzer
                </Link>
              </li>
              <li>
                <Link href="/recovery" className="hover:underline flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Academic Recovery
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:underline flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  What-If Simulator
                </Link>
              </li>
              <li>
                <Link href="/mentor" className="hover:underline flex items-center gap-1 group">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  AI Mentor & ATS
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Paths */}
          <div>
            <h4 className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2 mb-3">
              Placement Paths
            </h4>
            <ul className="space-y-2 font-mono text-xs font-bold uppercase">
              <li>
                <Link href="/roadmaps?role=full-stack" className="hover:underline">
                  • Full-Stack Web
                </Link>
              </li>
              <li>
                <Link href="/roadmaps?role=data-ai" className="hover:underline">
                  • Data Science & AI
                </Link>
              </li>
              <li>
                <Link href="/roadmaps?role=backend" className="hover:underline">
                  • Backend & Systems
                </Link>
              </li>
              <li>
                <Link href="/roadmaps?role=cloud-devops" className="hover:underline">
                  • Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link href="/roadmaps?role=cybersecurity" className="hover:underline">
                  • Cybersecurity
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rule & Copyright */}
        <div className="mt-12 pt-6 border-t-[2px] border-[#0A0A0A] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#444444]">
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5CAA] fill-current inline" />
            <span>and zero SaaS buzzwords for resilient engineers.</span>
          </div>
          <div className="flex items-center gap-4 uppercase font-bold text-[#0A0A0A]">
            <span>Next.js 14 App Router</span>
            <span>•</span>
            <span>Vercel Deployable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
