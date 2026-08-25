"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TiCamera } from "react-icons/ti";

export default function LandingCamera({ onCapture }) {
  const [lensPosition, setLensPosition] = useState({
    x: 0,
    y: 0,
  });

  const [shooting, setShooting] = useState(false);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 10;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 8;

    setLensPosition({
      x,
      y,
    });
  };

  const resetLens = () => {
    setLensPosition({
      x: 0,
      y: 0,
    });
  };

  const handleCapture = () => {
    if (shooting) return;

    setShooting(true);

    // Small delay so the camera physically reacts
    setTimeout(() => {
      if (onCapture) {
        onCapture();
      }
    }, 180);

    // Finish landing-camera animation
    setTimeout(() => {
      setShooting(false);
    }, 700);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetLens}
      className="
        relative
        flex
        h-[210px]
        w-[340px]
        items-center
        justify-center
        md:h-[240px]
        md:w-[390px]
      "
    >

      {/* =====================================================
          CAMERA SHADOW
      ===================================================== */}

      <motion.div
        animate={{
          scale: shooting ? 0.82 : [1, 0.94, 1],
          opacity: shooting ? 0.08 : [0.12, 0.08, 0.12],
        }}
        transition={{
          duration: shooting ? 0.2 : 4,
          repeat: shooting ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          h-8
          w-[245px]
          rounded-full
          bg-[#292522]
          blur-xl
        "
      />


      {/* =====================================================
          CAMERA
      ===================================================== */}

      <motion.div
        animate={{
          y: shooting ? 3 : [0, -5, 0],
          rotate: shooting ? [0, -1.5, 1, 0] : [-1, 1, -1],
        }}
        transition={
          shooting
            ? {
                duration: 0.35,
                ease: "easeOut",
              }
            : {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="
          relative
          z-10
          h-[150px]
          w-[300px]
          rounded-[34px]
          border-[3px]
          border-[#292522]
          bg-[#FFF8EE]
          shadow-[9px_12px_0_#292522]
          md:h-[170px]
          md:w-[350px]
        "
      >

        {/* =================================================
            TOP RAISED CAMERA SECTION
        ================================================= */}

        <div
          className="
            absolute
            -top-[25px]
            left-[28px]
            h-[30px]
            w-[90px]
            rounded-t-[14px]
            border-[3px]
            border-b-0
            border-[#292522]
            bg-[#FFF8EE]
          "
        >

          {/* Viewfinder glass */}

          <div
            className="
              absolute
              left-1/2
              top-[7px]
              h-[10px]
              w-[38px]
              -translate-x-1/2
              rounded-[4px]
              border-2
              border-[#292522]
              bg-[#756E67]
            "
          />

        </div>


        {/* =================================================
            TOP SHUTTER BUTTON
        ================================================= */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.85,
            y: 3,
          }}
          onClick={handleCapture}
          disabled={shooting}
          aria-label="Capture a moment"
          className="
            absolute
            right-[15px]
            -top-[17px]
            z-30
            h-[25px]
            w-[54px]
            rounded-[9px]
            border-[3px]
            border-[#292522]
            bg-[#E8A6A6]
            shadow-[0_3px_0_#292522]
            disabled:cursor-not-allowed
          "
        />

        {/* Small top switch */}

        <div
          className="
            absolute
            rounded-full
            border-[#292522]
            bg-[#F3D98B]
          "
        />


        {/* =================================================
            CAMERA BRAND
        ================================================= */}

        <div
          className="
            absolute
            left-[22px]
            top-[28px]
            font-mono
            text-[8px]
            font-bold
            tracking-[0.3em]
            text-[#292522]
          "
        >
          KAPTURE
        </div>


        {/* =================================================
            STATUS LIGHT
        ================================================= */}

        <motion.div
          animate={{
            opacity: shooting ? [0.3, 1, 0.3] : [0.5, 1, 0.5],
          }}
          transition={{
            duration: shooting ? 0.18 : 2,
            repeat: Infinity,
          }}
          className="
            absolute
            right-[25px]
            top-[31px]
            h-[7px]
            w-[7px]
            rounded-full
            bg-[green]
            shadow-[0_0_8px_rgba(175,195,161,0.7)]
          "
        />


        {/* =================================================
            LCD DISPLAY
        ================================================= */}

        <div
          className="
            absolute
            bottom-[25px]
            left-[24px]
            flex
            h-[27px]
            w-[76px]
            flex-col
            justify-center
            rounded-[4px]
            border-2
            border-[#292522]/60
            bg-[#E9E1D3]
            px-2
            font-mono
            text-[6px]
            leading-[8px]
            tracking-[0.08em]
            text-[#756E67]
          "
        >
          <span>SHOT 01</span>

          <span className="flex items-center gap-1">
            <span
              className="
                h-[4px]
                w-[4px]
                rounded-full
                bg-[#AFC3A1]
              "
            />
            READY
          </span>
        </div>


        {/* =================================================
            FLASH
        ================================================= */}

        <motion.div
          animate={{
            backgroundColor: shooting
              ? ["#F3D98B", "#FFF8EE", "#F3D98B"]
              : "#F3D98B",
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            absolute
            right-[24px]
            top-[52px]
            h-[14px]
            w-[24px]
            rounded-[4px]
            border-2
            border-[#292522]
          "
        />


        {/* =================================================
            MAIN LENS
        ================================================= */}

        <motion.div
          
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
            mass: 0.7,
          }}
          className="
            absolute
            left-1/2
            top-[50%]
            flex
            h-[100px]
            w-[100px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border-[6px]
            border-[#292522]
            bg-[#756E67]
            shadow-[inset_0_0_0_7px_#FFF8EE]
            md:h-[112px]
            md:w-[112px]
          "
        >

          {/* Outer lens ring */}

          <div
            className="
              absolute
              inset-[8px]
              rounded-full
              border-[3px]
              border-[#292522]/70
            "
          />

          {/* Inner lens */}

          <motion.div
            animate={{
              rotate: shooting ? 180 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-[17px]
              rounded-full
              border-2
              border-[#E8A6A6]/50
            "
          />

          {/* Glass */}

          <div
            className="
              relative
              h-[46px]
              w-[46px]
              overflow-hidden
              rounded-full
              border-[4px]
              border-[#292522]
              bg-[#292522]
              shadow-[0_0_18px_rgba(169,199,216,0.35)]
            "
          >

            {/* Lens reflection */}

            <motion.div
              animate={{
                x: shooting ? 25 : [0, 5, 0],
                y: shooting ? -10 : [0, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: shooting ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-[7px]
                top-[7px]
                h-[12px]
                w-[18px]
                rotate-[-25deg]
                rounded-full
                bg-[#A9C7D8]/40
                blur-[2px]
              "
            />

            {/* Lens center */}

            <div
              className="
                absolute
                inset-[13px]
                rounded-full
                bg-[#292522]
              "
            />

          </div>

        </motion.div>


        {/* =================================================
            SMALL CAMERA DETAILS
        ================================================= */}

        <div
          className="
            absolute
            bottom-[27px]
            right-[27px]
            flex
            items-center
            gap-1
            font-mono
            text-[6px]
            tracking-[0.12em]
            text-[#756E67]
          "
        >
          <span>24MM</span>
          <span>•</span>
          <span>F/2.8</span>
        </div>


        {/* Tiny decorative screw */}

        <div
          className="
            absolute
            bottom-[24px]
            left-[116px]
            h-[5px]
            w-[5px]
            rounded-full
            border
            border-[#292522]/50
          "
        />

      </motion.div>


      {/* =====================================================
          FLASH EFFECT
      ===================================================== */}

      <AnimatePresence>
        {shooting && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.15, 1.3],
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[55%]
              z-40
              h-[120px]
              w-[120px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
              blur-xl
            "
          />
        )}
      </AnimatePresence>


      {/* =====================================================
          CAPTURE LABEL
      ===================================================== */}

      <motion.div
        animate={{
          opacity: shooting ? 1 : [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: 2.5,
          repeat: shooting ? 0 : Infinity,
        }}
        className="
          absolute
          -bottom-1
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          font-mono
          text-[7px]
          font-bold
          tracking-[0.25em]
          text-[#756E67]
        "
      >
        PRESS THE SHUTTER
      </motion.div>


      {/* =====================================================
          CAMERA ICON HINT
      ===================================================== */}

      <motion.div
        animate={{
          rotate: shooting ? -8 : [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: shooting ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-1
          bottom-10
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border-2
          border-[#292522]
          bg-[#F3D98B]
          shadow-[0_3px_0_#292522]
        "
      >
        <TiCamera className="text-lg" />
      </motion.div>

    </div>
  );
}