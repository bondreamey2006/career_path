import { NextRequest, NextResponse } from "next/server";
import { checkResumeAts } from "@/lib/db";
import { z } from "zod";

const atsSchema = z.object({
  resumeText: z.string().min(10, "Paste at least 10 characters of your resume content"),
  targetRole: z.string().min(1, "Target role is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = atsSchema.safeParse(body);

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

    const atsResults = await checkResumeAts(result.data);
    return NextResponse.json({ success: true, ...atsResults });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to perform ATS resume scan" },
      { status: 500 }
    );
  }
}
