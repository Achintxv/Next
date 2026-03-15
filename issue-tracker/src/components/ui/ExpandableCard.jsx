"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpandableCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <motion.div
        layout
        onClick={() => setOpen(!open)}
        className="w-full cursor-pointer rounded-xl bg-zinc-800 text-white p-4 shadow-lg"
        transition={{ layout: { duration: 0.3, type: "spring" } }}
      >
        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Issue Title</h2>
          <span className="text-xs text-blue-400">OPEN</span>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-zinc-700 pt-4 text-sm text-gray-300">

                <div className="flex gap-2 mt-4">
                  <button className="px-3 py-1 bg-blue-600 rounded">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-600 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}