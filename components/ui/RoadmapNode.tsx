"use client";

import React, { useState } from "react";
import { RoadmapNodeItem } from "@/types";
import { Check, Clock, ChevronDown, ChevronUp, ExternalLink, Sparkles } from "lucide-react";
import { Sticker } from "./Sticker";

interface RoadmapNodeProps {
  node: RoadmapNodeItem;
  isCompleted: boolean;
  onToggle: (nodeId: string) => void;
  index?: number;
}

export const RoadmapNode: React.FC<RoadmapNodeProps> = ({
  node,
  isCompleted,
  onToggle,
  index = 1,
}) => {
  const [expanded, setExpanded] = useState(false);

  const importanceColor = {
    CRITICAL: "bg-[#FF5CAA] text-white",
    CORE: "bg-[#A855F7] text-white",
    ADVANCED: "bg-[#FFE14D] text-[#0A0A0A]",
  };

  return (
    <div
      className={`relative w-full border-[3px] border-[#0A0A0A] transition-all duration-150 ${
        isCompleted
          ? "bg-[#F0FDF4] shadow-[4px_4px_0px_#10B981]"
          : "bg-[#FFFFFF] shadow-[6px_6px_0px_#0A0A0A] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#0A0A0A]"
      }`}
    >
      {/* Node Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b-[2px] border-[#0A0A0A] bg-[#F4F0E6]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(node.id)}
            aria-label={isCompleted ? "Mark incomplete" : "Mark completed"}
            className={`w-7 h-7 border-[2px] border-[#0A0A0A] flex items-center justify-center font-bold transition-all shadow-[2px_2px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5 ${
              isCompleted
                ? "bg-[#10B981] text-white"
                : "bg-[#FFFFFF] hover:bg-[#FFE14D] text-transparent hover:text-black"
            }`}
          >
            <Check className={`w-4 h-4 stroke-[3] ${isCompleted ? "opacity-100" : "opacity-0 hover:opacity-40"}`} />
          </button>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
            NODE #{String(index).padStart(2, "0")}
          </span>

          <span
            className={`border-[2px] border-[#0A0A0A] px-2 py-0.5 text-[10px] font-mono font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] ${
              importanceColor[node.importance]
            }`}
          >
            {node.importance}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#0A0A0A] bg-[#FFFFFF] border-[2px] border-[#0A0A0A] px-2.5 py-0.5 shadow-[2px_2px_0px_#0A0A0A]">
            <Clock className="w-3.5 h-3.5" />
            <span>~{node.estimatedHours}h</span>
          </div>

          {isCompleted && (
            <Sticker color="emerald" size="sm" rotate="1">
              DONE
            </Sticker>
          )}
        </div>
      </div>

      {/* Node Body */}
      <div className="p-5">
        <h4 className="font-heading text-xl md:text-2xl font-bold text-[#0A0A0A] mb-2 leading-tight">
          {node.title}
        </h4>
        <p className="font-sans text-sm md:text-base text-[#2A2A2A] leading-relaxed mb-4">
          {node.description}
        </p>

        {/* Unlocked Skills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-mono text-xs font-bold text-[#555555] uppercase mr-1">
            Skills Unlocked:
          </span>
          {node.skillsUnlocked.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="inline-flex items-center gap-1 border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-0.5 text-xs font-mono font-bold text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]"
            >
              <Sparkles className="w-3 h-3" />
              {skill}
            </span>
          ))}
        </div>

        {/* Resources Toggle */}
        <div className="border-t-[2px] border-[#0A0A0A] pt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full font-mono text-xs font-bold text-[#0A0A0A] uppercase hover:underline"
          >
            <span>
              Curated Free Resources ({node.resources.length})
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {expanded && (
            <div className="mt-3 space-y-2">
              {node.resources.map((res, rIdx) => (
                <a
                  key={rIdx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 border-[2px] border-[#0A0A0A] bg-[#FFFFFF] hover:bg-[#F4F0E6] transition-colors shadow-[2px_2px_0px_#0A0A0A] group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#0A0A0A] rotate-45" />
                    <span className="font-heading text-sm font-bold text-[#0A0A0A] group-hover:underline">
                      {res.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-[#444444]">
                    <span>{res.type}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
