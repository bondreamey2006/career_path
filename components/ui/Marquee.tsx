"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: "normal" | "fast" | "slow";
  bgColor?: string;
  textColor?: string;
  rotate?: string;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = "left",
  speed = "normal",
  bgColor = "bg-[#FFE14D]",
  textColor = "text-[#0A0A0A]",
  rotate = "rotate-0",
  className = "",
}) => {
  const speedClass =
    speed === "fast"
      ? "animate-marquee-fast"
      : direction === "right"
      ? "animate-marquee-reverse"
      : "animate-marquee";

  // Repeat items to ensure seamless loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y-[3px] border-[#0A0A0A] ${bgColor} ${textColor} py-3 select-none ${rotate} ${className}`}
    >
      <div className={`flex w-max shrink-0 whitespace-nowrap ${speedClass}`}>
        {repeated.map((item, idx) => (
          <span
            key={idx}
            className="mx-6 flex items-center gap-6 font-mono text-sm md:text-base font-bold tracking-widest uppercase"
          >
            <span>{item}</span>
            <span className="inline-block w-2.5 h-2.5 bg-[#0A0A0A] rotate-45" />
          </span>
        ))}
      </div>
    </div>
  );
};
