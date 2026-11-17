"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { Gauge } from "@/components/ui/Gauge";
import { PROBLEM_SOLVING_QUESTIONS } from "@/data/problemSolvingData";
import {
  ProblemSolvingQuestion,
  ProblemSolvingEvaluationResponse,
} from "@/types";
import {
  Brain,
  Bug,
  Scale,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Terminal,
  ArrowRight,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export default function ProblemSolvingPage() {
  const [questions, setQuestions] = useState<ProblemSolvingQuestion[]>(PROBLEM_SOLVING_QUESTIONS);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [activeFilter, setActiveFilter] = useState<"all" | "algorithmic" | "debugging" | "decision-making">("all");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<ProblemSolvingEvaluationResponse | null>(null);

  // Pre-select sample answers so the user can immediately test or submit
  useEffect(() => {
    // Select answers for immediate demonstration
    const initial: Record<string, string> = {
      "algo-1": "opt-1b", // correct
      "algo-2": "opt-2a", // correct
      "algo-3": "opt-3a", // correct
      "debug-1": "opt-d1b", // correct
      "debug-2": "opt-d2b", // correct
      "debug-3": "opt-d3a", // correct
      "decide-1": "opt-dec1b", // correct
      "decide-2": "opt-dec2a", // correct
      "decide-3": "opt-dec3b", // correct
    };
    setSelectedAnswers(initial);
  }, []);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitEvaluation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/problem-solving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: "full-stack",
          answers: selectedAnswers,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEvaluation(data);
        // Scroll smoothly to results
        setTimeout(() => {
          document.getElementById("results-panel")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (err) {
      console.error("Evaluation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setEvaluation(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredQuestions =
    activeFilter === "all"
      ? questions
      : questions.filter((q) => q.dimension === activeFilter);

  const answeredCount = Object.keys(selectedAnswers).length;

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
                  ANALYTICAL RIGOR ENGINE
                </Sticker>
                <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                  • LOGICAL REASONING & DEBUGGING
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                Problem-Solving & Analytical Thinking
              </h1>
              <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
                Evaluates algorithmic pattern recognition, production debugging under concurrency, and
                architectural decision-making. Stop memorizing 600 LeetCode problems blindly—diagnose
                your true engineering intuition.
              </p>
            </div>

            {/* Quick Action Counters */}
            <div className="border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-3 shadow-[4px_4px_0px_#0A0A0A] flex items-center gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase font-bold text-[#555555]">
                  PROGRESS
                </div>
                <div className="font-heading text-xl font-extrabold text-[#0A0A0A]">
                  {answeredCount} / {questions.length} Answered
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="p-2 border-[2px] border-[#0A0A0A] hover:bg-[#FFE14D] transition-colors"
                title="Reset answers"
              >
                <RotateCcw className="w-4 h-4 text-[#0A0A0A]" />
              </button>
            </div>
          </div>

          {/* Dimension Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#555555] mr-2">
              Filter By Pillar:
            </span>
            {[
              { id: "all", label: "All Challenges", icon: Sparkles },
              { id: "algorithmic", label: "Algorithmic Patterns", icon: Brain },
              { id: "debugging", label: "Production Debugging", icon: Bug },
              { id: "decision-making", label: "Trade-offs & Decisions", icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border-[2px] border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#FFE14D] shadow-[3px_3px_0px_#0A0A0A] -translate-y-0.5"
                      : "bg-[#FFFFFF] hover:bg-[#F4F0E6]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Questions Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {filteredQuestions.map((q, idx) => {
                const selectedOptId = selectedAnswers[q.id];
                const explanationData = evaluation?.explanations?.[q.id];

                return (
                  <BrutalCard key={q.id} color="white" shadowSize="md" className="p-6">
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3 border-b-[2px] border-[#0A0A0A] pb-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 border-[1.5px] border-[#0A0A0A] font-mono text-[10px] font-extrabold uppercase ${
                              q.dimension === "algorithmic"
                                ? "bg-[#A855F7] text-white"
                                : q.dimension === "debugging"
                                ? "bg-[#FF5CAA] text-white"
                                : "bg-[#10B981] text-white"
                            }`}
                          >
                            {q.dimensionTitle}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-[#555555]">
                            DIFFICULTY: {q.difficulty}
                          </span>
                        </div>
                        <h3 className="font-heading text-base font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                          #{idx + 1}. {q.title}
                        </h3>
                      </div>

                      {/* Status indicator if evaluated */}
                      {explanationData && (
                        <div
                          className={`px-2 py-1 border-[2px] border-[#0A0A0A] font-mono text-xs font-extrabold uppercase shrink-0 ${
                            explanationData.isCorrect
                              ? "bg-[#10B981] text-white"
                              : "bg-[#FF5CAA] text-white"
                          }`}
                        >
                          {explanationData.isCorrect ? "CORRECT ✓" : "GAP DETECTED ✗"}
                        </div>
                      )}
                    </div>

                    {/* Scenario */}
                    <p className="font-sans text-xs text-[#222222] font-medium leading-relaxed mb-3">
                      {q.scenario}
                    </p>

                    {/* Code Snippet if present */}
                    {q.codeSnippet && (
                      <div className="border-[2px] border-[#0A0A0A] bg-[#0A0A0A] text-[#10B981] p-3 font-mono text-xs overflow-x-auto mb-3 shadow-[2px_2px_0px_#0A0A0A]">
                        <div className="flex items-center justify-between text-[10px] text-[#888888] border-b border-[#333333] pb-1 mb-2">
                          <span className="flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-[#FFE14D]" />
                            SCENARIO CODE SNIPPET
                          </span>
                        </div>
                        <pre className="font-mono text-xs whitespace-pre-wrap">{q.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Options List */}
                    <div className="space-y-2 mt-4">
                      {q.options.map((opt) => {
                        const isSelected = selectedOptId === opt.id;
                        let optionStyle = "bg-[#FFFFFF] hover:bg-[#F4F0E6]";

                        if (evaluation) {
                          if (opt.isCorrect) {
                            optionStyle = "bg-[#10B981]/20 border-[#10B981] font-bold";
                          } else if (isSelected && !opt.isCorrect) {
                            optionStyle = "bg-[#FF5CAA]/20 border-[#FF5CAA]";
                          }
                        } else if (isSelected) {
                          optionStyle = "bg-[#FFE14D] shadow-[2px_2px_0px_#0A0A0A] font-bold";
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`w-full text-left p-2.5 border-[2px] border-[#0A0A0A] text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                          >
                            <span
                              className={`w-4 h-4 border-[2px] border-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                                isSelected ? "bg-[#0A0A0A] text-white" : "bg-white"
                              }`}
                            >
                              {isSelected ? "✓" : ""}
                            </span>
                            <span className="flex-1 leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box if evaluated */}
                    {explanationData && (
                      <div className="mt-4 pt-3 border-t-[2px] border-[#0A0A0A] bg-[#F4F0E6] p-3 border-[2px]">
                        <div className="font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#6366F1]" />
                          Technical Rationale:
                        </div>
                        <p className="font-sans text-xs text-[#333333] leading-relaxed">
                          {explanationData.explanation}
                        </p>
                      </div>
                    )}
                  </BrutalCard>
                );
              })}

              {/* Submit Button */}
              <div className="sticky bottom-6 z-20">
                <BrutalButton
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => handleSubmitEvaluation()}
                  disabled={loading}
                  className="w-full justify-center shadow-[6px_6px_0px_#0A0A0A]"
                >
                  {loading ? "EVALUATING REASONING METRICS..." : "SUBMIT & EVALUATE REASONING"}
                </BrutalButton>
              </div>
            </div>

            {/* Results Column (5 cols) */}
            <div id="results-panel" className="lg:col-span-5 space-y-6">
              {evaluation ? (
                <>
                  {/* Hero Scorecard */}
                  <BrutalCard color="white" shadowSize="lg" className="border-t-[6px] border-t-[#0A0A0A] p-6">
                    <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                      <div>
                        <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                          PROBLEM-SOLVING INDEX
                        </span>
                        <h3 className="font-heading text-lg font-extrabold uppercase">
                          Analytical Scorecard
                        </h3>
                      </div>
                      <div>
                        <Gauge
                          score={evaluation.overallScore}
                          size={160}
                          label="INDEX"
                        />
                      </div>
                    </div>

                    {/* Tier Banner */}
                    <div
                      className={`p-3 border-[2px] border-[#0A0A0A] font-mono text-xs font-extrabold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_#0A0A0A] ${
                        evaluation.overallScore >= 80
                          ? "bg-[#10B981] text-white"
                          : evaluation.overallScore >= 55
                          ? "bg-[#FFE14D] text-[#0A0A0A]"
                          : "bg-[#FF5CAA] text-white"
                      }`}
                    >
                      TIER: {evaluation.tier} ({evaluation.correctCount}/{evaluation.totalQuestions} CORRECT)
                    </div>

                    {/* 3 Pillars Breakdown */}
                    <div className="space-y-3 pt-3 border-t-[2px] border-[#0A0A0A]">
                      {[
                        {
                          name: "Algorithmic Thinking",
                          score: evaluation.algorithmicScore,
                          color: "bg-[#A855F7]",
                          icon: Brain,
                        },
                        {
                          name: "Production Debugging",
                          score: evaluation.debuggingScore,
                          color: "bg-[#FF5CAA]",
                          icon: Bug,
                        },
                        {
                          name: "Decision-Making & Trade-offs",
                          score: evaluation.decisionMakingScore,
                          color: "bg-[#10B981]",
                          icon: Scale,
                        },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i}>
                            <div className="flex justify-between items-center text-xs font-mono font-bold mb-1">
                              <span className="flex items-center gap-1.5 text-[#0A0A0A]">
                                <Icon className="w-3.5 h-3.5" />
                                {item.name}
                              </span>
                              <span className="text-[#555555]">{item.score}%</span>
                            </div>
                            <div className="w-full h-3 border-[2px] border-[#0A0A0A] bg-[#F4F0E6] overflow-hidden">
                              <div
                                className={`h-full ${item.color} transition-all duration-500`}
                                style={{ width: `${item.score}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </BrutalCard>

                  {/* Blind Spots & Cognitive Deficiencies */}
                  <BrutalCard color="white" shadowSize="md" className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sticker color="pink" rotate="-1" size="sm">
                        COGNITIVE BLIND SPOTS
                      </Sticker>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {evaluation.blindSpots.map((spot, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 bg-[#F4F0E6] p-2.5 border-[2px] border-[#0A0A0A] font-sans text-xs text-[#222222]"
                        >
                          <AlertTriangle className="w-4 h-4 text-[#FF5CAA] shrink-0 mt-0.5" />
                          <span>{spot}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tactical Playbook */}
                    <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider mb-2 text-[#0A0A0A] flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                      Tactical Screening Playbook:
                    </h4>
                    <ul className="space-y-1.5">
                      {evaluation.tacticalPlaybook.map((p, i) => (
                        <li key={i} className="flex items-start gap-1.5 font-sans text-xs text-[#444444]">
                          <span className="text-[#10B981] font-bold shrink-0">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </BrutalCard>

                  {/* 14-Pattern Roadmap Status */}
                  <BrutalCard color="white" shadowSize="md" className="p-6">
                    <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-2 mb-3">
                      <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
                        14-Pattern Mastery Roadmap
                      </h4>
                      <span className="font-mono text-[10px] text-[#555555]">
                        TARGET: 60 PROBLEMS
                      </span>
                    </div>

                    <div className="space-y-2">
                      {evaluation.patternMasteryRoadmap.map((item, i) => (
                        <div
                          key={i}
                          className="border-[2px] border-[#0A0A0A] p-2 bg-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A]"
                        >
                          <div className="flex items-center justify-between text-xs font-mono font-bold mb-0.5">
                            <span className="text-[#0A0A0A]">{item.pattern}</span>
                            <span
                              className={`px-1.5 py-0.2 border-[1.5px] border-[#0A0A0A] text-[10px] ${
                                item.status === "MASTERED"
                                  ? "bg-[#10B981] text-white"
                                  : item.status === "NEEDS_PRACTICE"
                                  ? "bg-[#FFE14D] text-[#0A0A0A]"
                                  : "bg-[#FF5CAA] text-white"
                              }`}
                            >
                              {item.status.replace("_", " ")}
                            </span>
                          </div>
                          <p className="font-sans text-[10px] text-[#555555]">
                            {item.rationale} ({item.targetCount} targeted problems)
                          </p>
                        </div>
                      ))}
                    </div>
                  </BrutalCard>
                </>
              ) : (
                /* Empty / Ready State */
                <BrutalCard color="white" shadowSize="md" className="p-8 text-center">
                  <div className="w-14 h-14 border-[3px] border-[#0A0A0A] bg-[#A855F7] text-white flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#0A0A0A]">
                    <Brain className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold uppercase tracking-tight text-[#0A0A0A] mb-2">
                    Diagnostic Ready
                  </h3>
                  <p className="font-sans text-xs text-[#555555] max-w-sm mx-auto mb-6">
                    Review each scenario on the left, select your decisions, and click Submit to generate
                    your Problem-Solving Index, cognitive blind spots, and 14-pattern roadmap.
                  </p>
                  <BrutalButton
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => handleSubmitEvaluation()}
                    className="w-full justify-center"
                  >
                    RUN DIAGNOSTIC EVALUATION
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
