"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-red-600 text-xl font-semibold">
        Oops! Something went wrong 😢
      </h2>
      <p className="mt-2 text-gray-600">{error.message}</p>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
