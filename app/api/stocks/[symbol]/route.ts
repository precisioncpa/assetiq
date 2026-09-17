import { NextResponse } from "next/server";
import { getStock } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const stock = getStock(symbol);

  if (!stock) {
    return NextResponse.json({ error: "Stock not found" }, { status: 404 });
  }

  return NextResponse.json(stock);
}
