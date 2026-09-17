import { NextResponse } from "next/server";
import { addWaitlistSignup } from "@/lib/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body ? (body as { email: unknown }).email : undefined;

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  addWaitlistSignup(email);

  return NextResponse.json({ success: true });
}
