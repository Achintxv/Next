"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function PhotoBoothPrint({ start, onCaptureComplete }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. Initialize Camera Stream on mount
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    setupCamera();
  }, []);

  // 2. Capture function: Draws the current video frame to a canvas, then to an image
  useEffect(() => {
    if (start && !capturedImage) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.videoWidth > 0) {
        const context = canvas.getContext("2d");
        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Convert to URL
        // setCapturedImage(canvas.toDataURL("image/png"));
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);

        // SEND DATA TO PARENT
        if (onCaptureComplete) {
          onCaptureComplete(imageData);
        }
      }
    }
    // Reset image when start is false so it can take a new one
    if (!start) setCapturedImage(null);
  }, [start, capturedImage, onCaptureComplete]);

  return (
    <div className="w-full absolute -mt-15 flex items-center justify-center bg-[#FFF5EC]">
      <video ref={videoRef} autoPlay playsInline className="hidden" />
      <canvas ref={canvasRef} className="hidden" />

      {/* SLOT */}
      <div className="relative w-89 h-20 bg-black rounded-md flex items-center justify-center shadow-lg">
        {/* SLOT GAP */}
        <div className="absolute w-3/4 h-[6px] bg-gray-800 rounded-full z-20" />

        {/* MASK (top half hidden) */}
        <div className="absolute top-0 w-full h-1/2 bg-black z-10" />

        {/* PHOTO STRIP */}
        <motion.div
          initial={{ y: 0, rotate: 0 }}
          animate={
            start
              ? {
                  y: [-180, 40, 300], // slow print → then fall
                  rotate: [0, 0, 0],
                }
              : { y: -180, rotate: 0 }
          }
          transition={
            start
              ? {
                  duration: 3, // longer overall
                  times: [0, 0.65, 1], // MOST time spent printing
                  ease: ["linear", [0.22, 1, 0.36, 1]], // linear → gravity
                }
              : { duration: 0 }
          }
          className="absolute top-1/2 -translate-y-[6px] w-[120px] h-[180px] bg-white shadow-xl border border-gray-300"
        >
          {/* Photo content */}
          <div className="flex flex-col gap-2 p-2">
            <div className="w-full h-32 bg-gray-500">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover grayscale" // Grayscale for that "print" look
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-400">
                  PROCESSSING...
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
