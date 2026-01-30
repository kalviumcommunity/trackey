export default function App() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-surface-light text-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="p-4 md:p-8 lg:p-12 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold text-brand">
          Responsive Dashboard
        </h1>
      </header>

      {/* Content Grid */}
      <main className="grid gap-4 p-4 md:p-8 lg:p-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card} className="p-6 rounded-xl shadow bg-white transition">
            <h2 className="text-xl font-bold mb-2">Card {card}</h2>
            <p className="text-sm md:text-base">
              This layout automatically adjusts based on screen size.
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}
