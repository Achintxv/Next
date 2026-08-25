"use client";

import { motion } from "framer-motion";
import { TiCamera } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import LandingCamera from "../LandingCamera";

const memories = [
  {
    src: "/images/Portrait1.jpg",
    label: "MOMENT 01",
    rotate: -7,
    position: "left-[5%] top-[22%]",
  },
  {
    src: "/images/Portrait2.jpg",
    label: "MOMENT 02",
    rotate: 6,
    position: "right-[7%] top-[18%]",
  },
  {
    src: "/images/Portrait3.jpg",
    label: "MOMENT 03",
    rotate: -4,
    position: "left-[12%] bottom-[12%]",
  },
  {
    src: "/images/Portrait4.jpg",
    label: "MOMENT 04",
    rotate: 8,
    position: "right-[13%] bottom-[10%]",
  },
];

export default function Landing({ onEnter }) {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F7F0E4]
        text-[#292522]
      "
    >

      {/* =====================================================
          PAPER TEXTURE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />


      {/* =====================================================
          AMBIENT BLOBS
      ===================================================== */}

      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-32
          top-20
          h-96
          w-96
          rounded-full
          bg-[#E8A6A6]/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#A9C7D8]/25
          blur-3xl
        "
      />


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header
        className="
          relative
          z-30
          flex
          items-center
          justify-between
          px-6
          py-6
          md:px-8
          md:py-3
        "
      >

        <div className="
          font-mono
          text-[11px]
          font-bold
          tracking-[0.35em]
        ">
          KAPTURE
        </div>


        <div className="
          hidden
          items-center
          gap-3
          font-mono
          text-[9px]
          tracking-[0.18em]
          text-[#756E67]
          sm:flex
        ">

          <span className="
            h-2
            w-2
            rounded-full
            bg-[#AFC3A1]"
          />

          ONLINE CAMERA

        </div>


        <button
          onClick={onEnter}
          className="
            rounded-full
            border-2
            border-[#292522]
            bg-[#FFF8EE]
            px-5
            py-2.5
            font-mono
            text-[9px]
            font-bold
            tracking-[0.15em]
            shadow-[0_3px_0_#292522]
            transition
            hover:-translate-y-[1px]
            hover:shadow-[0_4px_0_#292522]
            active:translate-y-[2px]
            active:shadow-none
          "
        >
          OPEN CAMERA
        </button>

      </header>


      {/* =====================================================
          FLOATING MEMORIES
      ===================================================== */}

      {memories.map((memory, index) => (
        <motion.div
          key={memory.label}
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: memory.rotate - 5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: memory.rotate,
            y: [0, index % 2 === 0 ? -10 : 10, 0],
          }}
          transition={{
            opacity: {
              duration: 0.8,
              delay: 0.3 + index * 0.12,
            },
            scale: {
              duration: 0.8,
              delay: 0.3 + index * 0.12,
            },
            rotate: {
              duration: 0.8,
              delay: 0.3 + index * 0.12,
            },
            y: {
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`
            absolute
            z-10
            hidden
            w-[135px]
            rounded-[3px]
            bg-white
            p-2
            pb-7
            shadow-[0_12px_30px_rgba(41,37,34,0.12)]
            lg:block
            ${memory.position}
          `}
        >

          <div className="
            aspect-square
            overflow-hidden
            bg-[#292522]"
          >
            <img
              src={memory.src}
              alt=""
              className="
                h-full
                w-full
                object-cover
                grayscale-[15%]
              "
            />
          </div>

          <div className="
            absolute
            bottom-2
            left-2
            font-mono
            text-[6px]
            tracking-[0.15em]
            text-[#756E67]
          ">
            {memory.label}
          </div>

        </motion.div>
      ))}


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          z-20
          flex
          min-h-[calc(100vh-88px)]
          flex-col
          items-center
          justify-center
          px-6
          pb-18
        "
      >

        {/* Small label */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mb-2
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#292522]/20
            bg-[#FFF8EE]/70
            px-4
            py-2
            backdrop-blur-sm
          "
        >

          <span className="
            font-mono
            text-[8px]
            tracking-[0.25em]
            text-[#756E67]
          ">
            A LITTLE DIGITAL PHOTO BOOTH
          </span>

        </motion.div>


        {/* =================================================
            TITLE
        ================================================= */}

        <div className="relative text-center">

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              select-none
              text-[clamp(4rem,18vw,10rem)]
              font-black
              leading-[0.72]
              tracking-[-0.09em]
              text-[#292522]
            "
          >
            Kapture
          </motion.h1>


          {/* little star */}

          <motion.div
            animate={{
              rotate: [0, 12, -8, 0],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-5
              -top-7
              text-3xl
              text-[#E8A6A6]
              md:-right-10
              md:-top-10
              md:text-5xl
            "
          >
            ✦
          </motion.div>

        </div>


        {/* =================================================
            SUBTITLE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.7,
          }}
          className="
            mt-10
            max-w-[420px]
            text-center
            text-sm
            leading-6
            text-[#756E67]
            md:text-base
          "
        >
          Frame the little things.
          <br />
          Turn a moment into something you can keep.
        </motion.p>


        {/* =================================================
            CAMERA OBJECT
        ================================================= */}

        <LandingCamera onCapture={onEnter} />


        {/* =================================================
            CTA
        ================================================= */}

        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.7,
          }}
          whileHover={{
            y: -3,
          }}
          whileTap={{
            y: 2,
          }}
          onClick={onEnter}
          className="
            group
            relative
            mt-2
            flex
            items-center
            gap-4
            rounded-full
            border-[3px]
            border-[#292522]
            bg-[#E8A6A6]
            px-8
            py-4
            font-mono
            text-[10px]
            font-bold
            tracking-[0.18em]
            shadow-[0_5px_0_#292522]
          "
        >

          <TiCamera className="text-xl" />

          CAPTURE A MOMENT

          <span className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          ">
            →
          </span>

        </motion.button>


        {/* =================================================
            BOTTOM HINT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
          className="
            absolute
            bottom-7
            flex
            flex-col
            items-center
            gap-2
            text-[#756E67]
          "
        >
        </motion.div>

      </section>


      {/* =====================================================
          MEMORY ROLL STRIP
      ===================================================== */}

      <div className="
        absolute
        bottom-0
        left-0
        right-0
        hidden
        h-12
        overflow-hidden
        border-t
        border-[#292522]/10
        bg-[#FFF8EE]/50
        md:block
      ">

        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            flex
            w-max
            items-center
            gap-12
            px-8
            font-mono
            text-[8px]
            tracking-[0.3em]
            text-[#756E67]
          "
        >

          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className="flex items-center gap-12">
              <span>MEMORY {String(index + 1).padStart(2, "0")}</span>
              <span className="text-[#E8A6A6]">✦</span>
            </span>
          ))}

        </motion.div>

      </div>

    </main>
  );
}