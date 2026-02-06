"use client";

interface Props {
  params: { id: string };
}

export default function UserProfile({ params }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">User Profile</h1>
      <p>User ID: {params.id}</p>
    </main>
  );
}

export default function Home() {
  const stats = [
    { title: "Active Users", value: "1,248" },
    { title: "Bookings Today", value: "342" },
    { title: "Revenue", value: "$12,480" },
    { title: "Pending Requests", value: "18" },
    { title: "Completed Trips", value: "5,102" },
    { title: "System Health", value: "98%" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 md:p-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-500">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Responsive analytics panel
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <main className="max-w-7xl mx-auto grid gap-6 px-6 pb-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((card, i) => (
          <div
            key={i}
            className="rounded-xl p-6 bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition"
          >
            <h2 className="text-sm text-gray-500">{card.title}</h2>
            <p className="text-2xl font-bold mt-2 text-blue-500">
              {card.value}
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}
