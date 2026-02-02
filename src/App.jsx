"use client";
import { useAuth } from "../hooks/useAuth";
import { useUI } from "../hooks/useUI";

export default function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">
        State Management using Context & Hooks
      </h1>

      {/* AUTH */}
      <div className="mb-6">
        <h2 className="font-semibold">Auth State</h2>

        {isAuthenticated ? (
          <>
            <p>Logged in as: {user}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => login("KalviumUser")}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>

      {/* UI */}
      <div>
        <h2 className="font-semibold">UI Controls</h2>
        <p>Theme: {theme}</p>

        <button
          onClick={toggleTheme}
          className="bg-blue-500 text-white px-4 py-1 rounded mr-3"
        >
          Toggle Theme
        </button>

        <button
          onClick={toggleSidebar}
          className="bg-yellow-400 px-4 py-1 rounded"
        >
          {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
      </div>
    </div>
  );
}
