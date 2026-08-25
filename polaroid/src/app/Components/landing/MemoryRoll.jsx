"use client";

import { motion } from "framer-motion";

export default function MemoryRoll({ items }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full">

      {/* Fade edges */}

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#FFF8EE] to-transparent md:w-32" />

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#FFF8EE] to-transparent md:w-32" />


      {/* Track */}

      <motion.div
        className="flex w-max items-end gap-4 px-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >

        {doubled.map((item, index) => (
          <MemoryCard
            key={`${item.caption}-${index}`}
            item={item}
            index={index}
          />
        ))}

      </motion.div>

    </div>
  );
}


function MemoryCard({ item, index }) {
  const rotations = [-2, 1.5, -1, 2, -1.5, 1];

  return (
    <motion.div
      whileHover={{
        y: -10,
        rotate: 0,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      style={{
        rotate: rotations[index % rotations.length],
      }}
      className="
        w-[150px]
        shrink-0
        bg-white
        p-2
        pb-3
        shadow-[0_8px_25px_rgba(41,37,34,0.12)]
        md:w-[190px]
      "
    >

      <div className="aspect-[4/5] overflow-hidden bg-[#F7F0E4]">

        <img
          src={item.image}
          alt={item.caption}
          className="
            h-full
            w-full
            object-cover
            grayscale-[15%]
            transition-transform
            duration-700
            hover:scale-105
          "
        />

      </div>

      <div className="px-1 pt-2">

        <p className="font-mono text-[8px] tracking-[0.18em] text-[#756E67]">
          {item.caption}
        </p>

      </div>

    </motion.div>
  );
}