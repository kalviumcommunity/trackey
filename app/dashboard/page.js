// app/dashboard/page.js
import { hasPermission } from "../lib/hasPermission";

export default function DashboardPage() {
  // In real app, get this from auth/session
  const userRole = "editor"; // admin | editor | viewer

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <section style={{ marginTop: 16 }}>
        {hasPermission(userRole, "read") && <button>View Trains</button>}

        {hasPermission(userRole, "update") && (
          <button style={{ marginLeft: 8 }}>Edit Train</button>
        )}

        {hasPermission(userRole, "delete") && (
          <button style={{ marginLeft: 8 }}>Delete Train</button>
        )}
      </section>

      {!hasPermission(userRole, "read") && (
        <p style={{ color: "red", marginTop: 16 }}>Access denied</p>
      )}
    </main>
  );
}
