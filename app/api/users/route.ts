import { NextResponse } from "next/server";
import { handleError } from "../../lib/errorhandler";

export async function GET() {
  try {
    return NextResponse.json(
      [
        { id: 1, name: "Yashika" },
        { id: 2, name: "Alex" },
      ],
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "GET /api/users");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json(
      {
        message: "User created successfully",
        data: body,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "POST /api/users");
  }
}

export async function GETUSER() {
  try {
    return NextResponse.json({
      success: true,
      message: "User route accessible to authenticated users.",
    });
  } catch (error) {
    return handleError(error, "GETUSER /api/users");
  }
}
