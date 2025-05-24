import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  const res = await fetch(`${BASE}/submit-feedback`, {
    method: "POST",
    headers: request.headers,
    body: await request.blob(),
  });
  if (res.redirected) {
    return NextResponse.redirect(res.url);
  }
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "text/html" },
  });
}
