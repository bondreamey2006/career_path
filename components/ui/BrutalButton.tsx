"use client";

import React from "react";
import Link from "next/link";

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "yellow" | "pink" | "emerald" | "outline" | "black";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  external?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  icon,
  external,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-[#A855F7] text-white hover:bg-[#9333ea]",
    secondary: "bg-[#FFFFFF] text-[#0A0A0A] hover:bg-[#F4F0E6]",
    yellow: "bg-[#FFE14D] text-[#0A0A0A] hover:bg-[#f6d734]",
    pink: "bg-[#FF5CAA] text-white hover:bg-[#f0499b]",
    emerald: "bg-[#10B981] text-white hover:bg-[#059669]",
    outline: "bg-transparent text-[#0A0A0A] hover:bg-[#FFFFFF]",
    black: "bg-[#0A0A0A] text-white hover:bg-[#222222]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase",
    md: "px-5 py-2.5 text-sm font-mono font-bold tracking-wider uppercase",
    lg: "px-7 py-3.5 text-base font-heading font-bold tracking-wide",
    xl: "px-9 py-4 text-lg font-heading font-extrabold tracking-wide",
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 border-[3px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] transition-all duration-100 ease-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0A0A0A] select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
