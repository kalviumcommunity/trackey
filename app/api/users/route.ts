import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    [
      { id: 1, name: "Yashika" },
      { id: 2, name: "Alex" },
    ],
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json(
    {
      message: "User created successfully",
      data: body,
    },
    { status: 201 }
  );
}
