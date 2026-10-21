import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const order = await request.json();
  const id = `BF-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, order: { ...order, id, createdAt: new Date().toISOString() } }, { status: 201 });
}
