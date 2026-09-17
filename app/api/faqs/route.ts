import { NextResponse } from "next/server";
import { getFaqs } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getFaqs());
}
