import { NextResponse } from "next/server";

type Booking = {
  id: number;
  userId: number;
  trainId: number;
};

export async function GET() {
  const bookings: Booking[] = [];

  if (bookings.length === 0) {
    return NextResponse.json({ error: "No bookings found" }, { status: 404 });
  }

  return NextResponse.json(bookings, { status: 200 });
}
