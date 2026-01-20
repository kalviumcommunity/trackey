import { NextResponse } from "next/server";
import { handleError } from "../../lib/errorhandler";
import { sendSuccess, sendError } from "../../lib/responsehandler";

export async function GET() {
  try {
    const users = [
      { id: 1, name: "Yashika" },
      { id: 2, name: "Alex" },
    ];
    return sendSuccess(users, "Users fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch users", "USER_FETCH_ERROR", 500, error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return sendError("Missing required field: name", "VALIDATION_ERROR", 400);
    }
    return sendSuccess(body, "User created successfully", 201);
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
