import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: request.headers,
    body: await request.blob(),
  });
  if (res.ok) {
    return NextResponse.redirect("/");
  } else {
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "content-type": "text/plain" },
    });
  }
}
