import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    // Basic request body validation
    const body = await req.json();
    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return sendError(
        "Invalid request data",
        ERROR_CODES.VALIDATION_ERROR,
        400,
        validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))
      );
    }

    const { name, email, password } = validation.data;

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return sendError(
        "User with this email already exists",
        ERROR_CODES.CONFLICT_ERROR,
        409
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return sendSuccess(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "User created successfully",
      201
    );
  } catch (error) {
    // Log full error server-side for debugging
    console.error("Signup error:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString(),
    });

    // Return safe error response to client
    return sendError("Failed to create user", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}
