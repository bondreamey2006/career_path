import { NextRequest, NextResponse } from "next/server";
import { getProblemSolvingQuestions, evaluateProblemSolving } from "@/lib/db";
import { z } from "zod";

const evaluationSchema = z.object({
  targetRole: z.string().default("full-stack"),
  answers: z.record(z.string()).default({}),
});

export async function GET() {
  try {
    const questions = await getProblemSolvingQuestions();
    return NextResponse.json({ success: true, questions });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch problem-solving questions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = evaluationSchema.safeParse(body);

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

    const evaluation = await evaluateProblemSolving(result.data);
    return NextResponse.json({ success: true, ...evaluation });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to evaluate problem solving" },
      { status: 500 }
    );
  }
}
