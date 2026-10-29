import { NextRequest, NextResponse } from "next/server";
import { getRoadmapByRoleId, getAllRoadmaps } from "@/lib/db";
import { z } from "zod";

const querySchema = z.object({
  role: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      role: searchParams.get("role") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid role query parameter" },
        { status: 400 }
      );
    }

    if (parsed.data.role) {
      const roadmap = await getRoadmapByRoleId(parsed.data.role);
      if (!roadmap) {
        return NextResponse.json(
          { success: false, error: "Roadmap not found for role" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, roadmap });
    }

    const roadmaps = await getAllRoadmaps();
    return NextResponse.json({ success: true, roadmaps });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch roadmaps" },
      { status: 500 }
    );
  }
}
