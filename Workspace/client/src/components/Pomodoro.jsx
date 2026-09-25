"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaPause, FaPlay, FaRotateRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const MIN_MINUTES = 15;
const MAX_MINUTES = 60;

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalSeconds = minutes * 60;

  /* -----------------------------
START
----------------------------- */

  const startTimer = () => {
    setSecondsLeft(minutes * 60);
    setIsRunning(true);
    setHasStarted(true);
    setCompleted(false);
  };

  /* -----------------------------
PLAY / PAUSE
----------------------------- */

  const toggleTimer = () => {
    if (!hasStarted) {
      startTimer();
      return;
    }

    setIsRunning((prev) => !prev);
  };

  /* -----------------------------
RESET
----------------------------- */

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(0);
    setHasStarted(false);
    setCompleted(false);
  };

  /* -----------------------------
COUNTDOWN
----------------------------- */

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setCompleted(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  /* -----------------------------
PROGRESS
----------------------------- */

  const progress = useMemo(() => {
    if (!hasStarted || totalSeconds === 0) {
      return 0;
    }

    return ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  }, [secondsLeft, totalSeconds, hasStarted]);

  /* -----------------------------
CIRCLE
----------------------------- */

  const radius = 68;
  const circumference = 2 * Math.PI * radius;

  const strokeOffset = circumference - (progress / 100) * circumference;

  /* -----------------------------
FORMAT TIME
----------------------------- */

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* -----------------------------
STATUS
----------------------------- */

  const status = completed ? "Complete" : isRunning ? "Focus time" : "Paused";

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden border border-black/[0.06] bg-[#FFFDF9] p-5 text-[#29251F] shadow-[0_18px_50px_rgba(80,60,30,0.08)] select-none">
      {/* =====================================================
        HEADER
    ====================================================== */}

      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <span className="text-base">🌿</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-[#29251F]">
                Focus Session
              </h2>

              {hasStarted && (
                <span className="rounded-full bg-[#F7F4EF] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#8A8177]">
                  Active
                </span>
              )}
            </div>

            <p className="mt-0.5 text-[10px] text-[#A49A8E]">
              {completed
                ? "Nice work. You finished your session."
                : isRunning
                  ? "Stay focused and keep going."
                  : hasStarted
                    ? "Take a breath. Resume when ready."
                    : "A little focus goes a long way."}
            </p>
          </div>
        </div>

        {/* DURATION */}

        <div className="rounded-full border border-black/[0.06] bg-[#F7F4EF] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#756D64]">
          {minutes} min
        </div>
      </div>

      {/* =====================================================
        CENTER TIMER
    ====================================================== */}

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {/* AMBIENT GLOW */}

        {hasStarted && isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute h-48 w-48 rounded-full bg-orange-300/20 blur-3xl"
          />
        )}

        {hasStarted ? (
          <div className="relative flex items-center justify-center">
            {/* =================================================
              PROGRESS RING
          ================================================= */}

            <svg
              width="190"
              height="190"
              viewBox="0 0 170 170"
              className="-rotate-90"
            >
              {/* BACKGROUND RING */}

              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-[#EEE9E1]"
              />

              {/* PROGRESS */}

              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                className="text-orange-400 transition-all duration-1000 ease-linear"
              />
            </svg>

            {/* =================================================
              CENTER CONTENT
          ================================================= */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* PLANT */}

              <motion.div
                animate={
                  isRunning
                    ? {
                        scale: [1, 1.08, 1],
                      }
                    : {
                        scale: 1,
                      }
                }
                transition={
                  isRunning
                    ? {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {}
                }
                className="mb-2 text-3xl"
              >
                {completed ? "🌿" : "🌱"}
              </motion.div>

              {/* TIME */}

              <div
                className={`font-mono text-3xl font-medium tracking-tight text-[#29251F] transition-all duration-500 ${
                  isRunning ? "scale-[1.03]" : ""
                }`}
              >
                {formatTime(secondsLeft)}
              </div>

              {/* STATUS */}

              <div className="mt-1.5 rounded-full bg-[#F7F4EF] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8A8177]">
                {status}
              </div>
            </div>
          </div>
        ) : (
          /* =================================================
           IDLE STATE
        ================================================== */

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex max-w-[220px] flex-col items-center justify-center text-center"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-50 text-3xl"
            >
              🌱
            </motion.div>

            <p className="text-sm font-bold text-[#403A34]">Ready to focus?</p>

            <p className="mt-1.5 text-[11px] leading-relaxed text-[#A49A8E]">
              Choose your session length below and give yourself some
              uninterrupted focus time.
            </p>
          </motion.div>
        )}
      </div>

      {/* =====================================================
        BOTTOM CONTROLS
    ====================================================== */}

      <div className="flex w-full shrink-0 flex-col items-center">
        {/* =================================================
          MAIN ACTIONS
      ================================================== */}

        <div className="flex items-center gap-2">
          {/* MAIN BUTTON */}

          <button
            onClick={() => {
              if (completed) {
                startTimer();
                return;
              }

              toggleTimer();
            }}
            className="flex h-10 min-w-[112px] items-center justify-center gap-2 rounded-xl bg-[#29251F] px-5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(41,37,31,0.16)] transition-all duration-200 hover:bg-orange-500 active:scale-95"
          >
            {!hasStarted && !completed && (
              <>
                <FaPlay className="text-[9px]" />
                Start Focus
              </>
            )}

            {hasStarted && isRunning && !completed && (
              <>
                <FaPause className="text-[9px]" />
                Pause
              </>
            )}

            {hasStarted && !isRunning && !completed && (
              <>
                <FaPlay className="text-[9px]" />
                Resume
              </>
            )}

            {completed && (
              <>
                <FaRotateRight className="text-[10px]" />
                Restart
              </>
            )}
          </button>

          {/* RESET */}

          {hasStarted && !isRunning && (
            <button
              onClick={resetTimer}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-[#81786E] transition-all duration-200 hover:border-orange-100 hover:bg-orange-50 hover:text-orange-500 active:scale-95"
              aria-label="Reset timer"
              title="Reset Timer"
            >
              <FaRotateRight className="text-xs" />
            </button>
          )}
        </div>

        {/* =================================================
          DURATION SLIDER
      ================================================== */}

        {!hasStarted && (
          <div className="mt-4 w-full max-w-[270px]">
            <div className="rounded-2xl border border-black/[0.06] bg-[#F7F4EF] px-4 py-3">
              {/* SLIDER HEADER */}

              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#948B80]">
                  Session Duration
                </span>

                <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-orange-500 shadow-sm">
                  {minutes} min
                </span>
              </div>

              {/* SLIDER */}

              <input
                type="range"
                min={MIN_MINUTES}
                max={MAX_MINUTES}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#DDD6CC] accent-orange-400 focus:outline-none"
              />

              {/* RANGE */}

              <div className="mt-1.5 flex justify-between font-mono text-[9px] text-[#AAA095]">
                <span>{MIN_MINUTES}m</span>

                <span>{MAX_MINUTES}m</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
