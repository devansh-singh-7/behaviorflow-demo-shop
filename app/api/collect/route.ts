import { NextResponse } from "next/server";
export async function POST(request: Request) { const event = await request.json(); console.info("[behaviorflow:analytics]", event); return NextResponse.json({ ok: true, received: event.name }); }
