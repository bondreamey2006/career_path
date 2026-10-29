"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BentoCardProps {
  numberLabel: string;
  title: string;
  description: string;
  tag: string;
  bgColor?: string;
  textColor?: string;
  ctaLink?: string;
  ctaText?: string;
  className?: string;
  children: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  numberLabel,
  title,
  description,
  tag,
  bgColor = "bg-[#FFFFFF]",
  textColor = "text-[#0A0A0A]",
  ctaLink,
  ctaText = "LAUNCH TOOL",
  className = "",
  children,
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] p-6 transition-all duration-150 hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_#0A0A0A] ${bgColor} ${textColor} ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b-[2px] border-[#0A0A0A] pb-3 mb-5">
        <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 border-[2px] border-[#0A0A0A] bg-[#FFE14D] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
          {tag}
        </span>
        <span className="font-mono text-sm md:text-base font-extrabold tracking-widest text-[#0A0A0A]">
          {numberLabel}
        </span>
      </div>

      {/* Main Content Info */}
      <div className="mb-6">
        <h3 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[#0A0A0A] mb-2 leading-none">
          {title}
        </h3>
        <p className="font-sans text-sm md:text-base text-[#1E1E1E] leading-relaxed font-medium">
          {description}
        </p>
      </div>

      {/* Interactive Feature Visual Preview */}
      <div className="my-auto w-full border-[2px] border-[#0A0A0A] bg-[#FFFFFF] p-4 shadow-[3px_3px_0px_#0A0A0A] overflow-hidden">
        {children}
      </div>

      {/* Bottom CTA Button */}
      {ctaLink && (
        <div className="mt-6 pt-4 border-t-[2px] border-[#0A0A0A] flex items-center justify-between">
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-2 font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-[#0A0A0A] hover:underline"
          >
            <span>{ctaText}</span>
            <div className="w-6 h-6 border-[2px] border-[#0A0A0A] bg-[#FFE14D] flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shadow-[2px_2px_0px_#0A0A0A]">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>
          <span className="font-mono text-[11px] text-[#444444] uppercase tracking-wider">
            INTERACTIVE
          </span>
        </div>
      )}
    </div>
  );
};
