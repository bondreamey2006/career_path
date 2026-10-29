"use client";

import React from "react";

// Compass / Map Logo Mark
export const CompassLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center border-[3px] border-[#0A0A0A] bg-[#FFE14D] shadow-[3px_3px_0px_#0A0A0A] ${className}`}
    >
      <svg
        width={size * 0.7}
        height={size * 0.7}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="#0A0A0A" strokeWidth="2.5" />
        {/* Needle */}
        <polygon points="12,5 15,12 12,10 9,12" fill="#FF5CAA" stroke="#0A0A0A" strokeWidth="1.5" />
        <polygon points="12,19 15,12 12,14 9,12" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.5" fill="#FFE14D" stroke="#0A0A0A" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// Hand-drawn Starburst SVG
export const Starburst: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 32, color = "#FFE14D", className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 0L24.5 12.5L37.5 7.5L30 19L40 24.5L27.5 28L31.5 40L20 31.5L8.5 40L12.5 28L0 24.5L10 19L2.5 7.5L15.5 12.5L20 0Z"
        fill={color}
        stroke="#0A0A0A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn Neo-Brutalist Squiggle Arrow
export const SquiggleArrow: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}> = ({ className = "", width = 90, height = 45, color = "#0A0A0A" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 50"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 35 C 30 10, 50 45, 80 20"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <polygon
        points="75,12 88,20 78,28"
        fill={color}
        stroke="#0A0A0A"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Decorative Brutalist Tape Strip
export const TapeStrip: React.FC<{
  text?: string;
  rotate?: string;
  className?: string;
  color?: string;
}> = ({
  text = "CONFIDENTIAL",
  rotate = "-rotate-3",
  className = "",
  color = "bg-[#FFE14D]",
}) => {
  return (
    <div
      className={`inline-block border-[2px] border-[#0A0A0A] ${color} text-[#0A0A0A] px-3 py-1 font-mono text-[11px] font-extrabold uppercase tracking-widest shadow-[3px_3px_0px_#0A0A0A] select-none ${rotate} ${className}`}
    >
      {text}
    </div>
  );
};
