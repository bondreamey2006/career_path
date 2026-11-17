"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { Gauge } from "@/components/ui/Gauge";
import { CAREER_ROLES } from "@/data/roles";
import { ProjectAuditResponse } from "@/types";
import {
  Code,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Layers,
  FileCode,
  CheckCircle2,
  FolderGit2,
  Cpu,
  BookOpen,
  Globe,
  Flame,
} from "lucide-react";

export default function ProjectAuditPage() {
  const [projectName, setProjectName] = useState("Distributed Task & Queue Engine");
  const [targetRole, setTargetRole] = useState("full-stack");
  const [repoUrl, setRepoUrl] = useState("https://github.com/student/task-queue");
  const [liveUrl, setLiveUrl] = useState("https://taskengine-demo.vercel.app");
  const [description, setDescription] = useState(
    "High-throughput asynchronous job processor built with Next.js 14, Redis, and PostgreSQL. Handles job retries, dead-letter queues, and exposes real-time status dashboards via WebSockets."
  );

  const [complexityMarkers, setComplexityMarkers] = useState<string[]>([
    "caching-redis",
    "background-queue",
    "db-indexing",
    "acid-transactions",
  ]);

  const [codeQualityMarkers, setCodeQualityMarkers] = useState<string[]>([
    "strict-ts",
    "unit-tests",
    "modular-arch",
    "error-boundaries",
  ]);

  const [originalityTier, setOriginalityTier] = useState<
    "tutorial-clone" | "modified-tutorial" | "bespoke-solution"
  >("bespoke-solution");

  const [documentationLevel, setDocumentationLevel] = useState<
    "minimal-readme" | "standard-readme" | "deep-architecture-docs"
  >("deep-architecture-docs");

  const [deploymentStatus, setDeploymentStatus] = useState<
    "not-deployed" | "free-tier-live" | "production-ci-cd-custom-domain"
  >("production-ci-cd-custom-domain");

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<ProjectAuditResponse | null>(null);

  const toggleComplexity = (id: string) => {
    setComplexityMarkers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleQuality = (id: string) => {
    setCodeQualityMarkers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const loadPreset = (preset: "clone" | "production") => {
    if (preset === "clone") {
      setProjectName("Netflix Clone Web App");
      setTargetRole("full-stack");
      setRepoUrl("https://github.com/student/netflix-clone");
      setLiveUrl("");
      setDescription(
        "Built a Netflix clone using React and TMDB API. Watched a 4-hour YouTube video. Has movie posters and trailer popups."
      );
      setComplexityMarkers([]);
      setCodeQualityMarkers(["modular-arch"]);
      setOriginalityTier("tutorial-clone");
      setDocumentationLevel("minimal-readme");
      setDeploymentStatus("not-deployed");
    } else {
      setProjectName("Real-Time Multi-Tenant Incident Dispatcher");
      setTargetRole("full-stack");
      setRepoUrl("https://github.com/student/incident-ops");
      setLiveUrl("https://incident-ops.dev");
      setDescription(
        "Production incident management platform with optimistic UI updates, distributed BullMQ background jobs, PostgreSQL row-level security, and sub-100ms Redis pub/sub alerts."
      );
      setComplexityMarkers([
        "caching-redis",
        "background-queue",
        "db-indexing",
        "acid-transactions",
        "websockets",
      ]);
      setCodeQualityMarkers([
        "strict-ts",
        "unit-tests",
        "modular-arch",
        "error-boundaries",
        "lint-ci",
      ]);
      setOriginalityTier("bespoke-solution");
      setDocumentationLevel("deep-architecture-docs");
      setDeploymentStatus("production-ci-cd-custom-domain");
    }
    setAuditResult(null);
  };

  const runAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/project-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          targetRole,
          repoUrl,
          liveUrl,
          description,
          complexityMarkers,
          codeQualityMarkers,
          originalityTier,
          documentationLevel,
          deploymentStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAuditResult(data);
      }
    } catch (err) {
      console.error("Project audit failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const complexityOptions = [
    { id: "caching-redis", label: "Redis Caching (TTL / Cache-Aside)" },
    { id: "background-queue", label: "Background Queue / Workers (BullMQ / Celery)" },
    { id: "db-indexing", label: "Explicit Database Composite Indexing" },
    { id: "acid-transactions", label: "ACID Multi-Step Database Transactions" },
    { id: "websockets", label: "Bi-directional WebSockets / Real-Time Sync" },
    { id: "microservices", label: "Docker Multi-Container / Service Separation" },
  ];

  const qualityOptions = [
    { id: "strict-ts", label: "Strict TypeScript (Zero 'any' Policy)" },
    { id: "unit-tests", label: "Automated Unit / Integration Tests" },
    { id: "modular-arch", label: "Modular Layered Architecture (Clean Code)" },
    { id: "error-boundaries", label: "Defensive Error Boundaries & Fallback UI" },
    { id: "lint-ci", label: "Automated GitHub Actions CI/CD Linting" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#0A0A0A] bg-brutal-grid select-none">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          {/* Header */}
          <div className="border-b-[3px] border-[#0A0A0A] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sticker color="yellow" rotate="-2" size="sm">
                  PORTFOLIO QUALITY INDEX
                </Sticker>
                <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                  • RECRUITER PROOF-OF-WORK AUDIT
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                Portfolio & Project Quality
              </h1>
              <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
                Recruiters spend under 30 seconds looking at your resume. Evaluate project
                complexity, code quality, originality, documentation, and real-world implementation
                to ensure your GitHub is an interview magnet.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadPreset("clone")}
                className="border-[2px] border-[#0A0A0A] bg-[#FF5CAA] text-white px-3 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#e04392] transition-colors"
              >
                Load Tutorial Clone ⚠️
              </button>
              <button
                type="button"
                onClick={() => loadPreset("production")}
                className="border-[2px] border-[#0A0A0A] bg-[#10B981] text-white px-3 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#0ea372] transition-colors"
              >
                Load Production Capstone 🔥
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <BrutalCard color="white" shadowSize="md" className="p-6">
                <form onSubmit={runAudit} className="space-y-6">
                  {/* Project Name & Target Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-sm font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                        Target Placement Track
                      </label>
                      <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-sm font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                      >
                        {CAREER_ROLES.map((r) => (
                          <option key={r.id} value={r.slug}>
                            {r.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* URLs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A] flex items-center gap-1">
                        <FolderGit2 className="w-3.5 h-3.5 text-[#0A0A0A]" />
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full border-[3px] border-[#0A0A0A] p-2 font-mono text-xs bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A] flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-[#0A0A0A]" />
                        Live Deployment URL
                      </label>
                      <input
                        type="url"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://yourproject.vercel.app"
                        className="w-full border-[3px] border-[#0A0A0A] p-2 font-mono text-xs bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                      />
                    </div>
                  </div>

                  {/* Architecture Description */}
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-1 text-[#0A0A0A]">
                      Architecture & Problem Summary
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explain what the system does, databases used, caching strategy, and what user problem it solves..."
                      className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-sans text-xs bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                    />
                  </div>

                  {/* 1. Project Complexity */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-[#A855F7]" />
                        1. Architectural Complexity Markers
                      </label>
                      <span className="font-mono text-[10px] font-bold text-[#555555]">
                        {complexityMarkers.length} selected
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {complexityOptions.map((opt) => {
                        const checked = complexityMarkers.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleComplexity(opt.id)}
                            className={`flex items-center text-left p-2 border-[2px] border-[#0A0A0A] text-xs font-medium transition-all ${
                              checked
                                ? "bg-[#FFE14D] shadow-[2px_2px_0px_#0A0A0A] font-bold"
                                : "bg-[#FFFFFF] hover:bg-[#F4F0E6]"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 border-[2px] border-[#0A0A0A] mr-2 flex items-center justify-center shrink-0 ${
                                checked ? "bg-[#0A0A0A] text-[#FFE14D]" : "bg-[#FFFFFF]"
                              }`}
                            >
                              {checked && "✓"}
                            </span>
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Code Quality & Architecture */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A] flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-[#6366F1]" />
                        2. Code Quality & Engineering Hygiene
                      </label>
                      <span className="font-mono text-[10px] font-bold text-[#555555]">
                        {codeQualityMarkers.length} selected
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {qualityOptions.map((opt) => {
                        const checked = codeQualityMarkers.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleQuality(opt.id)}
                            className={`flex items-center text-left p-2 border-[2px] border-[#0A0A0A] text-xs font-medium transition-all ${
                              checked
                                ? "bg-[#6366F1] text-white shadow-[2px_2px_0px_#0A0A0A] font-bold"
                                : "bg-[#FFFFFF] hover:bg-[#F4F0E6]"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 border-[2px] border-[#0A0A0A] mr-2 flex items-center justify-center shrink-0 ${
                                checked ? "bg-[#FFFFFF] text-[#0A0A0A]" : "bg-[#FFFFFF]"
                              }`}
                            >
                              {checked && "✓"}
                            </span>
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Originality & Authenticity */}
                  <div>
                    <label className="block font-mono text-xs font-extrabold uppercase tracking-wider mb-2 text-[#0A0A0A] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FF5CAA]" />
                      3. Project Originality & Premise
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        {
                          id: "tutorial-clone",
                          label: "Tutorial Clone",
                          desc: "Direct clone (Netflix, Spotify, Todo)",
                        },
                        {
                          id: "modified-tutorial",
                          label: "Modified Template",
                          desc: "Added 1-2 custom features to tutorial",
                        },
                        {
                          id: "bespoke-solution",
                          label: "Bespoke Solution",
                          desc: "Authentic custom problem solver",
                        },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            setOriginalityTier(
                              t.id as "tutorial-clone" | "modified-tutorial" | "bespoke-solution"
                            )
                          }
                          className={`p-2.5 border-[2px] border-[#0A0A0A] text-left transition-all ${
                            originalityTier === t.id
                              ? "bg-[#FF5CAA] text-white shadow-[3px_3px_0px_#0A0A0A] font-bold"
                              : "bg-[#FFFFFF] hover:bg-[#F4F0E6]"
                          }`}
                        >
                          <div className="font-heading text-xs uppercase">{t.label}</div>
                          <div
                            className={`text-[10px] mt-0.5 leading-tight ${
                              originalityTier === t.id ? "text-white/90" : "text-[#555555]"
                            }`}
                          >
                            {t.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4 & 5. Documentation & Deployment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-extrabold uppercase tracking-wider mb-1.5 text-[#0A0A0A] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#A855F7]" />
                        4. Documentation Rigor
                      </label>
                      <select
                        value={documentationLevel}
                        onChange={(e) =>
                          setDocumentationLevel(
                            e.target.value as
                              | "minimal-readme"
                              | "standard-readme"
                              | "deep-architecture-docs"
                          )
                        }
                        className="w-full border-[2px] border-[#0A0A0A] p-2 font-mono text-xs bg-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A]"
                      >
                        <option value="minimal-readme">Minimal (Just install commands)</option>
                        <option value="standard-readme">Standard (Screenshots + Features)</option>
                        <option value="deep-architecture-docs">
                          Deep Docs (Architecture Diagram + Benchmarks)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-extrabold uppercase tracking-wider mb-1.5 text-[#0A0A0A] flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#10B981]" />
                        5. Real-World Deployment
                      </label>
                      <select
                        value={deploymentStatus}
                        onChange={(e) =>
                          setDeploymentStatus(
                            e.target.value as
                              | "not-deployed"
                              | "free-tier-live"
                              | "production-ci-cd-custom-domain"
                          )
                        }
                        className="w-full border-[2px] border-[#0A0A0A] p-2 font-mono text-xs bg-[#FFFFFF] shadow-[2px_2px_0px_#0A0A0A]"
                      >
                        <option value="not-deployed">Localhost Only (No public link)</option>
                        <option value="free-tier-live">Hosted Live (Vercel/Render free tier)</option>
                        <option value="production-ci-cd-custom-domain">
                          Production CI/CD + Custom Domain + SSL
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Audit Button */}
                  <BrutalButton
                    type="submit"
                    variant="emerald"
                    size="lg"
                    className="w-full justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                        AUDITING ARCHITECTURE...
                      </span>
                    ) : (
                      "RUN RECRUITER PROJECT AUDIT"
                    )}
                  </BrutalButton>
                </form>
              </BrutalCard>
            </div>

            {/* Results Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {auditResult ? (
                <>
                  {/* Scorecard Hero */}
                  <BrutalCard color="white" shadowSize="lg" className="border-t-[6px] border-t-[#0A0A0A] p-6">
                    <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                      <div>
                        <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                          PROJECT QUALITY INDEX
                        </span>
                        <h3 className="font-heading text-lg font-extrabold uppercase">
                          {projectName}
                        </h3>
                      </div>
                      <div>
                        <Gauge
                          score={auditResult.overallScore}
                          size={160}
                          label="SCORE"
                        />
                      </div>
                    </div>

                    {/* Recruiter Verdict Badge */}
                    <div
                      className={`p-3 border-[2px] border-[#0A0A0A] font-mono text-xs font-extrabold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_#0A0A0A] ${
                        auditResult.overallScore >= 80
                          ? "bg-[#10B981] text-white"
                          : auditResult.overallScore >= 55
                          ? "bg-[#FFE14D] text-[#0A0A0A]"
                          : "bg-[#FF5CAA] text-white"
                      }`}
                    >
                      VERDICT: {auditResult.tier}
                    </div>

                    <p className="font-sans text-xs text-[#222222] font-medium leading-relaxed mb-4">
                      {auditResult.summary}
                    </p>

                    {/* 5 Dimension Progress Meters */}
                    <div className="space-y-3 pt-3 border-t-[2px] border-[#0A0A0A]">
                      {[
                        {
                          dim: auditResult.dimensions.complexity,
                          color: "bg-[#A855F7]",
                        },
                        {
                          dim: auditResult.dimensions.codeQuality,
                          color: "bg-[#6366F1]",
                        },
                        {
                          dim: auditResult.dimensions.originality,
                          color: "bg-[#FF5CAA]",
                        },
                        {
                          dim: auditResult.dimensions.documentation,
                          color: "bg-[#FFE14D]",
                        },
                        {
                          dim: auditResult.dimensions.realWorldImplementation,
                          color: "bg-[#10B981]",
                        },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center text-xs font-mono font-bold mb-1">
                            <span className="text-[#0A0A0A]">{item.dim.name}</span>
                            <span className="text-[#555555]">{item.dim.score}/100</span>
                          </div>
                          <div className="w-full h-3 border-[2px] border-[#0A0A0A] bg-[#F4F0E6] overflow-hidden">
                            <div
                              className={`h-full ${item.color} transition-all duration-500`}
                              style={{ width: `${item.dim.score}%` }}
                            />
                          </div>
                          <div className="text-[10px] font-mono text-[#555555] mt-0.5">
                            {item.dim.verdict}
                          </div>
                        </div>
                      ))}
                    </div>
                  </BrutalCard>

                  {/* Recruiter Teardown Card */}
                  <BrutalCard color="white" shadowSize="md" className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sticker color="pink" rotate="-1" size="sm">
                        RECRUITER TEARDOWN
                      </Sticker>
                    </div>
                    <p className="font-mono text-xs text-[#222222] font-semibold mb-4 leading-relaxed bg-[#F4F0E6] p-3 border-[2px] border-[#0A0A0A]">
                      {auditResult.recruiterTeardown}
                    </p>

                    <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider mb-2 text-[#0A0A0A]">
                      🚨 Immediate Critical Upgrades:
                    </h4>
                    <ul className="space-y-1.5 mb-4">
                      {auditResult.criticalFixes.map((fix, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 font-sans text-xs text-[#333333]">
                          <span className="text-[#FF5CAA] font-bold shrink-0">•</span>
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-heading text-xs font-extrabold uppercase tracking-wider mb-2 text-[#0A0A0A]">
                      ⚡ Architecture Enhancements:
                    </h4>
                    <ul className="space-y-1.5">
                      {auditResult.suggestedArchitectureUpgrades.map((upg, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 font-sans text-xs text-[#333333]">
                          <span className="text-[#10B981] font-bold shrink-0">✓</span>
                          <span>{upg}</span>
                        </li>
                      ))}
                    </ul>
                  </BrutalCard>
                </>
              ) : (
                /* Empty Placeholder State */
                <BrutalCard color="white" shadowSize="md" className="p-8 text-center">
                  <div className="w-14 h-14 border-[3px] border-[#0A0A0A] bg-[#FFE14D] flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#0A0A0A]">
                    <Layers className="w-7 h-7 text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold uppercase tracking-tight text-[#0A0A0A] mb-2">
                    Awaiting Project Audit
                  </h3>
                  <p className="font-sans text-xs text-[#555555] max-w-sm mx-auto mb-6">
                    Fill in your project architecture details or click one of the quick presets at the top
                    to generate your comprehensive Recruiter Proof-of-Work scorecard.
                  </p>
                  <BrutalButton
                    type="button"
                    variant="yellow"
                    size="md"
                    onClick={() => runAudit()}
                    className="w-full justify-center"
                  >
                    RUN AUDIT NOW
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
