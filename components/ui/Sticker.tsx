"use client";

import React from "react";

interface StickerProps {
  children: React.ReactNode;
  color?: "yellow" | "pink" | "violet" | "emerald" | "white" | "black";
  rotate?: "-3" | "-2" | "-1" | "1" | "2" | "3";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Sticker: React.FC<StickerProps> = ({
  children,
  color = "yellow",
  rotate = "2",
  className = "",
  size = "md",
}) => {
  const colorMap = {
    yellow: "bg-[#FFE14D] text-[#0A0A0A]",
    pink: "bg-[#FF5CAA] text-white",
    violet: "bg-[#A855F7] text-white",
    emerald: "bg-[#10B981] text-white",
    white: "bg-[#FFFFFF] text-[#0A0A0A]",
    black: "bg-[#0A0A0A] text-[#FFE14D]",
  };

  const rotateMap = {
    "-3": "-rotate-3",
    "-2": "-rotate-2",
    "-1": "-rotate-1",
    "1": "rotate-1",
    "2": "rotate-2",
    "3": "rotate-3",
  };

  const sizeMap = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider border-[3px] border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] select-none transition-transform duration-100 hover:scale-105 hover:rotate-0 ${colorMap[color]} ${rotateMap[rotate]} ${sizeMap[size]} ${className}`}
    >
      {children}
    </span>
  );
};
