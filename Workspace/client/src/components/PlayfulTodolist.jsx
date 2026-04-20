"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { getTasks, createTask, deleteTask } from "@/services/taskService";

function getPathAnimate(isActive) {
  return {
    pathLength: isActive ? 1 : 0,
    opacity: isActive ? 1 : 0,
  };
}

function getPathTransition(isActive) {
  return {
    pathLength: { duration: 0.6, ease: "easeInOut" },
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

  // 🔹 Fetch tasks
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

  // 🔹 Toggle complete
  const toggleTask = (id) => {
    setCompleted((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // 🔹 Add task
  const handleAdd = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await createTask(newTask);
      setTasks((prev) => [...prev, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-zinc-800 rounded-2xl text-white">

      {/* 🔹 Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-zinc-400">Tasks</h2>

        <button
          onClick={handleAdd}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* 🔹 Input */}
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task..."
        className="mb-4 p-2 rounded-lg bg-zinc-700 outline-none"
      />

      {/* 🔹 Task List */}
      <div className="flex flex-col gap-3 p-2 overflow-y-auto custom-scrollbar">

        {tasks.map((t) => (
          <div
            key={t._id}
            className="relative flex items-center justify-between cursor-pointer"
          >

            {/* TEXT */}
            <div
              onClick={() => toggleTask(t._id)}
              className="flex-1 text-sm"
            >
              {t.task}
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(t._id)}
              className="text-xs text-red-400 hover:text-red-500 ml-2"
            >
              ✕
            </button>

            {/* ANIMATION */}
            <motion.svg
              width="100%"
              height="30"
              viewBox="0 0 340 40"
              className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <motion.path
                d="M 10 20 C 80 5, 120 35, 170 20 C 220 5, 260 35, 330 20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={getPathAnimate(completed.includes(t._id))}
                transition={getPathTransition(completed.includes(t._id))}
              />
            </motion.svg>

          </div>
        ))}

      </div>
    </div>
  );
}