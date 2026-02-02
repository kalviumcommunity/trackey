import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import { trainSchema } from "@/lib/schemas/trainSchema";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = trainSchema.parse(body);

    return sendSuccess(data, "Train added successfully", 201);
  } catch (error) {
    // Log full error server-side for debugging
    console.error("Trains API error:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString(),
    });

    if (error instanceof ZodError) {
      return sendError(
        "Invalid train data",
        ERROR_CODES.VALIDATION_ERROR,
        400,
        error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))
      );
    }

    // Return safe error response to client
    return sendError("Failed to add train", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}
