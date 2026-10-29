"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { BrutalButton } from "@/components/ui/BrutalButton";
import { Sticker } from "@/components/ui/Sticker";
import { getStoredProfile } from "@/lib/storage";
import { StudentProfile, ChatMessage, AtsCheckResponse } from "@/types";
import { CAREER_ROLES } from "@/data/roles";
import { Send, Bot, User, Sparkles, FileText, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function MentorPage() {
  const [activeTab, setActiveTab] = useState<"mentor" | "ats">("mentor");
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Yo! I'm your CareerPath mentor. Whether you're juggling 3 backlogs, stressed about a 6.4 CGPA, or trying to figure out which tech stack actually hires — ask me directly. No corporate sugarcoating, just real engineering advice.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMode, setChatMode] = useState<"gemini" | "rule-based-fallback">("rule-based-fallback");
  const [suggestions, setSuggestions] = useState<string[]>([
    "I have 2 backlogs in Sem 5. How do I balance study with coding?",
    "Will a 6.8 CGPA block me from product company interviews?",
    "What two projects should I build for Full-Stack roles?",
  ]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // ATS State
  const [atsTargetRole, setAtsTargetRole] = useState("full-stack");
  const [resumeText, setResumeText] = useState("");
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResults, setAtsResults] = useState<AtsCheckResponse | null>(null);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputMessage("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          profile: {
            targetRole: profile.targetRoleId,
            cgpa: profile.cgpa,
            backlogs: profile.backlogs,
            semester: profile.semester,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
        }
        setChatMode(data.mode);
      }
    } catch (err) {
      console.error("Chat request failed:", err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleScanAts = async () => {
    if (!resumeText.trim()) return;
    setAtsLoading(true);

    try {
      const res = await fetch("/api/resume/ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          targetRole: atsTargetRole,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAtsResults(data);
      }
    } catch (err) {
      console.error("ATS check failed:", err);
    } finally {
      setAtsLoading(false);
    }
  };

  const loadSampleResume = () => {
    setResumeText(
      `Alex Rivera | Computer Engineering | Sem 5
Summary: Ambitious full-stack engineer with hands-on experience in modern web development.
Skills: JavaScript, TypeScript, React 18, Next.js, HTML5, Tailwind CSS, Git, GitHub.
Projects:
• Distributed Task Queue: Built a background task scheduler using Node.js and Redis caching. Handled 3,000 requests per minute with sub-50ms latency.
• Campus Recovery Portal: Designed student event portal with Next.js App Router and PostgreSQL relational database. Configured JWT authentication with HttpOnly cookies.
Education: B.Tech Computer Engineering (CGPA: 6.8 / 10.0, 1 backlog cleared in Sem 4).`
    );
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
                <Sticker color="yellow" rotate="-2" size="sm">
                  AI MENTOR & ATS AUTOMATION
                </Sticker>
                <span className="font-mono text-xs font-bold text-[#555555] uppercase">
                  • GEMINI / RULE ENGINE DUAL MODE
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0A0A0A]">
                Career Mentor & ATS Screening
              </h1>
              <p className="font-sans text-base text-[#333333] font-medium max-w-2xl mt-1">
                Direct tactical guidance tailored to your specific backlog and CGPA situation, plus
                automated ATS keyword auditing with bullet-point rewrites.
              </p>
            </div>

            {/* Sliding Tabs Switcher */}
            <div className="flex items-center gap-1 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-1 shadow-[3px_3px_0px_#0A0A0A]">
              <button
                onClick={() => setActiveTab("mentor")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-all ${
                  activeTab === "mentor"
                    ? "bg-[#FFE14D] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                    : "text-[#555555] hover:text-[#0A0A0A]"
                }`}
              >
                1. AI Career Mentor
              </button>
              <button
                onClick={() => setActiveTab("ats")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-all ${
                  activeTab === "ats"
                    ? "bg-[#FFE14D] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
                    : "text-[#555555] hover:text-[#0A0A0A]"
                }`}
              >
                2. ATS Resume Scanner
              </button>
            </div>
          </div>

          {/* TAB 1: AI CAREER MENTOR */}
          {activeTab === "mentor" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Context Card (Col 4) */}
              <div className="lg:col-span-4 space-y-4">
                <BrutalCard color="white" shadowSize="md" className="p-6">
                  <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                    <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                      STUDENT CONTEXT
                    </span>
                    <span className="font-mono text-[10px] font-bold border-[1.5px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[#666666] block text-[10px] uppercase">STUDENT ALIAS</span>
                      <span className="font-bold text-[#0A0A0A] text-sm">{profile.name}</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block text-[10px] uppercase">TARGET ROLE</span>
                      <span className="font-bold text-[#0A0A0A] text-sm capitalize">
                        {profile.targetRoleId}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t-[1.5px] border-[#0A0A0A]">
                      <div>
                        <span className="text-[#666666] block text-[10px] uppercase">SEMESTER</span>
                        <span className="font-bold text-[#0A0A0A]">Sem {profile.semester}</span>
                      </div>
                      <div>
                        <span className="text-[#666666] block text-[10px] uppercase">CGPA</span>
                        <span className="font-bold text-[#0A0A0A]">{profile.cgpa}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t-[1.5px] border-[#0A0A0A]">
                      <span className="text-[#666666] block text-[10px] uppercase">BACKLOG STATUS</span>
                      <span className="font-bold text-[#FF5CAA]">
                        {profile.backlogs > 0 ? `${profile.backlogs} Active Backlog(s)` : "Clean Record"}
                      </span>
                    </div>
                  </div>
                </BrutalCard>

                {/* Prompt Suggestions */}
                <BrutalCard color="yellow" shadowSize="sm" className="p-4">
                  <span className="font-mono text-[10px] font-extrabold uppercase text-[#0A0A0A] block mb-2">
                    SUGGESTED QUESTIONS:
                  </span>
                  <div className="space-y-2">
                    {suggestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left p-2 border-[1.5px] border-[#0A0A0A] bg-white text-xs font-mono font-bold text-[#0A0A0A] hover:bg-[#F4F0E6] shadow-[2px_2px_0px_#0A0A0A] transition-all"
                      >
                        &quot;{q}&quot;
                      </button>
                    ))}
                  </div>
                </BrutalCard>
              </div>

              {/* Right Chat Terminal (Col 8) */}
              <div className="lg:col-span-8">
                <BrutalCard color="white" shadowSize="md" className="p-6 flex flex-col h-[640px]">
                  {/* Chat Terminal Header */}
                  <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 border-[2px] border-[#0A0A0A] bg-[#FFE14D] flex items-center justify-center shadow-[2px_2px_0px_#0A0A0A]">
                        <Bot className="w-4 h-4 text-[#0A0A0A]" />
                      </div>
                      <div>
                        <span className="font-heading text-sm font-extrabold uppercase text-[#0A0A0A]">
                          CareerPath AI Mentor
                        </span>
                        <span className="font-mono text-[10px] text-[#555555] block">
                          MODE: {chatMode.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#10B981] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" /> ONLINE
                    </span>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {m.role === "assistant" && (
                          <div className="w-8 h-8 border-[2px] border-[#0A0A0A] bg-[#FFE14D] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0A0A0A]">
                            <Bot className="w-4 h-4 text-[#0A0A0A]" />
                          </div>
                        )}

                        <div
                          className={`max-w-[82%] border-[2px] border-[#0A0A0A] p-4 text-xs sm:text-sm font-sans leading-relaxed shadow-[3px_3px_0px_#0A0A0A] ${
                            m.role === "user"
                              ? "bg-[#A855F7] text-white"
                              : "bg-[#FFFFFF] text-[#0A0A0A]"
                          }`}
                        >
                          <div className="font-mono text-[10px] font-bold uppercase mb-1 opacity-70">
                            {m.role === "user" ? "YOU" : "SENIOR MENTOR"}
                          </div>
                          <div className="whitespace-pre-wrap">{m.content}</div>
                        </div>

                        {m.role === "user" && (
                          <div className="w-8 h-8 border-[2px] border-[#0A0A0A] bg-[#A855F7] text-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#0A0A0A]">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex items-center gap-2 font-mono text-xs text-[#555555]">
                        <span className="animate-pulse">Mentor is formulating tactical response...</span>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Chat Input Bar */}
                  <div className="pt-4 border-t-[2px] border-[#0A0A0A]">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about backlogs, company cutoffs, projects, or interview prep..."
                        className="flex-1 border-[3px] border-[#0A0A0A] p-3 font-heading text-sm font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                      />
                      <BrutalButton
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={chatLoading}
                        icon={<Send className="w-4 h-4 text-white" />}
                      >
                        Send
                      </BrutalButton>
                    </form>
                  </div>
                </BrutalCard>
              </div>
            </div>
          )}

          {/* TAB 2: ATS RESUME SCANNER */}
          {activeTab === "ats" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Input Box (Col 6) */}
              <div className="lg:col-span-6 space-y-6">
                <BrutalCard color="white" shadowSize="md" className="p-6">
                  <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                    <h3 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A]">
                      Resume ATS Input
                    </h3>
                    <button
                      type="button"
                      onClick={loadSampleResume}
                      className="font-mono text-xs font-bold text-[#A855F7] hover:underline"
                    >
                      [Fill Sample Resume]
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                        Target Role Screening Benchmark
                      </label>
                      <select
                        value={atsTargetRole}
                        onChange={(e) => setAtsTargetRole(e.target.value)}
                        className="w-full border-[3px] border-[#0A0A0A] p-2.5 font-heading text-sm font-bold bg-[#F4F0E6] focus:bg-[#FFFFFF] outline-none shadow-[2px_2px_0px_#0A0A0A]"
                      >
                        {CAREER_ROLES.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                        Resume Content (Text, Markdown, or Project Bullets)
                      </label>
                      <textarea
                        rows={12}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume sections, technical project descriptions, or bio here..."
                        className="w-full border-[3px] border-[#0A0A0A] p-3 font-mono text-xs bg-[#FFFFFF] shadow-[3px_3px_0px_#0A0A0A] outline-none"
                      />
                    </div>

                    <BrutalButton
                      variant="yellow"
                      size="lg"
                      onClick={handleScanAts}
                      disabled={atsLoading || !resumeText.trim()}
                      className="w-full"
                      icon={<Sparkles className="w-4 h-4 text-[#0A0A0A]" />}
                    >
                      {atsLoading ? "Screening Keywords..." : "Scan Resume for ATS Match"}
                    </BrutalButton>
                  </div>
                </BrutalCard>
              </div>

              {/* Output HUD (Col 6) */}
              <div className="lg:col-span-6 space-y-6">
                {atsResults ? (
                  <div className="space-y-6">
                    {/* Score Card */}
                    <BrutalCard color="white" shadowSize="md" className="p-6">
                      <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-4">
                        <span className="font-mono text-xs font-bold uppercase text-[#555555]">
                          ATS AUTOMATED MATCH RATING
                        </span>
                        <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 border-[2px] border-[#0A0A0A] bg-[#FFE14D] shadow-[2px_2px_0px_#0A0A0A]">
                          AUTOMATED SCREENER
                        </span>
                      </div>

                      <div className="flex items-center gap-6 my-2">
                        <div
                          className="w-24 h-24 border-[3px] border-[#0A0A0A] flex flex-col items-center justify-center font-heading font-extrabold shadow-[4px_4px_0px_#0A0A0A]"
                          style={{
                            backgroundColor:
                              atsResults.atsScore >= 75
                                ? "#10B981"
                                : atsResults.atsScore >= 50
                                ? "#FFE14D"
                                : "#FF5CAA",
                            color:
                              atsResults.atsScore >= 50 && atsResults.atsScore < 75
                                ? "#0A0A0A"
                                : "#FFFFFF",
                          }}
                        >
                          <span className="text-3xl leading-none">{atsResults.atsScore}</span>
                          <span className="text-xs font-mono">/ 100</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A]">
                            {atsResults.atsScore >= 75
                              ? "HIGH SCREENING PROBABILITY"
                              : atsResults.atsScore >= 50
                              ? "MODERATE KEYWORD DEFICIENCY"
                              : "HIGH REJECTION RISK"}
                          </h4>
                          <p className="font-sans text-xs text-[#333333] leading-relaxed">
                            {atsResults.placementFitSummary}
                          </p>
                        </div>
                      </div>
                    </BrutalCard>

                    {/* Keywords Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border-[2px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[3px_3px_0px_#0A0A0A]">
                        <span className="block font-mono text-xs font-bold uppercase text-[#10B981] mb-2">
                          ✓ Matched Keywords ({atsResults.matchedKeywords.length})
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {atsResults.matchedKeywords.map((k, i) => (
                            <span
                              key={i}
                              className="border-[1.5px] border-[#0A0A0A] bg-[#10B981] text-white px-2 py-0.5 font-mono text-[11px] font-bold"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-[2px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[3px_3px_0px_#0A0A0A]">
                        <span className="block font-mono text-xs font-bold uppercase text-[#FF5CAA] mb-2">
                          ✕ Missing Role Keywords ({atsResults.missingKeywords.length})
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {atsResults.missingKeywords.map((k, i) => (
                            <span
                              key={i}
                              className="border-[1.5px] border-[#0A0A0A] bg-[#FF5CAA] text-white px-2 py-0.5 font-mono text-[11px] font-bold"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bullet Rewrite Suggestions */}
                    <BrutalCard color="white" shadowSize="md" className="p-6">
                      <h4 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A] border-b-[2px] border-[#0A0A0A] pb-2 mb-4">
                        Action-Metric Bullet Point Upgrades
                      </h4>
                      <div className="space-y-4">
                        {atsResults.bulletSuggestions.map((b, idx) => (
                          <div
                            key={idx}
                            className="border-[2px] border-[#0A0A0A] p-3 bg-[#F4F0E6] shadow-[2px_2px_0px_#0A0A0A] space-y-2 text-xs"
                          >
                            <div className="text-[#FF5CAA] font-mono">
                              <span className="font-bold uppercase">[Weak Before]:</span> {b.originalExample}
                            </div>
                            <div className="text-[#10B981] font-mono font-bold">
                              <span className="uppercase">[High-Impact After]:</span> {b.improvedVersion}
                            </div>
                            <div className="text-[#555555] font-sans text-[11px] border-t-[1px] border-[#0A0A0A] pt-1">
                              <span className="font-bold">Recruiter Rationale:</span> {b.rationale}
                            </div>
                          </div>
                        ))}
                      </div>
                    </BrutalCard>
                  </div>
                ) : (
                  <BrutalCard color="white" shadowSize="md" className="p-8 text-center border-dashed">
                    <FileText className="w-12 h-12 text-[#0A0A0A] mx-auto mb-3" />
                    <h3 className="font-heading text-xl font-extrabold uppercase text-[#0A0A0A] mb-2">
                      Ready for ATS Parsing
                    </h3>
                    <p className="font-sans text-xs text-[#555555] max-w-xs mx-auto mb-4">
                      Paste your resume on the left or tap &quot;Fill Sample Resume&quot; to test the automated scoring engine.
                    </p>
                    <BrutalButton
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        loadSampleResume();
                        handleScanAts();
                      }}
                    >
                      Test with Sample Resume
                    </BrutalButton>
                  </BrutalCard>
                )}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
