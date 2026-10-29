import { NextResponse } from "next/server";
import { getReadinessOverview } from "@/lib/db";

export async function GET() {
  try {
    const overview = await getReadinessOverview();
    return NextResponse.json({ success: true, ...overview });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch readiness overview" },
      { status: 500 }
    );
  }
}
