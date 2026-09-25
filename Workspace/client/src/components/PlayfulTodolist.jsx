"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuCheck,
  LuCircle,
  LuPlus,
  LuTrash2,
  LuListTodo,
} from "react-icons/lu";

import { getTasks, createTask, deleteTask } from "@/services/taskService";

function getPathAnimate(isActive) {
  return {
    pathLength: isActive ? 1 : 0,
    opacity: isActive ? 1 : 0,
  };
}

function getPathTransition(isActive) {
  return {
    pathLength: {
      duration: 0.6,
      ease: "easeInOut",
    },
    opacity: {
      duration: 0.01,
      delay: isActive ? 0 : 0.6,
    },
  };
}

export default function PlayfulTodolist() {
  const [tasks, setTasks] = React.useState([]);
  const [completed, setCompleted] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [adding, setAdding] = React.useState(false);

  /* =========================================================
     FETCH TASKS
  ========================================================= */

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  /* =========================================================
     TOGGLE COMPLETE
  ========================================================= */

  const toggleTask = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /* =========================================================
     ADD TASK
  ========================================================= */

  const handleAdd = async () => {
    if (!newTask.trim() || adding) return;

    try {
      setAdding(true);

      const res = await createTask(newTask.trim());

      setTasks((prev) => [...prev, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  /* =========================================================
     DELETE TASK
  ========================================================= */

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));

      setCompleted((prev) => prev.filter((completedId) => completedId !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
     STATS
  ========================================================= */

  const completedCount = completed.filter((id) =>
    tasks.some((task) => task._id === id),
  ).length;

  const remainingCount = tasks.length - completedCount;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-black/[0.06] bg-[#FFFDF9] text-[#29251F] shadow-[0_18px_50px_rgba(80,60,30,0.08)]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="shrink-0 border-b border-black/[0.06] px-5 py-4">
        <div className="flex items-center justify-between">
          {/* TITLE */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <LuListTodo size={19} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight text-[#29251F]">
                  Today&apos;s Tasks
                </h2>

                <span className="rounded-full bg-[#F7F4EF] px-2 py-0.5 text-[10px] font-semibold text-[#8A8177]">
                  {tasks.length}
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-[#9A9186]">
                {remainingCount > 0
                  ? `${remainingCount} task${
                      remainingCount === 1 ? "" : "s"
                    } remaining`
                  : tasks.length > 0
                    ? "Everything is done ✨"
                    : "Nothing planned yet"}
              </p>
            </div>
          </div>

          {/* PROGRESS */}

          {tasks.length > 0 && (
            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[#A49A8E]">
                Progress
              </p>

              <p className="text-sm font-bold text-[#29251F]">
                {Math.round((completedCount / tasks.length) * 100)}%
              </p>
            </div>
          )}
        </div>

        {/* PROGRESS BAR */}

        {tasks.length > 0 && (
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#F0ECE5]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedCount / tasks.length) * 100}%`,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          </div>
        )}
      </div>

      {/* =====================================================
          INPUT
      ===================================================== */}

      <div className="shrink-0 px-5 pt-4">
        <div className="group flex items-center gap-2 rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-[0_4px_16px_rgba(80,60,30,0.04)] transition-all focus-within:border-orange-200 focus-within:shadow-[0_6px_20px_rgba(249,115,22,0.08)]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-400">
            <LuPlus size={16} />
          </div>

          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            placeholder="Add a new task..."
            className="min-w-0 flex-1 bg-transparent px-1 text-xs font-medium text-[#29251F] placeholder:text-[#B0A79B] focus:outline-none"
          />

          <button
            onClick={handleAdd}
            disabled={adding || !newTask.trim()}
            className="flex h-8 shrink-0 items-center gap-1.5 rounded-xl bg-[#29251F] px-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-orange-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LuPlus size={14} />
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* =====================================================
          TASK LIST
      ===================================================== */}

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">
        {tasks.length === 0 ? (
          /* EMPTY STATE */

          <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7F4EF] text-[#B4AA9E]">
              <LuListTodo size={23} />
            </div>

            <p className="text-sm font-semibold text-[#5E574F]">No tasks yet</p>

            <p className="mt-1 max-w-[190px] text-[11px] leading-relaxed text-[#A49A8E]">
              Add something you want to get done today.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {tasks.map((task) => {
                const isDone = completed.includes(task._id);

                return (
                  <motion.div
                    key={task._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: 20,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={`group relative overflow-hidden rounded-2xl border p-3 transition-all duration-200 ${
                      isDone
                        ? "border-emerald-100 bg-emerald-50/50"
                        : "border-black/[0.06] bg-white hover:border-orange-100 hover:shadow-[0_6px_20px_rgba(80,60,30,0.06)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* CHECK BUTTON */}

                      <button
                        onClick={() => toggleTask(task._id)}
                        className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          isDone
                            ? "border-emerald-400 bg-emerald-400 text-white"
                            : "border-[#D8D1C7] bg-white text-transparent hover:border-orange-400 hover:text-orange-300"
                        }`}
                        title={
                          isDone ? "Mark as incomplete" : "Mark as complete"
                        }
                      >
                        <LuCheck size={14} />
                      </button>

                      {/* TASK TEXT */}

                      <div
                        onClick={() => toggleTask(task._id)}
                        className="relative min-w-0 flex-1 cursor-pointer"
                      >
                        <span
                          className={`block truncate text-xs font-semibold transition-colors ${
                            isDone ? "text-[#A39A8E]" : "text-[#403A34]"
                          }`}
                        >
                          {task.task}
                        </span>

                        {/* PLAYFUL STRIKE */}

                        <motion.svg
                          width="100%"
                          height="28"
                          viewBox="0 0 340 40"
                          preserveAspectRatio="none"
                          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
                        >
                          <motion.path
                            d="M 4 20 C 70 7, 120 33, 170 20 C 220 7, 275 33, 336 20"
                            stroke="#F97316"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            initial={false}
                            animate={getPathAnimate(isDone)}
                            transition={getPathTransition(isDone)}
                          />
                        </motion.svg>
                      </div>

                      {/* DELETE */}

                      <button
                        onClick={() => handleDelete(task._id)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#B8AFA4] opacity-0 transition-all duration-200 hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
                        title="Delete task"
                      >
                        <LuTrash2 size={14} />
                      </button>
                    </div>

                    {/* COMPLETED LABEL */}

                    {isDone && (
                      <div className="mt-2 ml-10 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-500">
                        <LuCheck size={10} />
                        Completed
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      {tasks.length > 0 && (
        <div className="flex shrink-0 items-center justify-between border-t border-black/[0.06] px-5 py-3">
          <div className="flex items-center gap-2 text-[10px] text-[#A49A8E]">
            <LuCircle size={8} className="fill-orange-300 text-orange-300" />
            Click a task to mark it complete
          </div>

          <span className="text-[10px] font-medium text-[#A49A8E]">
            {completedCount}/{tasks.length} done
          </span>
        </div>
      )}
    </div>
  );
}
