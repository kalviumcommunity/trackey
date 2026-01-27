import { NextResponse } from "next/server";
import { hasPermission } from "../../lib/hasPermission"; // Adjusted path based on the directory structure

export async function DELETE(req: Request) {
  // 🔹 Normally from auth middleware
  const userRole = "editor";

  const allowed = hasPermission(userRole, "delete");

  console.log(
    `[RBAC] ${userRole} tried DELETE /trains → ${
      allowed ? "ALLOWED" : "DENIED"
    }`
  );

  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // delete train using prisma
  return NextResponse.json({ message: "Train deleted" });
}
