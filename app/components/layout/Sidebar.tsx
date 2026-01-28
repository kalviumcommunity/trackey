"use client";

import Link from "next/link";
import { useUIContext } from "@/context/UIContext";

// sidebar routes
export default function Sidebar() {
  const { sidebarOpen } = useUIContext();

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-gray-100 p-4 text-black min-h-screen">
      <h2 className="font-bold mb-4">Menu</h2>

      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="block hover:underline">
            Dashboard
          </Link>
        </li>

        <li>
          <Link href="/users" className="block hover:underline">
            Users
          </Link>
        </li>

        <li>
          <Link href="/bookings" className="block hover:underline">
            Bookings
          </Link>
        </li>

        <li>
          <Link href="/trains" className="block hover:underline">
            Trains
          </Link>
        </li>
      </ul>
    </aside>
  );
}
