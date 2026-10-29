"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { Gauge } from "@/components/ui/Gauge";
import { CAREER_ROLES } from "@/data/roles";
import { SimulateResponse } from "@/types";
import { TrendingUp, AlertTriangle, Clock, Zap, CheckCircle2, Sliders } from "lucide-react";

export default function SimulatorPage() {
  const [studyHours, setStudyHours] = useState<number>(24);
  const [weeks, setWeeks] = useState<number>(16);
  const [targetRole, setTargetRole] = useState<string>("full-stack");
  const [data, setData] = useState<SimulateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runSimulation = async (h: number, w: number, r: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyHours: h,
          weeks: w,
          targetRole: r,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation(studyHours, weeks, targetRole);
  }, [studyHours, weeks, targetRole]);

  // Hand-built SVG Curve Dimensions
  const svgWidth = 720;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 30;

  const points = data?.projectedReadinessCurve || [];
  const maxWeeks = Math.max(1, points.length);

  const getX = (weekIdx: number) =>
    paddingX + (weekIdx / Math.max(1, maxWeeks - 1)) * (svgWidth - 2 * paddingX);

  const getY = (readiness: number) =>
    svgHeight - paddingY - (readiness / 100) * (svgHeight - 2 * paddingY);

  const pathD = points.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.readiness);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  const burnoutBadgeColor = {
    LOW: "bg-[#FFE14D] text-[#0A0A0A]",
    BALANCED: "bg-[#10B981] text-white",
    HIGH: "bg-[#A855F7] text-white",
    UNSUSTAINABLE: "bg-[#FF5CAA] text-white",
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
                <Sticker color="violet" rotate="-2" size="sm">
                  DIMINISHING-RETURNS MATH
                </Sticker>
                <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                  • REALISTIC COMPOUNDING
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                What-If Readiness Simulator
              </h1>
              <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
                Explore scenarios: What if you commit 20 hours instead of 10? What if you switch domains?
                Our model maps realistic skill accumulation with diminishing returns past 28 hours/week.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Left Controls (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              <BrutalCard color="white" shadowSize="md" className="p-6">
                <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-6">
                  <h3 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A]">
                    Scenario Parameters
                  </h3>
                  <Sliders className="w-5 h-5 text-[#0A0A0A]" />
                </div>

                <div className="space-y-6">
                  {/* Target Role Selector */}
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1.5">
                      Target Placement Role
                    </label>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-base font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                    >
                      {CAREER_ROLES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Study Hours Slider */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs font-bold uppercase mb-2">
                      <span>WEEKLY STUDY HOURS</span>
                      <span className="border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A] text-sm">
                        {studyHours}h / week
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="55"
                      step="2"
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                      className="w-full accent-[#A855F7] cursor-pointer h-2 bg-[#F4F0E6] border-[2px] border-[#0A0A0A]"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-[#555555] mt-1">
                      <span>6h (Passive)</span>
                      <span>24h (Sweet Spot)</span>
                      <span>50h+ (Fatigue Risk)</span>
                    </div>
                  </div>

                  {/* Weeks Available Slider */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs font-bold uppercase mb-2">
                      <span>TIMELINE HORIZON</span>
                      <span className="border-[2px] border-[#0A0A0A] bg-[#A855F7] text-white px-2 py-0.5 shadow-[2px_2px_0px_#0A0A0A] text-sm">
                        {weeks} Weeks
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="32"
                      step="2"
                      value={weeks}
                      onChange={(e) => setWeeks(Number(e.target.value))}
                      className="w-full accent-[#10B981] cursor-pointer h-2 bg-[#F4F0E6] border-[2px] border-[#0A0A0A]"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-[#555555] mt-1">
                      <span>4 Weeks (Sprint)</span>
                      <span>16 Weeks (1 Sem)</span>
                      <span>32 Weeks (1 Year)</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                {data && (
                  <div className="mt-6 pt-4 border-t-[2px] border-[#0A0A0A] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                      BURNOUT CLASSIFICATION:
                    </span>
                    <span
                      className={`font-mono text-xs font-bold uppercase px-2 py-0.5 border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] ${
                        burnoutBadgeColor[data.burnoutRisk]
                      }`}
                    >
                      {data.burnoutRisk}
                    </span>
                  </div>
                )}
              </BrutalCard>
            </div>

            {/* Right Projection Graph & Metrics (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              {data && (
                <>
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A]">
                      <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                        FINAL READINESS
                      </span>
                      <span className="font-heading text-3xl font-black text-[#10B981]">
                        {data.finalReadiness}%
                      </span>
                    </div>

                    <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A]">
                      <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                        JOB-READY IN
                      </span>
                      <span className="font-heading text-3xl font-black text-[#A855F7]">
                        ~{data.estimatedWeeksToJobReady} Wks
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-1 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A]">
                      <span className="block font-mono text-[10px] font-bold text-[#555555] uppercase">
                        PACE RECOMMENDATION
                      </span>
                      <span className="font-heading text-xs font-extrabold text-[#0A0A0A] uppercase block mt-1">
                        {data.recommendedIntensity}
                      </span>
                    </div>
                  </div>

                  {/* Hand-Built SVG Curve Chart */}
                  <BrutalCard color="white" shadowSize="md" className="p-6">
                    <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                      <span className="font-mono text-xs font-bold uppercase text-[#0A0A0A] flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-[#A855F7]" />
                        Projected Readiness Growth Curve
                      </span>
                      <span className="font-mono text-[11px] text-[#555555] uppercase">
                        80% = PLACEMENT THRESHOLD
                      </span>
                    </div>

                    {/* SVG Container */}
                    <div className="w-full overflow-x-auto">
                      <svg
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        className="w-full h-auto min-w-[500px] border-[2px] border-[#0A0A0A] bg-[#FFFFFF]"
                      >
                        {/* Horizontal Grid Lines */}
                        {[25, 50, 75, 100].map((val) => {
                          const y = getY(val);
                          return (
                            <g key={val}>
                              <line
                                x1={paddingX}
                                y1={y}
                                x2={svgWidth - paddingX}
                                y2={y}
                                stroke="#E5E5E5"
                                strokeWidth="1"
                                strokeDasharray={val === 80 ? "0" : "3 3"}
                              />
                              <text
                                x={paddingX - 8}
                                y={y + 4}
                                textAnchor="end"
                                fontSize="10"
                                fontFamily="monospace"
                                fill="#888888"
                              >
                                {val}%
                              </text>
                            </g>
                          );
                        })}

                        {/* 80% Job Ready Dotted Rule */}
                        <line
                          x1={paddingX}
                          y1={getY(80)}
                          x2={svgWidth - paddingX}
                          y2={getY(80)}
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={svgWidth - paddingX - 4}
                          y={getY(80) - 6}
                          textAnchor="end"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                          fill="#10B981"
                        >
                          80% JOB READY
                        </text>

                        {/* Projected Curve Polyline */}
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#A855F7"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Point Markers */}
                        {points.map((pt, i) => {
                          if (i % 2 !== 0 && i !== points.length - 1) return null;
                          const cx = getX(i);
                          const cy = getY(pt.readiness);
                          return (
                            <g key={i}>
                              <circle
                                cx={cx}
                                cy={cy}
                                r="4"
                                fill="#FFE14D"
                                stroke="#0A0A0A"
                                strokeWidth="2"
                              />
                              <text
                                x={cx}
                                y={svgHeight - 10}
                                textAnchor="middle"
                                fontSize="10"
                                fontFamily="monospace"
                                fontWeight="bold"
                                fill="#555555"
                              >
                                W{pt.week}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Verdict Box */}
                    <div className="mt-4 p-3 border-[2px] border-[#0A0A0A] bg-[#F4F0E6] font-mono text-xs text-[#222222]">
                      <span className="font-bold text-[#0A0A0A]">Model Verdict:</span> {data.verdict}
                    </div>
                  </BrutalCard>
                </>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
