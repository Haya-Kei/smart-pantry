// app/api/feedback-schema/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.BASE_URL}/feedback-schema`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
