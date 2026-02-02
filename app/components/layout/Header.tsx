import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">
        <Link href="/">Trackey</Link>
      </h1>

      <nav className="space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/trains" className="hover:underline">
          Trains
        </Link>
      </nav>
    </header>
  );
}
