import { sendSuccess, sendError } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
  try {
    // Basic request body validation
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return sendError(
        "Invalid login data",
        ERROR_CODES.VALIDATION_ERROR,
        400,
        validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return sendError(
        "Invalid email or password",
        ERROR_CODES.AUTHENTICATION_ERROR,
        401
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return sendError(
        "Invalid email or password",
        ERROR_CODES.AUTHENTICATION_ERROR,
        401
      );
    }

    // Token payload
    const payload = { id: user.id, email: user.email, role: user.role };

    // Access token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create response with user data (excluding password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };

    return sendSuccess({ user: userData, token }, "Login successful");
  } catch (error) {
    // Log full error server-side for debugging
    console.error("Login error:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      timestamp: new Date().toISOString(),
    });

    // Return safe error response to client
    return sendError("Login failed", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}
