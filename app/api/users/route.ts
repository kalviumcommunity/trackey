import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

export async function GET() {
  try {
    const users = [
      { id: 1, name: "Yashika" },
      { id: 2, name: "Alex" },
    ];
    return sendSuccess(users, "Users fetched successfully");
  } catch (error) {
    // Log full error server-side for debugging
    console.error("Users API error:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString(),
    });

    return sendError("Failed to fetch users", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return sendError(
        "Missing required field: name",
        ERROR_CODES.VALIDATION_ERROR,
        400
      );
    }

    return sendSuccess(body, "User created successfully", 201);
  } catch (error) {
    // Log full error server-side for debugging
    console.error("Users POST error:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString(),
    });

    return sendError("Failed to create user", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}

export async function GETUSER() {
  try {
    return sendSuccess(null, "User route accessible to authenticated users.");
  } catch (error) {
    // Log full error server-side for debugging
    console.error("GETUSER error:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString(),
    });

    return sendError(
      "Failed to access user route",
      ERROR_CODES.INTERNAL_ERROR,
      500
    );
  }
}
