"use client";

import React from "react";
import { motion } from "framer-motion";

interface SlideRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export const SlideReveal: React.FC<SlideRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
  distance = 40,
}) => {
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0, opacity: 0 };
      case "right":
        return { x: distance, y: 0, opacity: 0 };
      case "down":
        return { x: 0, y: -distance, opacity: 0 };
      case "up":
      default:
        return { x: 0, y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.8,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
