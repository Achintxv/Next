"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaPause, FaPlay, FaRotateRight } from "react-icons/fa6";

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
    <div className="relative h-full w-full bg-zinc-800 text-white overflow-hidden">
      {/* =====================================================
      HEADER
  ====================================================== */}

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-5">
        {/* TOP LEFT */}

        <div className="text-sm font-semibold text-zinc-200">Focus</div>

        {/* TOP RIGHT */}

        <div className="text-xs font-medium text-zinc-500">{minutes} min</div>
      </div>

      {/* =====================================================
      CENTER TIMER
      ONLY APPEARS AFTER START
  ====================================================== */}

      {hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* CIRCLE */}

            <svg
              width="170"
              height="170"
              viewBox="0 0 170 170"
              className="-rotate-90"
            >
              {/* Background ring */}

              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-zinc-700"
              />

              {/* Progress ring */}

              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                className="
              text-green-500
              transition-all
              duration-1000
              ease-linear
            "
              />
            </svg>

            {/* CENTER CONTENT */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`
              text-3xl
              leading-none
              mb-2
              transition-transform
              duration-500
              ${isRunning ? "scale-110" : ""}
            `}
              >
                {completed ? "🌿" : "🌱"}
              </div>

              <div className="text-2xl font-semibold tracking-tight tabular-nums">
                {formatTime(secondsLeft)}
              </div>

              <div className="mt-1 text-[10px] text-zinc-500">{status}</div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
BOTTOM CONTROLS
====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-5 pb-5">
        {/* PLAY / PAUSE / RESTART + RESET */}

        <div className="flex items-center gap-2">
          {/* =================================================
    MAIN ACTION BUTTON
================================================== */}

          <button
            onClick={() => {
              if (completed) {
                startTimer();
                return;
              }

              toggleTimer();
            }}
            className="
    h-10
    min-w-[90px]
    px-4
    rounded-full
    bg-white
    text-zinc-900
    flex
    items-center
    justify-center
    gap-2
    text-xs
    font-medium
    hover:bg-zinc-200
    active:scale-95
    transition
  "
          >
            {/* NOT STARTED */}

            {!hasStarted && !completed && (
              <>
                <FaPlay className="text-[10px]" />
                Start
              </>
            )}

            {/* RUNNING */}

            {hasStarted && isRunning && !completed && (
              <>
                <FaPause className="text-[10px]" />
                Pause
              </>
            )}

            {/* PAUSED */}

            {hasStarted && !isRunning && !completed && (
              <>
                <FaPlay className="text-[10px]" />
                Resume
              </>
            )}

            {/* COMPLETED */}

            {completed && (
              <>
                <FaRotateRight className="text-[10px]" />
                Restart
              </>
            )}
          </button>

          {/* =================================================
    RESET BUTTON

    Only visible when:
    - Paused
    - Completed
================================================== */}

          {hasStarted && !isRunning && (
            <button
              onClick={resetTimer}
              className="
      h-10
      w-10
      rounded-full
      bg-zinc-700
      text-zinc-300
      flex
      items-center
      justify-center
      hover:bg-zinc-600
      hover:text-white
      active:scale-95
      transition
    "
              aria-label="Reset timer"
            >
              <FaRotateRight className="text-xs" />
            </button>
          )}
        </div>

        {/* =================================================
DURATION

```
  Only visible before starting
```

================================================== */}

        {!hasStarted && (
          <div className="w-full max-w-[260px] mt-3">
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-700/50 px-3 py-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Duration
                </span>

                <span className="text-xs font-medium text-zinc-300">
                  {minutes} min
                </span>
              </div>

              <input
                type="range"
                min={MIN_MINUTES}
                max={MAX_MINUTES}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="
        w-full
        h-1
        accent-green-500
        cursor-pointer
      "
              />

              <div className="flex justify-between mt-1 text-[9px] text-zinc-600">
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
