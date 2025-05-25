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
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      floor: "2",
      room: "201",
    }
  ];

  return NextResponse.json(residents);
}
