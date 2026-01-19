import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const result = await prisma.$transaction([
      prisma.user.create({
        data: { name: "TestUser_Tx" },
      }),

      // INTENTIONAL FAILURE → wrong ID forces rollback
      prisma.trainLog.update({
        where: { id: 99999 },
        data: { message: "Fail test" },
      }),
    ]);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Transaction failed:", err);
    return NextResponse.json({ error: "ROLLBACK triggered" }, { status: 500 });
  }
}
