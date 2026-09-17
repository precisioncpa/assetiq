import { NextResponse } from "next/server";
import { getTrustedMetrics } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getTrustedMetrics());
}
