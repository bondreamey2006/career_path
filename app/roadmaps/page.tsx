"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { RoadmapNode } from "@/components/ui/RoadmapNode";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { CAREER_ROLES } from "@/data/roles";
import { ROLE_ROADMAPS } from "@/data/roadmaps";
import { getStoredProfile, toggleNodeCompletion } from "@/lib/storage";
import { RoleRoadmap, CareerRole } from "@/types";
import { CheckCircle2, Clock, Sparkles, Trophy, BookOpen, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

function RoadmapsContent() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") || "full-stack";

  const [selectedRoleSlug, setSelectedRoleSlug] = useState<string>(initialRoleParam);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [activeStageFilter, setActiveStageFilter] = useState<number | null>(null);

  useEffect(() => {
    const profile = getStoredProfile();
    setCompletedNodeIds(profile.completedNodes);

    if (searchParams.get("role")) {
      setSelectedRoleSlug(searchParams.get("role") || "full-stack");
    }
  }, [searchParams]);

  const activeRole: CareerRole =
    CAREER_ROLES.find((r) => r.slug === selectedRoleSlug) || CAREER_ROLES[0];
  const activeRoadmap: RoleRoadmap =
    ROLE_ROADMAPS[selectedRoleSlug] || ROLE_ROADMAPS["full-stack"];

  // Calculate completion metrics
  const allNodes = activeRoadmap.phases.flatMap((p) => p.nodes);
  const totalNodesCount = allNodes.length;
  const completedCount = allNodes.filter((n) =>
    completedNodeIds.includes(n.id)
  ).length;
  const completedPercentage =
    totalNodesCount > 0 ? Math.round((completedCount / totalNodesCount) * 100) : 0;

  const completedHours = allNodes
    .filter((n) => completedNodeIds.includes(n.id))
    .reduce((sum, n) => sum + n.estimatedHours, 0);

  const handleToggleNode = (nodeId: string) => {
    const updated = toggleNodeCompletion(nodeId);
    setCompletedNodeIds(updated.completedNodes);

    // If node was marked complete, trigger confetti burst
    if (updated.completedNodes.includes(nodeId)) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#A855F7", "#FFE14D", "#10B981", "#FF5CAA"],
      });
    }
  };

  const filteredPhases = activeStageFilter
    ? activeRoadmap.phases.filter((p) => p.stageNumber === activeStageFilter)
    : activeRoadmap.phases;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#0A0A0A] bg-brutal-grid select-none">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Page Header */}
        <div className="border-b-[3px] border-[#0A0A0A] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sticker color="yellow" rotate="-2" size="sm">
                SYLLABUS GRAPH ENGINE
              </Sticker>
              <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                • 100% PERSISTENT PROGRESS
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
              Interactive Career Roadmaps
            </h1>
            <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
              Select your target role. Every node includes core concepts, unlocked skills, and curated
              free resources. Check nodes as you finish them to build your placement readiness score.
            </p>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[4px_4px_0px_#0A0A0A] min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
              <span>COMPLETION:</span>
              <span className="text-[#10B981] font-extrabold">{completedPercentage}%</span>
            </div>
            <div className="w-full h-3.5 border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-0.5">
              <div
                className="h-full bg-[#10B981] transition-all duration-300"
                style={{ width: `${completedPercentage}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-[#555555]">
              <span>{completedCount}/{totalNodesCount} Nodes</span>
              <span>~{completedHours}h Logged</span>
            </div>
          </div>
        </div>

        {/* Role Selector Sliding Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CAREER_ROLES.map((role) => {
            const isSelected = role.slug === selectedRoleSlug;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleSlug(role.slug)}
                className={`px-4 py-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-[3px] border-[#0A0A0A] whitespace-nowrap transition-all duration-100 ${
                  isSelected
                    ? "bg-[#FFE14D] text-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] -translate-y-1"
                    : "bg-[#FFFFFF] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#F4F0E6]"
                }`}
              >
                {role.title.split(" ")[0]} ({role.slug})
              </button>
            );
          })}
        </div>

        {/* Active Role Meta Card */}
        <BrutalCard
          color="white"
          shadowSize="md"
          className="p-6 mb-10 border-[3px]"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="font-mono text-xs font-bold uppercase px-2.5 py-0.5 border-[2px] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                  style={{
                    backgroundColor: activeRole.accentColor,
                    color: activeRole.accentColor === "#FFE14D" ? "#0A0A0A" : "#FFFFFF",
                  }}
                >
                  {activeRole.badgeText}
                </span>
                <span className="font-mono text-xs font-bold text-[#555555]">
                  BENCHMARK: ~{activeRole.benchmarkHours} HOURS • SALARY: {activeRole.averageSalary}
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0A0A0A]">
                {activeRole.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#333333] font-medium leading-relaxed">
                {activeRole.fullDesc}
              </p>
            </div>

            {/* Pivot Advice Callout */}
            <div className="border-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-4 max-w-sm shrink-0 shadow-[2px_2px_0px_#0A0A0A]">
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#A855F7] uppercase mb-1">
                <AlertCircle className="w-4 h-4 text-[#A855F7]" />
                RECOVERY / PIVOT STRATEGY
              </div>
              <p className="font-sans text-xs text-[#2A2A2A] leading-relaxed">
                {activeRole.careerPivotAdvice}
              </p>
            </div>
          </div>
        </BrutalCard>

        {/* Stage Filter Buttons */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase text-[#555555]">
              Filter Stage:
            </span>
            <button
              onClick={() => setActiveStageFilter(null)}
              className={`px-3 py-1 font-mono text-xs font-bold uppercase border-[2px] border-[#0A0A0A] ${
                activeStageFilter === null
                  ? "bg-[#0A0A0A] text-white shadow-[2px_2px_0px_#0A0A0A]"
                  : "bg-white text-black hover:bg-[#F4F0E6]"
              }`}
            >
              All Stages
            </button>
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStageFilter(s)}
                className={`px-3 py-1 font-mono text-xs font-bold uppercase border-[2px] border-[#0A0A0A] ${
                  activeStageFilter === s
                    ? "bg-[#FFE14D] text-black shadow-[2px_2px_0px_#0A0A0A]"
                    : "bg-white text-black hover:bg-[#F4F0E6]"
                }`}
              >
                Stage 0{s}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-[#555555]">
            Click checkbox on any node to toggle completion
          </div>
        </div>

        {/* Roadmap Phases & Nodes */}
        <div className="space-y-12">
          {filteredPhases.map((phase) => {
            const phaseCompletedCount = phase.nodes.filter((n) =>
              completedNodeIds.includes(n.id)
            ).length;
            const phaseTotalCount = phase.nodes.length;
            const isPhaseAllDone =
              phaseTotalCount > 0 && phaseCompletedCount === phaseTotalCount;

            return (
              <div
                key={phase.id}
                className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#0A0A0A]"
              >
                {/* Phase Header */}
                <div className="border-b-[3px] border-[#0A0A0A] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-extrabold uppercase px-2 py-0.5 border-[2px] border-[#0A0A0A] bg-[#FFE14D] shadow-[2px_2px_0px_#0A0A0A]">
                        {phase.badge}
                      </span>
                      {isPhaseAllDone && (
                        <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 border-[2px] border-[#0A0A0A] bg-[#10B981] text-white shadow-[2px_2px_0px_#0A0A0A]">
                          PHASE MASTERED 🏆
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold uppercase text-[#0A0A0A]">
                      {phase.title}
                    </h3>
                    <p className="font-sans text-sm text-[#444444] font-medium mt-1">
                      {phase.description}
                    </p>
                  </div>

                  <div className="font-mono text-xs font-bold border-[2px] border-[#0A0A0A] bg-[#F4F0E6] px-3 py-1.5 self-start sm:self-auto shadow-[2px_2px_0px_#0A0A0A]">
                    {phaseCompletedCount}/{phaseTotalCount} NODES UNLOCKED
                  </div>
                </div>

                {/* Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {phase.nodes.map((node, nodeIdx) => (
                    <RoadmapNode
                      key={node.id}
                      node={node}
                      index={nodeIdx + 1}
                      isCompleted={completedNodeIds.includes(node.id)}
                      onToggle={handleToggleNode}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RoadmapsPage() {
  return (
    <PageTransition>
      <Suspense fallback={<div className="p-10 font-mono">Loading Roadmaps...</div>}>
        <RoadmapsContent />
      </Suspense>
    </PageTransition>
  );
}
