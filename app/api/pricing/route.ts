import { NextResponse } from "next/server";
import { getPricingTiers } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getPricingTiers());
}
