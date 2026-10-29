import { NextRequest, NextResponse } from "next/server";
import { getRecoveryPlan } from "@/lib/db";
import { z } from "zod";

const recoverySchema = z.object({
  cgpa: z.number().min(0, "CGPA must be >= 0").max(10, "CGPA must be <= 10"),
  backlogs: z.number().min(0, "Backlogs cannot be negative").max(30),
  semester: z.number().min(1).max(8),
  hoursPerWeek: z.number().min(2).max(80),
  targetRole: z.string().min(1, "Target role is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = recoverySchema.safeParse(body);

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

    const plan = await getRecoveryPlan(result.data);
    return NextResponse.json({ success: true, ...plan });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate recovery plan" },
      { status: 500 }
    );
  }
}
