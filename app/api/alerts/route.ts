import { NextResponse } from "next/server";
import { getAlertRules } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getAlertRules());
}
