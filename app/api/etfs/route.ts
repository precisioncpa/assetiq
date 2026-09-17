import { NextResponse } from "next/server";
import { getEtfBaskets } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getEtfBaskets());
}
