"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
} from "@/services/ideaService";

export default function KanbanBoard() {
  const [ideas, setIdeas] = useState([]);
  const [input, setInput] = useState("");

  // 🔥 Fetch ideas
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await getIdeas();
        setIdeas(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdeas();
  }, []);

  // ➕ Add idea
  const handleAdd = async () => {
    if (!input.trim()) return;

    try {
      const res = await createIdea(input);
      setIdeas((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🧲 Move idea
  const moveCard = async (idea) => {
    let newStatus = "";

    if (idea.status === "todo") newStatus = "doing";
    else if (idea.status === "doing") newStatus = "done";
    else return;

    try {
      const res = await updateIdea(idea._id, newStatus);

      setIdeas((prev) =>
        prev.map((i) =>
          i._id === idea._id ? res.data : i
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ Delete idea
  const handleDelete = async (id) => {
    try {
      await deleteIdea(id);
      setIdeas((prev) =>
        prev.filter((i) => i._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 📦 Column component
  const Column = ({ title, keyName }) => (
    <div className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl p-3 flex flex-col">
      <h3 className="text-sm text-zinc-400 mb-3">{title}</h3>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
        {ideas
          .filter((i) => i.status === keyName)
          .map((idea) => (
            <motion.div
              key={idea._id}
              layout
              className="group relative bg-zinc-700 p-3 rounded-lg flex justify-between items-center hover:bg-zinc-600 transition text-sm"
            >
              {/* TEXT */}
              <span
                onClick={() => moveCard(idea)}
                className="flex-1 cursor-pointer"
              >
                {idea.text}
              </span>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(idea._id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 text-xs ml-2"
              >
                ✕
              </button>
            </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-zinc-800 rounded-xl border border-zinc-700 p-3 text-white">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-zinc-400">
          Ideas Board
        </h2>

        <button
          onClick={handleAdd}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* INPUT */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write an idea..."
        className="mb-4 p-2 rounded-lg bg-zinc-700 outline-none"
      />

      {/* COLUMNS */}
      <div className="flex gap-2 flex-1 overflow-hidden">
        <Column title="Ideas" keyName="todo" />
        <Column title="Doing" keyName="doing" />
        <Column title="Done" keyName="done" />
      </div>
    </div>
  );
}