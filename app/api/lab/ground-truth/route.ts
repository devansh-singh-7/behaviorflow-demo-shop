import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    scenarios: [
      { id: "slow", label: "Slow network" },
      { id: "error", label: "API error" },
      { id: "empty", label: "Empty catalog" },
    ],
  });
}
