import { NextResponse } from "next/server";
import redis from "../../lib/redis"; // Adjusted path to the correct relative location
import { prisma } from "../../lib/prisma"; // Adjust the path based on your project structure

export async function GET() {
  try {
    const cacheKey = "users:list";

    // 1️⃣ Check cache
    const cachedUsers = await redis.get(cacheKey);

    if (cachedUsers) {
      console.log("🚀 Cache Hit");
      return NextResponse.json(JSON.parse(cachedUsers));
    }

    console.log("❌ Cache Miss - Fetching from DB");

    // 2️⃣ Fetch from DB
    const users = await prisma.user.findMany();

    // 3️⃣ Store in cache (TTL = 60 seconds)
    await redis.set(cacheKey, JSON.stringify(users), "EX", 60);

    return NextResponse.json({ success: true, users });
  } catch (error: unknown) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
