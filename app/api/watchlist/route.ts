import { NextResponse } from "next/server";
import { getWatchlist } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getWatchlist());
}
