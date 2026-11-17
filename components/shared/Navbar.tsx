"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CompassLogo } from "../ui/Doodles";
import { BrutalButton } from "../ui/BrutalButton";
import { ProfileModal } from "./ProfileModal";
import { getStoredProfile } from "@/lib/storage";
import { StudentProfile } from "@/types";
import { Menu, X, Flame, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setProfile(getStoredProfile());
    const handleProfileUpdate = () => {
      setProfile(getStoredProfile());
    };
    window.addEventListener("careerpath-profile-updated", handleProfileUpdate);
    return () => window.removeEventListener("careerpath-profile-updated", handleProfileUpdate);
  }, []);

  const navLinks = [
    { label: "Roadmaps", href: "/roadmaps" },
    { label: "Skill Gap", href: "/skill-gap" },
    { label: "Project Audit", href: "/project-audit" },
    { label: "Problem Solving", href: "/problem-solving" },
    { label: "Simulator", href: "/simulator" },
    { label: "Recovery", href: "/recovery" },
    { label: "AI Mentor", href: "/mentor" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-[3px] border-[#0A0A0A] bg-[#F4F0E6] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Mark */}
          <Link href="/" className="flex items-center gap-3 group">
            <CompassLogo size={42} className="group-hover:rotate-12 transition-transform duration-150" />
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-extrabold tracking-tighter text-[#0A0A0A] leading-none uppercase">
                Career<span className="bg-[#FFE14D] px-1 border-[2px] border-[#0A0A0A] ml-0.5">Path</span>
              </span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#555555] uppercase mt-0.5">
                RECOVERY & REINVENTION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A0A0A] transition-colors border-[2px] ${
                    isActive
                      ? "border-[#0A0A0A] bg-[#FFE14D] shadow-[2px_2px_0px_#0A0A0A]"
                      : "border-transparent hover:border-[#0A0A0A] hover:bg-[#FFFFFF]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons & Profile Widget */}
          <div className="hidden md:flex items-center gap-3">
            {profile && (
              <button
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2 border-[2px] border-[#0A0A0A] bg-[#FFFFFF] px-2.5 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0px_#0A0A0A] hover:bg-[#FFE14D] transition-colors"
                title="Click to edit your student profile"
              >
                <div className="flex items-center text-[#FF5CAA]">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[#0A0A0A] ml-0.5">{profile.streakDays}D</span>
                </div>
                <span className="text-[#0A0A0A] border-l-[1.5px] border-[#0A0A0A] pl-2 max-w-[90px] truncate">
                  {profile.name}
                </span>
                <UserCheck className="w-3.5 h-3.5 text-[#10B981]" />
              </button>
            )}

            <BrutalButton
              variant="outline"
              size="sm"
              onClick={() => setProfileModalOpen(true)}
            >
              Sign In
            </BrutalButton>

            <BrutalButton
              variant="primary"
              size="sm"
              href="/roadmaps"
            >
              Get Started Free
            </BrutalButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {profile && (
              <button
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-1 border-[2px] border-[#0A0A0A] bg-[#FFE14D] px-2 py-1 font-mono text-[11px] font-bold shadow-[2px_2px_0px_#0A0A0A]"
              >
                <Flame className="w-3 h-3 text-[#FF5CAA] fill-current" />
                <span>{profile.streakDays}D</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="w-10 h-10 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] flex items-center justify-center shadow-[3px_3px_0px_#0A0A0A] active:translate-x-0.5 active:translate-y-0.5"
            >
              <Menu className="w-6 h-6 text-[#0A0A0A]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Full-Screen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#F4F0E6] border-l-[3px] border-[#0A0A0A] p-6 flex flex-col justify-between shadow-[-10px_0px_0px_#0A0A0A]"
            >
              <div>
                {/* Drawer Top */}
                <div className="flex items-center justify-between border-b-[3px] border-[#0A0A0A] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CompassLogo size={36} />
                    <span className="font-heading text-xl font-extrabold uppercase">
                      CareerPath
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 border-[2px] border-[#0A0A0A] bg-[#FF5CAA] text-white flex items-center justify-center shadow-[2px_2px_0px_#0A0A0A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Links */}
                <nav className="space-y-3">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.label}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block border-[2px] border-[#0A0A0A] bg-[#FFFFFF] px-4 py-3 font-heading text-lg font-bold uppercase tracking-tight text-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:bg-[#FFE14D] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="space-y-3 pt-6 border-t-[3px] border-[#0A0A0A]">
                <BrutalButton
                  variant="yellow"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProfileModalOpen(true);
                  }}
                >
                  Edit Profile ({profile?.name || "Student"})
                </BrutalButton>
                <BrutalButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  href="/roadmaps"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore Roadmaps
                </BrutalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Profile Editor Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSaved={(updated) => setProfile(updated)}
      />
    </>
  );
};
