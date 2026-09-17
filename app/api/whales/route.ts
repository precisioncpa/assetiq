import { NextResponse } from "next/server";
import { getWhales } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getWhales());
}
