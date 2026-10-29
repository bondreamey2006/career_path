"use client";

import React from "react";

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  color?: "white" | "cream" | "yellow" | "violet" | "pink" | "emerald" | "slate";
  shadowSize?: "sm" | "md" | "lg" | "xl" | "none";
  rotate?: "-3" | "-2" | "-1" | "0" | "1" | "2" | "3";
  hoverLift?: boolean;
  hasTape?: boolean;
  tapeText?: string;
  id?: string;
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  className = "",
  color = "white",
  shadowSize = "md",
  rotate = "0",
  hoverLift = true,
  hasTape = false,
  tapeText,
  id,
}) => {
  const colorMap = {
    white: "bg-[#FFFFFF]",
    cream: "bg-[#F4F0E6]",
    yellow: "bg-[#FFE14D]",
    violet: "bg-[#A855F7] text-white",
    pink: "bg-[#FF5CAA] text-white",
    emerald: "bg-[#10B981] text-white",
    slate: "bg-[#1E1E1E] text-white",
  };

  const shadowMap = {
    none: "shadow-none",
    sm: "shadow-[3px_3px_0px_#0A0A0A]",
    md: "shadow-[6px_6px_0px_#0A0A0A]",
    lg: "shadow-[10px_10px_0px_#0A0A0A]",
    xl: "shadow-[14px_14px_0px_#0A0A0A]",
  };

  const rotateMap = {
    "-3": "-rotate-3",
    "-2": "-rotate-2",
    "-1": "-rotate-1",
    "0": "rotate-0",
    "1": "rotate-1",
    "2": "rotate-2",
    "3": "rotate-3",
  };

  return (
    <div
      id={id}
      className={`relative border-[3px] border-[#0A0A0A] ${colorMap[color]} ${shadowMap[shadowSize]} ${rotateMap[rotate]} ${
        hoverLift
          ? "transition-all duration-150 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0px_#0A0A0A]"
          : ""
      } ${className}`}
    >
      {/* Optional Neo-brutalist Tape Doodad */}
      {hasTape && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFE14D] border-[2px] border-[#0A0A0A] px-3 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase shadow-[2px_2px_0px_#0A0A0A] -rotate-2 select-none z-10 text-[#0A0A0A]">
          {tapeText || "VERIFIED"}
        </div>
      )}
      {children}
    </div>
  );
};
