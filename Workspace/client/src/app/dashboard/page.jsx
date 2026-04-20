"use client"
import Calculator from '@/components/Calculator'
import PlayfulTodolist from '@/components/PlayfulTodolist'
import Profile from '@/components/Profile'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from 'react'
import KanbanBoard from '@/components/KanbanBoard';
import MusicPlayer from '@/components/MusicPlayer';
import LiveSports from '@/components/LiveSports';
import Pomodoro from '@/components/Pomodoro';
import QuickAI from '@/components/QuickAi';

const page = () => {
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/auth/login");
  }
}, [router]);

  return (
    <div className="h-screen w-full p-3 bg-zinc-900">

      {/* MAIN WRAPPER */}
      <div className="flex flex-col lg:flex-row gap-3 h-full">

        {/* LEFT PANEL */}
        <div className="w-full lg:w-1/4 flex flex-col gap-3 h-full">

          {/* FIXED HEIGHT TOP WIDGET */}
          <div className="h-48 rounded-xl overflow-hidden shadow">
            <Calculator />
          </div>

          {/* REST TAKES REMAINING SPACE */}
          <div className="flex-1 rounded-xl overflow-hidden shadow">
            <PlayfulTodolist />
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 h-full">

          <div className="h-35 flex gap-2 text-white">

            <div className="flex-1 bg-zinc-800 rounded-xl flex items-center justify-center">
              <MusicPlayer></MusicPlayer>
            </div>

            <div className="flex-1 bg-zinc-800 rounded-xl flex items-center justify-center">
              <Profile></Profile>
            </div>

            <div className="flex-1 bg-zinc-800 rounded-xl flex items-center justify-center">
              <LiveSports></LiveSports>
            </div>

          </div>

          {/* MAIN CONTENT (fills remaining height) */}
          <div className="flex-1 bg-zinc-800 text-white rounded-xl overflow-hidden">
            <KanbanBoard></KanbanBoard>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/4 flex flex-col gap-3 h-full">

          {/* FIXED HEIGHT (same as calculator) */}
          <div className="h-48 bg-zinc-800 rounded-xl shadow flex items-center justify-center text-white">
            <Pomodoro></Pomodoro>
          </div>

          {/* REST FILLS HEIGHT */}
          <div className="flex-1 bg-zinc-800 rounded-xl overflow-hidden shadow text-white">
            <QuickAI />
          </div>

        </div>

      </div>
    </div>
  )
}

export default page