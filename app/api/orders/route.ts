import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const order = await request.json();
  const id = `PS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return NextResponse.json({ ok: true, order: { ...order, id, createdAt: new Date().toISOString() } }, { status: 201 });
}
