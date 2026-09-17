import { NextResponse } from "next/server";
import { getGovernanceProposals } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getGovernanceProposals());
}
