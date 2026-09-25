"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
} from "@/services/ideaService";

import {
  LuPlus,
  LuTrash2,
  LuArrowRight,
  LuLightbulb,
  LuCircle,
  LuClock3,
  LuCheck,
  LuSparkles,
} from "react-icons/lu";

/* =========================================================
   COLUMN CONFIGURATION
========================================================= */

const columns = [
  {
    key: "todo",
    title: "To Do",
    description: "Ideas waiting to happen",
    icon: LuLightbulb,
  },

  {
    key: "doing",
    title: "In Progress",
    description: "Currently being worked on",
    icon: LuClock3,
  },

  {
    key: "done",
    title: "Completed",
    description: "Things you've finished",
    icon: LuCheck,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function KanbanBoard() {
  const [ideas, setIdeas] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  /* =======================================================
     FETCH IDEAS
  ======================================================== */

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await getIdeas();

        setIdeas(res.data);
      } catch (err) {
        console.error("Failed to fetch ideas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  /* =======================================================
     ADD IDEA
  ======================================================== */

  const handleAdd = async () => {
    if (!input.trim() || adding) return;

    try {
      setAdding(true);

      const res = await createIdea(input.trim());

      setIdeas((prev) => [...prev, res.data]);

      setInput("");
    } catch (err) {
      console.error("Failed to create idea:", err);
    } finally {
      setAdding(false);
    }
  };

  /* =======================================================
     MOVE IDEA
  ======================================================== */

  const moveCard = async (idea) => {
    let newStatus = "";

    if (idea.status === "todo") {
      newStatus = "doing";
    } else if (idea.status === "doing") {
      newStatus = "done";
    } else {
      return;
    }

    try {
      const res = await updateIdea(idea._id, newStatus);

      setIdeas((prev) =>
        prev.map((item) => (item._id === idea._id ? res.data : item)),
      );
    } catch (err) {
      console.error("Failed to move idea:", err);
    }
  };

  /* =======================================================
     DELETE IDEA
  ======================================================== */

  const handleDelete = async (id) => {
    try {
      await deleteIdea(id);

      setIdeas((prev) => prev.filter((idea) => idea._id !== id));
    } catch (err) {
      console.error("Failed to delete idea:", err);
    }
  };

  /* =======================================================
     ADD USING ENTER
  ======================================================== */

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleAdd();
    }
  };

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <div className="relative z-0 flex h-full w-full flex-col overflow-hidden bg-[#FFFDF9] text-[#29251F]">
      {/* =====================================================
          BOARD HEADER
      ====================================================== */}

      <div className="shrink-0 border-b border-black/[0.05] px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className=" flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <LuSparkles className="text-sm" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500">
                Ideas Workspace
              </span>
            </div>
          </div>

          {/* TOTAL */}

          <div className="hidden rounded-xl bg-[#F8F5F0] px-3 py-2 text-right sm:block">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#A39B91]">
              Total ideas: {ideas.length}
            </p>
          </div>
        </div>

        {/* =================================================
            ADD IDEA INPUT
        ================================================= */}

        <div className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <LuLightbulb className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#B4ADA4]" />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind?"
              disabled={adding}
              className="w-full rounded-xl border border-black/[0.07] bg-[#F9F7F3] py-3 pl-9 pr-4 text-sm text-[#29251F] outline-none transition placeholder:text-[#B0A9A1] focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100/60 disabled:opacity-60"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={adding || !input.trim()}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#29251F] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LuPlus className="text-sm" />

            <span className="hidden sm:inline">
              {adding ? "Adding..." : "Add idea"}
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================
          BOARD
      ====================================================== */}

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-4 md:p-5">
        <div className="flex h-full min-w-[850px] gap-4">
          {columns.map((column) => {
            const columnIdeas = ideas.filter(
              (idea) => idea.status === column.key,
            );

            const Icon = column.icon;

            return (
              <div
                key={column.key}
                className="flex min-w-0 flex-1 flex-col rounded-2xl bg-[#F7F4EF]"
              >
                {/* =================================================
                    COLUMN HEADER
                ================================================== */}

                <div className="shrink-0 px-4 pb-3 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          column.key === "todo"
                            ? "bg-orange-100 text-orange-600"
                            : column.key === "doing"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        <Icon className="text-sm" />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-[#39342E]">
                          {column.title}
                        </h3>

                        <p className="hidden text-[9px] text-[#A39B91] sm:block">
                          {column.description}
                        </p>
                      </div>
                    </div>

                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-[10px] font-bold text-[#8F887F] shadow-sm">
                      {columnIdeas.length}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    CARDS
                ================================================== */}

                <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 custom-scrollbar">
                  <div className="flex flex-col gap-2.5">
                    <AnimatePresence mode="popLayout">
                      {columnIdeas.map((idea) => (
                        <IdeaCard
                          key={idea._id}
                          idea={idea}
                          moveCard={moveCard}
                          handleDelete={handleDelete}
                        />
                      ))}
                    </AnimatePresence>

                    {/* EMPTY STATE */}

                    {columnIdeas.length === 0 && !loading && (
                      <div className="flex min-h-[130px] flex-col items-center justify-center rounded-xl border border-dashed border-black/[0.08] px-4 text-center">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#C0B9B0]">
                          <LuCircle className="text-sm" />
                        </div>

                        <p className="text-[10px] font-medium text-[#AAA39A]">
                          Nothing here yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          FOOTER HINT
      ====================================================== */}

      <div className="flex shrink-0 items-center justify-between border-t border-black/[0.05] px-5 py-2.5">
        <p className="text-[9px] text-[#AAA39A]">
          Click an idea to move it forward
        </p>

        <p className="hidden text-[9px] text-[#AAA39A] sm:block">
          {ideas.length} {ideas.length === 1 ? "idea" : "ideas"} in workspace
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   IDEA CARD
========================================================= */

function IdeaCard({ idea, moveCard, handleDelete }) {
  const isDone = idea.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="group relative"
    >
      <div
        onClick={() => moveCard(idea)}
        className={`relative cursor-pointer overflow-hidden rounded-xl border bg-white p-3.5 shadow-[0_2px_8px_rgba(70,50,30,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(70,50,30,0.08)] ${
          isDone
            ? "border-emerald-100/80"
            : "border-black/[0.05] hover:border-orange-200"
        }`}
      >
        {/* Accent line */}

        <div
          className={`absolute left-0 top-0 h-full w-[3px] ${
            idea.status === "todo"
              ? "bg-orange-300"
              : idea.status === "doing"
                ? "bg-amber-400"
                : "bg-emerald-400"
          }`}
        />

        {/* Content */}

        <div className="pr-5">
          <p
            className={`text-xs font-medium leading-relaxed ${
              isDone
                ? "text-[#98928A] line-through decoration-emerald-300"
                : "text-[#403A33]"
            }`}
          >
            {idea.text}
          </p>
        </div>

        {/* Status */}

        <div className="mt-3 flex items-center justify-between">
          <span
            className={`rounded-md px-1.5 py-1 text-[8px] font-bold uppercase tracking-wider ${
              idea.status === "todo"
                ? "bg-orange-50 text-orange-500"
                : idea.status === "doing"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {idea.status === "todo"
              ? "Idea"
              : idea.status === "doing"
                ? "In progress"
                : "Completed"}
          </span>

          {/* Move hint */}

          {!isDone && (
            <span className="flex items-center gap-1 text-[9px] text-[#B1AAA2] opacity-0 transition group-hover:opacity-100">
              Next
              <LuArrowRight className="text-[10px]" />
            </span>
          )}
        </div>

        {/* Delete */}

        <button
          onClick={(e) => {
            e.stopPropagation();

            handleDelete(idea._id);
          }}
          className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-lg text-[#B8B1A8] opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
          title="Delete idea"
        >
          <LuTrash2 className="text-xs" />
        </button>
      </div>
    </motion.div>
  );
}
