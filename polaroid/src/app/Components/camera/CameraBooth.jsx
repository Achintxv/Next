"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TiCamera } from "react-icons/ti";

export default function CameraBooth({ onClose, onCaptureComplete }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  
  const [cameraReady, setCameraReady] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const [shutterPhase, setShutterPhase] = useState("idle");

  const [lensPosition, setLensPosition] = useState({
    x: 0,
    y: 0,
  });

  /* --------------------------------
     CAMERA SETUP
  -------------------------------- */

  useEffect(() => {
    let mounted = true;

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        if (!mounted) return;

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true);
          };
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    }

    setupCamera();

    return () => {
      mounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  /* --------------------------------
     LENS FOLLOW
  -------------------------------- */

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width - 0.5) * 12;

    const y =
      ((event.clientY - rect.top) / rect.height - 0.5) * 12;

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

  /* --------------------------------
     CAPTURE
  -------------------------------- */

  const capture = () => {
  if (!cameraReady || capturing) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas) return;

  // -----------------------------
  // CAPTURE IMAGE FIRST
  // -----------------------------

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  context.save();

  context.translate(canvas.width, 0);
  context.scale(-1, 1);

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  context.restore();

  const imageData = canvas.toDataURL("image/png");

  setCapturedImage(imageData);
  if (onCaptureComplete) {
  onCaptureComplete(imageData);
}

  // -----------------------------
  // START CAMERA SEQUENCE
  // -----------------------------

  setCapturing(true);

  setShutterPhase("closing");

  // Lens closes
  setTimeout(() => {
    setShutterPhase("shutter");
  }, 180);

  // Flash
  setTimeout(() => {
    setShutterPhase("flash");
  }, 360);

  // Open camera again
  setTimeout(() => {
    setShutterPhase("opening");
  }, 520);

  // Finish
  setTimeout(() => {
    setShutterPhase("idle");
    setCapturing(false);
  }, 750);
};

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={resetLens}
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#F7F0E4]
        px-4
        py-10
      "
    >

      {/* --------------------------------
          BACKGROUND
      -------------------------------- */}

      <div className="pointer-events-none absolute inset-0">

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-20
            top-20
            h-56
            w-56
            rounded-full
            bg-[#E8A6A6]/20
            blur-3xl
          "
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-20
            bottom-10
            h-64
            w-64
            rounded-full
            bg-[#A9C7D8]/25
            blur-3xl
          "
        />

      </div>


      {/* --------------------------------
          CAMERA BODY
      -------------------------------- */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          w-full
          max-w-[680px]
          rounded-[38px]
          border-[3px]
          border-[#292522]
          bg-[#FFF8EE]
          p-5
          shadow-[12px_16px_0_#292522]
          md:p-8
        "
      >

        
        {/* --------------------------------
    CAMERA TOP
-------------------------------- */}

<div className="mb-5 flex items-center justify-between">

  <div className="flex items-center gap-3">

    <div className="font-mono text-[10px] tracking-[0.3em]">
      KAPTURE
    </div>

    <div className="h-1 w-1 rounded-full bg-[#E8A6A6]" />

  </div>


  <div className="flex items-center gap-3">

    {/* Camera status */}

    <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.15em] text-[#756E67]">

      <span
        className={`
          h-2 w-2 rounded-full
          ${
            cameraReady
              ? "bg-[#AFC3A1]"
              : "bg-[#E8A6A6]"
          }
        `}
      />

      {cameraReady ? "READY" : "CONNECTING"}

    </div>


    {/* Close button */}

    <motion.button
      whileHover={{
        scale: 1.08,
        rotate: 5,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClose}
      aria-label="Close camera"
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        border-2
        border-[#292522]
        bg-[#F3D98B]
        text-lg
        leading-none
        shadow-[0_3px_0_#292522]
        transition-shadow
        hover:shadow-[0_1px_0_#292522]
      "
    >
      ×
    </motion.button>

  </div>

</div>


        {/* --------------------------------
            VIEWFINDER
        -------------------------------- */}

        <div
          className="
            relative
            aspect-[4/3]
            overflow-hidden
            rounded-[25px]
            border-[3px]
            border-[#292522]
            bg-[#292522]
          "
        >

          {/* Actual webcam */}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              scale-x-[-1]
            "
          />

          {/* Mechanical camera lens */}

<AnimatePresence>

  {shutterPhase !== "idle" && (
    <motion.div
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale:
          shutterPhase === "closing"
            ? 0.65
            : shutterPhase === "shutter"
              ? 0.05
              : 1,
      }}
      transition={{
        duration:
          shutterPhase === "shutter"
            ? 0.12
            : 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-30
        h-36
        w-36
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border-[8px]
        border-[#292522]
        bg-[#756E67]
        shadow-[0_0_0_10px_rgba(255,255,255,0.12)]
      "
    >

      <div className="
        absolute
        inset-3
        rounded-full
        border-2
        border-[#E8A6A6]/60
      " />

      <div className="
        absolute
        inset-7
        rounded-full
        bg-[#292522]
      " />

      <motion.div
        animate={{
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 0.8,
          ease: "linear",
        }}
        className="
          absolute
          inset-9
          rounded-full
          border-2
          border-[#E8A6A6]/40
        "
      />

    </motion.div>
  )}

</AnimatePresence>

{/* Camera flash */}

<AnimatePresence>
  {shutterPhase === "flash" && (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.95, 0.35, 0],
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.24,
        times: [0, 0.12, 0.35, 1],
        ease: "easeOut",
      }}
      className="
        pointer-events-none
        absolute
        inset-0
        z-50
        bg-white
      "
    />
  )}
</AnimatePresence>


          {/* Camera loading state */}

          {!cameraReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#292522]">

              <div className="text-center text-[#FFF8EE]">

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="mx-auto mb-4 text-3xl opacity-60"
                >
                  ◌
                </motion.div>

                <p className="font-mono text-[9px] tracking-[0.2em] opacity-60">
                  CONNECTING CAMERA
                </p>

              </div>

            </div>
          )}


          {/* Viewfinder overlay */}

          <div className="pointer-events-none absolute inset-0">

            {/* Corners */}

            <div className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-white/70" />

            <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-white/70" />

            <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-white/70" />

            <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-white/70" />


            {/* Center focus */}

            <motion.div
              animate={{
                x: lensPosition.x * 0.25,
                y: lensPosition.y * 0.25,
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-12
                w-12
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/30
              "
            />

          </div>

        </div>


        {/* --------------------------------
            CAMERA CONTROLS
        -------------------------------- */}

        <div className="mt-6 flex items-center justify-between">

          {/* Left */}

          <div className="font-mono text-[9px] leading-5 text-[#756E67]">

            <div>SHOT 01</div>

            <div>
              {cameraReady ? "ISO 400" : "---"}
            </div>

          </div>


          {/* SHUTTER */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.88,
            }}
            onClick={capture}
            disabled={!cameraReady || capturing}
            className="
              relative
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border-[3px]
              border-[#292522]
              bg-[#E8A6A6]
              shadow-[0_6px_0_#292522]
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {/* Inner ring */}

            <span
              className="
                absolute
                inset-2
                rounded-full
                border
                border-[#292522]/30
              "
            />

            <TiCamera className="relative z-10 text-4xl" />

          </motion.button>


          {/* Right */}

          <div className="text-right font-mono text-[9px] leading-5 text-[#756E67]">

            <div>PORTRAIT</div>

            <div>
              {cameraReady ? "READY" : "WAIT"}
            </div>

          </div>

        </div>

      </motion.div>


      {/* --------------------------------
          SHUTTER ANIMATION
      -------------------------------- */}

     


      {/* --------------------------------
          CANVAS
      -------------------------------- */}

      <canvas
        ref={canvasRef}
        className="hidden"
      />

    </section>
  );
}