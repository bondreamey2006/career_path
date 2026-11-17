import { NextRequest, NextResponse } from "next/server";
import { auditProjectQuality } from "@/lib/db";
import { z } from "zod";

const projectAuditSchema = z.object({
  projectName: z.string().min(2, "Project name is required"),
  targetRole: z.string().min(1, "Target role is required"),
  repoUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  description: z.string().min(10, "Please provide at least a brief description of what the project does"),
  complexityMarkers: z.array(z.string()).default([]),
  codeQualityMarkers: z.array(z.string()).default([]),
  originalityTier: z.enum(["tutorial-clone", "modified-tutorial", "bespoke-solution"]).default("modified-tutorial"),
  documentationLevel: z.enum(["minimal-readme", "standard-readme", "deep-architecture-docs"]).default("standard-readme"),
  deploymentStatus: z.enum(["not-deployed", "free-tier-live", "production-ci-cd-custom-domain"]).default("free-tier-live"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = projectAuditSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const audit = await auditProjectQuality(result.data);
    return NextResponse.json({ success: true, ...audit });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to audit project quality" },
      { status: 500 }
    );
  }
}
