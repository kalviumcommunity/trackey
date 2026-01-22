export default function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold">Trackey</h1>
      <nav className="space-x-4">
        <span>Home</span>
        <span>Dashboard</span>
        <span>Trains</span>
      </nav>
    </header>
  );
}
