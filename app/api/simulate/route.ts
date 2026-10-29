import { NextRequest, NextResponse } from "next/server";
import { simulateReadiness } from "@/lib/db";
import { z } from "zod";

const simulateSchema = z.object({
  studyHours: z.number().min(2, "Study hours must be >= 2").max(80, "Study hours must be <= 80"),
  weeks: z.number().min(2, "Weeks must be >= 2").max(52, "Weeks must be <= 52"),
  currentSkills: z.array(z.string()).optional(),
  targetRole: z.string().min(1, "Target role is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = simulateSchema.safeParse(body);

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

    const simulation = await simulateReadiness(result.data);
    return NextResponse.json({ success: true, ...simulation });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to simulate readiness" },
      { status: 500 }
    );
  }
}
