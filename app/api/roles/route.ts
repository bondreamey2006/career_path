import { NextResponse } from "next/server";
import { getRoles } from "@/lib/db";

export async function GET() {
  try {
    const roles = await getRoles();
    return NextResponse.json({ success: true, roles });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}
