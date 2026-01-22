export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 text-black">
      <h2 className="font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>Dashboard</li>
        <li>Users</li>
        <li>Bookings</li>
        <li>Trains</li>
      </ul>
    </aside>
  );
}
