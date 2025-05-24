import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  const res = await fetch(`${BASE}/submit`, {
    method: "POST",
    headers: request.headers,
    body: await request.blob(),
  });
  // 多くの場合バックエンドでリダイレクトされる想定
  if (res.redirected) {
    const location = res.url;
    return NextResponse.redirect(location);
  }
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "text/html" },
  });
}
