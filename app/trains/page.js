export const revalidate = 60;

export default async function Trains() {
  console.log("TRAINS PAGE: ISR");

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();

  return (
    <main style={{ padding: 40 }}>
      <h1>Train Status (ISR)</h1>
      <p>Revalidates every 60 seconds</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
