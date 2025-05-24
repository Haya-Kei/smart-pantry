import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE = process.env.BASE_URL;

export async function GET(request: NextRequest) {
  const res = await fetch(`${BASE}/residents`, {
    headers: { Accept: "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
