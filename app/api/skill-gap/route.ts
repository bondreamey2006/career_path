import { NextRequest, NextResponse } from "next/server";
import { analyzeSkillGap } from "@/lib/db";
import { z } from "zod";

const skillGapSchema = z.object({
  role: z.string().min(1, "Target role is required"),
  resumeText: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = skillGapSchema.safeParse(body);

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

    const analysis = await analyzeSkillGap(result.data);
    return NextResponse.json({ success: true, ...analysis });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to analyze skill gap" },
      { status: 500 }
    );
  }
}
