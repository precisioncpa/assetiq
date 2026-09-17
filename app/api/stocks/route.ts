import { NextResponse } from "next/server";
import { getStocks } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getStocks());
}
