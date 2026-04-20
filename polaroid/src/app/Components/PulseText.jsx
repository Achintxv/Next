"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PulseText({
  text,
  scale = 1.1,
  speed = 1.5,
  stagger = true,
  className = "",
}) {
  if (!stagger) {
    return (
      <motion.div
        className={`text-[14px] font-black ${className}`}
        animate={{
          scale: [1, scale, 1],
        }}
        transition={{
          duration: speed,
          // repeat: 1,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.div>
    );
  }

  return (
    <div className={`inline-flex ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="text-6xl font-black inline-block"
          animate={{
            scale: [1, scale, 1],
          }}
          transition={{
            duration: speed,
            // repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}