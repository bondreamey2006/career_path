import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CareerPath | Adaptive Career Recovery & Reinvention Platform",
  description:
    "Your Intelligent GPS for Career Recovery, Skill Growth, & Job Readiness. Specifically engineered for SY/TY college students handling backlogs, low CGPA, or pivoting careers.",
  keywords: [
    "career recovery",
    "backlog recovery",
    "placement readiness",
    "tech roadmaps",
    "skill gap analyzer",
    "what if simulator",
    "resume ats checker",
  ],
  authors: [{ name: "CareerPath Engineering" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} font-heading bg-[#F4F0E6] text-[#0A0A0A] min-h-screen antialiased selection:bg-[#FFE14D] selection:text-[#0A0A0A]`}
      >
        {children}
      </body>
    </html>
  );
}
