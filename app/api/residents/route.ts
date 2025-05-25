import { NextResponse } from "next/server";

export async function GET() {
  // ダミーデータを返す
  const residents = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      floor: "1",
      room: "101",
    },
    // ... 他のダミーデータ
  ];

  return NextResponse.json(residents);
}
