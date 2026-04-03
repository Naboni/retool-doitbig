import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [headerText, setHeaderText] = useState("Here comes text with variables");

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col gap-4 p-8">
          <h1 className="text-2xl font-bold">{headerText}</h1>

          <label className="flex max-w-xs flex-col gap-1.5 text-sm text-gray-600">
            Name
            <input
              className="rounded-md border border-gray-300 px-3 py-2 text-base"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="flex max-w-xs flex-col gap-1.5 text-sm text-gray-600">
            Age
            <input
              className="rounded-md border border-gray-300 px-3 py-2 text-base"
              type="number"
              placeholder="Enter age"
              min={0}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </main>

        <aside className="flex w-[400px] flex-col gap-3 border-l border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xs uppercase tracking-wide text-gray-400">
            Text
          </h2>
          <textarea
            className="rounded-md border border-gray-300 px-3 py-2 text-base"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            placeholder="Header text"
          />
        </aside>
      </div>
    </div>
  );
}
