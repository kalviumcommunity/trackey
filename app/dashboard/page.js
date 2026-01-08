export const dynamic = "force-dynamic";

export default async function Dashboard() {
  console.log("DASHBOARD PAGE: REQUEST TIME");

  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard (SSR)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
