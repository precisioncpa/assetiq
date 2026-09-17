import { NextResponse } from "next/server";
import { getYieldOpportunities } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getYieldOpportunities());
}
