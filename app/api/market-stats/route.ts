import { NextResponse } from "next/server";
import { getMarketStats } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getMarketStats());
}
