"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { TiCamera } from "react-icons/ti";

const CameraShutter = ({ onCapture }) => {
  const [isSnapping, setIsSnapping] = useState(false);

  const triggerSnap = () => {
    if (isSnapping) return;

    setIsSnapping(true);

    if (onCapture) onCapture();

    // Reset state after animation
    setTimeout(() => {
      setIsSnapping(false);
    }, 800);
  };

  return (
    <>
      <Button onClick={triggerSnap} className="absolute text-2xl">
        <TiCamera />
      </Button>

      <AnimatePresence>
        {isSnapping && (
          <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col">
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: [0.45, 0, 0.55, 1] }}
              className="w-full h-1/2 bg-black border-b border-zinc-800"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.45, 0, 0.55, 1] }}
              className="w-full h-1/2 bg-black border-t border-zinc-800"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute inset-0 bg-white z-[101]"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CameraShutter;
