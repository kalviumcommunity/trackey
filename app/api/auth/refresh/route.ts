import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: number;
  email: string;
}

export async function POST(req: Request) {
  const refreshToken = req.headers.get("cookie")?.split("refreshToken=")[1];

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JWTPayload;

    const payload = { id: decoded.id, email: decoded.email };

    // 🔁 ROTATION
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({
      accessToken: newAccessToken,
    });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    console.log("🔄 Refresh token rotated");

    return res;
  } catch {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
