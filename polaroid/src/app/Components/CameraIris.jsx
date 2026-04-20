"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CameraIris = () => {
  const [isSnapping, setIsSnapping] = useState(false);

  // Trigger function for the 3-phase shutter sequence
  const triggerSnap = () => {
    if (isSnapping) return;
    setIsSnapping(true);
    
    // Total animation cycle time is approx 0.8s
    // (Open -> Closed -> Re-open)
    setTimeout(() => {
      setIsSnapping(false);
    }, 800);
  };

  // Shared animation definition for all six blades.
  // Each blade starts 'out' (y: "100%"), slams 'in' (y: 0, rotate: 0),
  // and then quickly retracts ('out') during the exit phase.
  const bladeAnimation = {
    initial: { y: "100%", rotate: 0 },
    animate: { 
      y: 0, // Slides to its precise layout position
      rotate: 0,
      transition: {
        duration: 0.35, // Phase 1: Sudden Mechanical Closure
        ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for that "slam" effect
      }
    },
    exit: { 
      y: "100%", // Phase 2: Rapid Retraction for Re-open
      transition: {
        duration: 0.15, // Re-opens quickly
        delay: 0.3, // Brief pause in closed state
        ease: [0.11, 0, 0.5, 0] // Accelerates out
      }
    }
  };

  return (
    <>
      {/* 1. BUTTON TO TRIGGER - STAYS ACCESSIBLE */}
      <button
        onClick={triggerSnap}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all focus:ring-4 focus:ring-purple-400 outline-none"
      >
        📸 Take Shot
      </button>

      {/* 2. THE SHUTTER OVERLAY CONTAINER */}
      <AnimatePresence>
        {isSnapping && (
          // Fixed container spanning the whole viewport
          <div className="inset-0 pointer-events-none z-[90] flex items-center justify-center bg-black/40">
            
            {/* 3. CENTERED IRIS BLOCK */}
            {/* Aspect ratio [1/1] ensures a perfect, centered square for the blades to form a circle inside */}
            <div className="relative aspect-[1/1] w-[80vw] h-[80vh] flex items-center justify-center overflow-visible">
              
              {/* === Phase 1: Blade Animation === */}
              {/* Each black div uses a dynamic rotate and origin class to form the spiral overlap */}

              {/* Top-Right (origin-right-bottom, -60deg start) */}
              <motion.div
                variants={bladeAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute origin-right-bottom -rotate-[60deg] w-full h-[50vh] bg-black border border-zinc-900"
              />
              
              {/* Bottom-Right (origin-right-top, 0deg start) */}
              <motion.div
                variants={bladeAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute origin-right-top rotate-0 w-full h-[50vh] bg-black border border-zinc-900"
              />

              {/* Bottom-Left (origin-left-top, 60deg start) */}
              <motion.div
                variants={bladeAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute origin-left-top rotate-[60deg] w-full h-[50vh] bg-black border border-zinc-900"
              />

              {/* Top-Left (origin-left-bottom, 120deg start) */}
              <motion.div
                variants={bladeAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute origin-left-bottom rotate-[120deg] w-full h-[50vh] bg-black border border-zinc-900"
              />

              {/* Phase 1: Completed closed state looks like a spiral, creating the overlapping structure. */}
              {/* === Phase 2: Rapid Re-Open === */}
              {/* The "exit" definition triggers, making each blade quickly retract. */}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CameraIris;