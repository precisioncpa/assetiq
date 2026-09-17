import { NextResponse } from "next/server";
import { getSignals } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getSignals());
}
