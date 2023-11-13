"use client";

import useSWR from "swr";

const countFetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, mutate } = useSWR("/api/count", countFetcher);
  const count = data?.count ?? null;

  const increment = async () => {
    await fetch("/api/increment", { method: "POST" });
    mutate();
  };

  const decrement = async () => {
    await fetch("/api/decrement", { method: "POST" });
    mutate();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-between space-y-4">
        <div className="text-4xl font-bold">{count}</div>

        <button
          className="bg-white dark:bg-black rounded-lg px-4 py-2 w-full"
          onClick={increment}
        >
          Increment
        </button>
        <button
          className="bg-white dark:bg-black rounded-lg px-4 py-2 w-full"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>
    </main>
  );
}
