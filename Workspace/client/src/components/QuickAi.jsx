"use client";

import React, { useState } from "react";
import { askAI } from "@/services/aiService";

export default function QuickAI() {
  const [type, setType] = useState("ask");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await askAI({ type, input });
      setOutput(res.data.result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-800 rounded-xl p-2 text-white overflow-hidden">

      {/* 🔹 Header */}
      <div className="flex justify-between mb-3">
        <h2 className="text-sm text-zinc-400">Quick AI</h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-zinc-700 text-xs rounded px-2 py-1"
        >
          <option value="ask">Ask anything</option>
          <option value="summarize">Summarize</option>
          <option value="grammar">Grammar</option>
          <option value="decision">Yes/No</option>
          <option value="sentiment">Sentiment</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* 🔹 Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        className="p-2 mb-3 rounded bg-zinc-700 text-sm outline-none wrap-break-word"
      />

      {/* 🔹 Button */}
      <button
        onClick={handleSubmit}
        className="mb-3 bg-blue-600 hover:bg-blue-700 py-1 rounded text-sm"
      >
        {loading ? "Thinking..." : "Generate"}
      </button>

      {/* 🔹 Output */}
      <div className="flex-1 bg-zinc-700 p-2 rounded text-sm overflow-y-auto wrap-break-word">
        {output || "Result will appear here..."}
      </div>
    </div>
  );
}