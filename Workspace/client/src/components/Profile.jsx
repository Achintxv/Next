"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getTasks } from "@/services/taskService";
import { getIdeas } from "@/services/ideaService";
import { LuCheck, LuLightbulb, LuLogOut, LuUser } from "react-icons/lu";

const Profile = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [stats, setStats] = useState({
    tasks: 0,
    ideas: 0,
  });

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    let interval;

    const fetchStats = async () => {
      try {
        const [tasksRes, ideasRes] = await Promise.all([
          getTasks(),
          getIdeas(),
        ]);

        setStats({
          tasks: tasksRes.data.length,
          ideas: ideasRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();

    interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-[#FFFDF9] p-5 text-[#29251F] shadow-[0_18px_50px_rgba(80,60,30,0.08)]">
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-100/40 blur-3xl" />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative  flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
            <LuUser className="text-sm" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8F867D]">
            Profile
          </span>
        </div>

        {/* Online indicator */}

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
            Online
          </span>
        </div>
      </div>

      {/* =====================================================
          USER
      ====================================================== */}

      <div className="relative  my-auto flex flex-col items-center py-6">
        {/* Avatar */}

        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-xl font-bold text-white shadow-[0_10px_25px_rgba(249,115,22,0.22)]">
            {initial}
          </div>

          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-[#FFFDF9] bg-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>

        {/* Name */}

        <h2 className="mt-4 text-base font-bold tracking-tight text-[#29251F]">
          {user?.name || "Achint"}
        </h2>

        {/* Email */}

        <p className="mt-1 max-w-full break-all rounded-lg bg-[#F7F3ED] px-3 py-1.5 text-[10px] font-medium text-[#8E857C]">
          {user?.email || "user@gmail.com"}
        </p>
      </div>

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="relative  grid grid-cols-2 gap-2.5">
        {/* Tasks */}

        <div className="rounded-2xl border border-black/[0.05] bg-[#FAF7F2] p-3">
          <div className="flex items-center justify-between">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <LuCheck className="text-sm" />
            </div>

            <span className="text-lg font-bold text-[#29251F]">
              {stats.tasks}
            </span>
          </div>

          <p className="mt-2 text-[10px] font-semibold text-[#91887F]">Tasks</p>
        </div>

        {/* Ideas */}

        <div className="rounded-2xl border border-black/[0.05] bg-[#FAF7F2] p-3">
          <div className="flex items-center justify-between">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <LuLightbulb className="text-sm" />
            </div>

            <span className="text-lg font-bold text-[#29251F]">
              {stats.ideas}
            </span>
          </div>

          <p className="mt-2 text-[10px] font-semibold text-[#91887F]">Ideas</p>
        </div>
      </div>

      {/* =====================================================
          LOGOUT
      ====================================================== */}

      <button
        onClick={handleLogout}
        className="relative mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-2.5 text-xs font-semibold text-red-500 transition-all duration-200 hover:border-red-200 hover:bg-red-100 active:scale-[0.98]"
      >
        <LuLogOut className="text-sm" />
        Logout
      </button>
    </div>
  );
};

export default Profile;
