import { NextResponse } from "next/server";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get("download") === "ground-truth") {
    try {
      const content = await readFile(path.join(process.cwd(), ".data", "ground_truth.ndjson"), "utf8");
      return new Response(content, { headers: { "content-type": "application/x-ndjson", "content-disposition": "attachment; filename=ground_truth.ndjson" } });
    } catch {
      return new Response("", { headers: { "content-type": "application/x-ndjson", "content-disposition": "attachment; filename=ground_truth.ndjson" } });
    }
  }
  return NextResponse.json({ scenarios: ["f4a", "f4b", "f5", "f6", "f8", "f3"] });
}

export async function POST(request: Request) {
  const row = await request.json();
  const directory = path.join(process.cwd(), ".data");
  await mkdir(directory, { recursive: true });
  await appendFile(path.join(directory, "ground_truth.ndjson"), JSON.stringify(row) + "\n", "utf8");
  return NextResponse.json({ ok: true }, { status: 202 });
}
