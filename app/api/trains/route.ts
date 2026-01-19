import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  return NextResponse.json(
    {
      page,
      limit,
      data: [],
    },
    { status: 200 }
  );
}
