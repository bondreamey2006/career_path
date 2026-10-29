import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { BentoSection } from "@/components/landing/BentoSection";
import { CareerPathsSection } from "@/components/landing/CareerPathsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Marquee } from "@/components/ui/Marquee";
import { PageTransition } from "@/components/ui/PageTransition";

export default function Home() {
  const tickerPhrases = [
    "BACKLOG? WE GOT YOU",
    "LOW CGPA? NOT A DEAD END",
    "CAREER PIVOT? LET'S MAP IT",
    "RECRUITERS WANT PROOF OF WORK",
    "NO CORPORATE SAAS JARGON",
    "ZERO TO PRODUCTION READY",
  ];

  const reverseTickerPhrases = [
    "POSTGRESQL & PRISMA",
    "DOCKER MULTI-STAGE",
    "SYSTEMS ARCHITECTURE",
    "LLM RAG PIPELINES",
    "NEXT.JS 14 APP ROUTER",
    "12-WEEK RECOVERY CADENCE",
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#0A0A0A] bg-brutal-grid">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* Infinite Marquee Strip Right Under Hero (Two strips, one tilted) */}
          <div className="relative my-4 overflow-hidden">
            <Marquee
              items={tickerPhrases}
              direction="left"
              speed="normal"
              bgColor="bg-[#FFE14D]"
              textColor="text-[#0A0A0A]"
              className="z-10"
            />
            <Marquee
              items={reverseTickerPhrases}
              direction="right"
              speed="fast"
              bgColor="bg-[#A855F7]"
              textColor="text-white"
              className="-mt-1 rotate-1 z-20 shadow-[0px_4px_0px_#0A0A0A]"
            />
          </div>

          {/* 5-Engine Bento Grid */}
          <BentoSection />

          {/* Horizontally Sliding Career Paths */}
          <CareerPathsSection />

          {/* Chunky Pricing Matrix */}
          <PricingSection />

          {/* Final Call to Action */}
          <CtaBanner />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
