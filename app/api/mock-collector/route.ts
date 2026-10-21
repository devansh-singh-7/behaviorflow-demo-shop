import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const events = Array.isArray(payload) ? payload : [payload];
  const directory = path.join(process.cwd(), ".data");
  await mkdir(directory, { recursive: true });
  await appendFile(path.join(directory, "events.ndjson"), events.map((event) => JSON.stringify(event)).join("\n") + "\n", "utf8");
  return NextResponse.json({ accepted: events.length }, { status: 202 });
}
