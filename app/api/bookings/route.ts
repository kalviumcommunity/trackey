// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { hasPermission } from "../../lib/hasPermission"; // Adjust the path as necessary

// CREATE booking
export async function POST() {
  const userRole = "viewer"; // admin | editor | viewer
  const allowed = hasPermission(userRole, "create");

  console.log(
    `[RBAC] ${userRole} attempted CREATE booking: ${
      allowed ? "ALLOWED" : "DENIED"
    }`
  );

  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json(
    { message: "Booking created successfully" },
    { status: 201 }
  );
}

// READ bookings
export async function GET() {
  const userRole = "viewer";
  const allowed = hasPermission(userRole, "read");

  console.log(
    `[RBAC] ${userRole} attempted READ bookings: ${
      allowed ? "ALLOWED" : "DENIED"
    }`
  );

  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json({ bookings: [] });
}

// UPDATE booking
export async function PUT() {
  const userRole = "editor";
  const allowed = hasPermission(userRole, "update");

  console.log(
    `[RBAC] ${userRole} attempted UPDATE booking: ${
      allowed ? "ALLOWED" : "DENIED"
    }`
  );

  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json({ message: "Booking updated" });
}

// DELETE booking
export async function DELETE() {
  const userRole = "editor";
  const allowed = hasPermission(userRole, "delete");

  console.log(
    `[RBAC] ${userRole} attempted DELETE booking: ${
      allowed ? "ALLOWED" : "DENIED"
    }`
  );

  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json({ message: "Booking deleted" });
}
