"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface GaugeProps {
  score: number; // 0 to 100
  size?: number;
  label?: string;
  showTicks?: boolean;
  className?: string;
  animate?: boolean;
}

export const Gauge: React.FC<GaugeProps> = ({
  score = 82,
  size = 240,
  label = "PLACEMENT READINESS",
  showTicks = true,
  className = "",
  animate = true,
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Radius and arc math for a 220-degree gauge
  const radius = size * 0.38;
  const strokeWidth = Math.max(14, size * 0.08);
  const center = size / 2;

  // 220 degree arc from 160 deg to 380 deg (-20 deg to 200 deg)
  const startAngle = 150;
  const endAngle = 390;
  const angleRange = endAngle - startAngle; // 240 deg

  const circumference = 2 * Math.PI * radius;
  const arcLength = (angleRange / 360) * circumference;

  // Score mapping: score 0 -> 0, score 100 -> arcLength
  const clampedScore = Math.max(0, Math.min(100, score));
  const targetOffset = arcLength - (clampedScore / 100) * arcLength;

  // Spring animation for smooth brutalist count
  const springValue = useSpring(0, {
    stiffness: 60,
    damping: 15,
  });

  const animatedScore = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    springValue.set(clampedScore);
    const unsubscribe = animatedScore.on("change", (val) => {
      setDisplayScore(val);
    });
    return () => unsubscribe();
  }, [clampedScore, springValue, animatedScore]);

  // Determine readiness status color
  const statusColor =
    clampedScore >= 75
      ? "#10B981" // emerald
      : clampedScore >= 50
      ? "#FFE14D" // yellow
      : "#FF5CAA"; // hot pink

  const statusText =
    clampedScore >= 80
      ? "JOB READY"
      : clampedScore >= 60
      ? "ON TRACK"
      : "CRITICAL RECOVERY";

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 bg-[#FFFFFF] border-[3px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] select-none ${className}`}
      style={{ width: size + 32, minHeight: size + 20 }}
    >
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg
          width={size}
          height={size * 0.85}
          viewBox={`0 0 ${size} ${size * 0.85}`}
          className="overflow-visible"
        >
          {/* Tick marks */}
          {showTicks &&
            Array.from({ length: 13 }).map((_, i) => {
              const tickAngle = startAngle + (i / 12) * angleRange;
              const rad = (tickAngle * Math.PI) / 180;
              const innerR = radius - strokeWidth / 2 - 8;
              const outerR = radius - strokeWidth / 2 - 2;
              const x1 = center + innerR * Math.cos(rad);
              const y1 = center * 0.95 + innerR * Math.sin(rad);
              const x2 = center + outerR * Math.cos(rad);
              const y2 = center * 0.95 + outerR * Math.sin(rad);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#0A0A0A"
                  strokeWidth={i % 3 === 0 ? "3" : "1.5"}
                />
              );
            })}

          {/* Background Track Arc */}
          <circle
            cx={center}
            cy={center * 0.95}
            r={radius}
            fill="none"
            stroke="#EADFC9"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(${startAngle} ${center} ${center * 0.95})`}
            className="border-[#0A0A0A]"
          />

          {/* Track Border Accent */}
          <circle
            cx={center}
            cy={center * 0.95}
            r={radius}
            fill="none"
            stroke="#0A0A0A"
            strokeWidth={strokeWidth + 4}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(${startAngle} ${center} ${center * 0.95})`}
            style={{ opacity: 0.15 }}
          />

          {/* Animated Active Arc */}
          <motion.circle
            cx={center}
            cy={center * 0.95}
            r={radius}
            fill="none"
            stroke={statusColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 14,
              duration: 1.2,
            }}
            strokeLinecap="round"
            transform={`rotate(${startAngle} ${center} ${center * 0.95})`}
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-x-0 bottom-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline justify-center">
            <span className="font-heading text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A]">
              {displayScore}
            </span>
            <span className="font-heading text-2xl md:text-3xl font-bold text-[#0A0A0A] ml-0.5">
              %
            </span>
          </div>

          <div
            className="mt-1 inline-block border-[2px] border-[#0A0A0A] px-2 py-0.5 text-[11px] font-mono font-bold tracking-wider uppercase shadow-[2px_2px_0px_#0A0A0A]"
            style={{ backgroundColor: statusColor, color: clampedScore >= 50 && clampedScore < 75 ? "#0A0A0A" : "#FFFFFF" }}
          >
            {statusText}
          </div>
        </div>
      </div>

      {/* Caption Label */}
      <span className="mt-1 font-mono text-xs font-bold tracking-widest text-[#0A0A0A] uppercase border-t-[2px] border-[#0A0A0A] pt-2 w-full text-center">
        {label}
      </span>
    </div>
  );
};
