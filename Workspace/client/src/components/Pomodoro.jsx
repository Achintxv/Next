"use client";

import React, { useState, useEffect } from "react";
import { FaRegCirclePause } from "react-icons/fa6";
import { GrResume } from "react-icons/gr";
import { GrPowerReset } from "react-icons/gr";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const totalSeconds = minutes * 60;

  // ▶ Start timer
  const startTimer = () => {
    setSecondsLeft(minutes * 60);
    setIsRunning(true);
  };

  // ⏸ Pause / ▶ Resume
  const togglePause = () => {
    setIsRunning((prev) => !prev);
  };

  // 🔄 Reset (proper)
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(0); // go back to idle state
  };

  // ⏳ Countdown logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // ⭕ Progress calculation
  const progress =
    secondsLeft === 0
      ? 0
      : ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  // ⏱ Format time
  const formatTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-zinc-800 rounded-xl text-white relative">

      {/* 🔹 Idle State */}
      {!isRunning && secondsLeft === 0 && (
        <div className="flex flex-col items-center gap-2">

          <h2 className="text-lg text-zinc-400">Pomodoro</h2>

          {/* ⏱ Time Selector */}
          <input
            type="range"
            min={15}
            max={60}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-40"
          />

          <p className="text-lg">{minutes} min</p>

          {/* ▶ Start */}
          <button
            onClick={startTimer}
            className="px-4 py-1 bg-green-600 rounded-full hover:bg-green-700 transition"
          >
            Start
          </button>
        </div>
      )}

      {/* 🔹 Running / Paused State */}
      {(isRunning || secondsLeft > 0) && (
        <div className="flex flex-col items-center">

          {/* ⭕ Circle */}
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 rotate-[-90deg]">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#3f3f46"
                strokeWidth="6"
                fill="none"
              />

              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#22c55e"
                strokeWidth="6"
                fill="none"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * progress) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            {/* 🌱 Plant + Time */}
            <div className="absolute flex flex-col items-center justify-center text-4xl gap-2">
              <div>🌱</div>
              <div className="text-sm">{formatTime()}</div>

              <div className="flex gap-2">
                <button
              onClick={togglePause}
              className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-xs"
            >
              {isRunning? <FaRegCirclePause /> : <GrResume />}
            </button>

            {/* Reset */}
            <button
              onClick={resetTimer}
              className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-xs"
            >
              <GrPowerReset />
            </button>
              </div>
            </div>
          </div>

          {/* 🎮 Controls */}
          {/* <div className="flex gap-2">

            <button
              onClick={togglePause}
              className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-xs"
            >
              {isRunning? <FaRegCirclePause /> : <GrResume />}
            </button>

            <button
              onClick={resetTimer}
              className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-xs"
            >
              <GrPowerReset />
            </button>

          </div> */}
        </div>
      )}
    </div>
  );
}