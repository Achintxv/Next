"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Calculator from "@/components/Calculator";
import PlayfulTodolist from "@/components/PlayfulTodolist";
import Profile from "@/components/Profile";
import KanbanBoard from "@/components/KanbanBoard";
import LiveSports from "@/components/LiveSports";
import Pomodoro from "@/components/Pomodoro";
import QuickAI from "@/components/QuickAi";

import { useAuthStore } from "@/store/authStore";

import {
  LuListTodo,
  LuLightbulb,
  LuLayoutDashboard,
  LuTimer,
  LuCalculator,
  LuSparkles,
  LuLogOut,
  LuChevronDown,
} from "react-icons/lu";

import { MdOutlineSportsCricket } from "react-icons/md";

export default function Page() {
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  /* =====================================================
     AUTH
  ====================================================== */

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  /* =====================================================
     CLOSE PROFILE WHEN CLICKING OUTSIDE
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  /* =====================================================
     TOOL CONTROLS
  ====================================================== */

  const openTool = (tool) => {
    setProfileOpen(false);
    setActiveTool(tool);
  };

  const closeTool = () => {
    setActiveTool(null);
  };

  /* =====================================================
     PROFILE
  ====================================================== */

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  /* =====================================================
     USER DATA
     Comes from authStore → backend authenticated user
  ====================================================== */

  const email = user?.email || "user@gmail.com";

  const name =
    user?.name ||
    user?.username ||
    email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAF8F4] font-sans text-[#24211D]">
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[120px]" />

        <div className="absolute right-[-180px] top-[35%] h-[500px] w-[500px] rounded-full bg-amber-100/50 blur-[130px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-rose-100/40 blur-[130px]" />
      </div>

      {/* =====================================================
          MAIN APP SHELL
      ====================================================== */}

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* ===================================================
            TOP HEADER
        ==================================================== */}

        <header className="relative z-[100] flex h-[68px] shrink-0 items-center justify-between border-b border-black/[0.06] bg-white/70 px-5 backdrop-blur-xl md:px-7">
          {/* =================================================
              BRAND
          ================================================== */}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-sm">
              <LuLayoutDashboard className="text-lg" />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-tight text-[#29251F]">
                Kanto
              </h1>

              <p className="text-[10px] font-medium text-[#989088]">
                Your personal productivity space
              </p>
            </div>
          </div>

          {/* =================================================
              USER PROFILE
          ================================================== */}

          <div ref={profileRef} className="relative">
            {/* Profile Trigger */}

            <button
              onClick={toggleProfile}
              className="group flex items-center gap-3 rounded-xl border border-black/[0.06] bg-[#F7F5F1] px-3 py-1.5 transition-all duration-200 hover:border-orange-200 hover:bg-white hover:shadow-sm"
            >
              {/* Avatar */}

              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-sm font-bold text-white shadow-sm">
                {initial}

                {/* Online */}

                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#F7F5F1] bg-emerald-500" />
              </div>

              {/* User Info */}

              <div className="hidden text-left sm:block">
                <p className="max-w-[140px] truncate text-xs font-bold leading-tight text-[#29251F]">
                  {name}
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-[#989088]">
                  Personal workspace
                </p>
              </div>

              {/* Chevron */}

              <LuChevronDown
                className={`ml-1 text-sm text-[#A39A91] transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* =================================================
                PROFILE DROPDOWN
            ================================================== */}

            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-[9999] w-[320px] origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                <Profile />
              </div>
            )}
          </div>
        </header>

        {/* =====================================================
            CONTENT AREA
        ====================================================== */}

        <div className="flex min-h-0 flex-1">
          {/* ===================================================
              SIDEBAR
          ==================================================== */}

          <aside className="hidden w-[250px] shrink-0 border-r border-black/[0.06] bg-white/55 p-4 backdrop-blur-xl lg:flex lg:flex-col">
            {/* Workspace */}

            <div className="mb-6">
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A39B91]">
                Workspace
              </p>

              <SidebarButton
                icon={<LuLightbulb />}
                label="Ideas"
                active={activeTool === null}
                onClick={() => closeTool()}
              />

              <SidebarButton
                icon={<LuListTodo />}
                label="Task"
                onClick={() => openTool("todo")}
              />
            </div>

            {/* Utilities */}

            <div>
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A39B91]">
                Utilities
              </p>

              <SidebarButton
                icon={<LuTimer />}
                label="Focus"
                onClick={() => openTool("pomodoro")}
              />

              <SidebarButton
                icon={<MdOutlineSportsCricket />}
                label="Cricket"
                onClick={() => openTool("sports")}
              />

              <SidebarButton
                icon={<LuCalculator />}
                label="Calculator"
                onClick={() => openTool("calculator")}
              />

              <SidebarButton
                icon={<LuSparkles />}
                label="Quick AI"
                onClick={() => openTool("ai")}
              />
            </div>

            {/* Bottom */}

            <div className="mt-auto">
              <div className="mb-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-4">
                <p className="text-xs font-semibold text-orange-800">
                  Stay focused ✨
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-orange-700/70">
                  Small progress every day adds up to something big.
                </p>
              </div>

              <button
                onClick={() => {
                  logout();
                  router.replace("/auth/login");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-[#8F8981] transition hover:bg-red-50 hover:text-red-500"
              >
                <LuLogOut className="text-base" />
                Logout
              </button>
            </div>
          </aside>

          {/* ===================================================
              MAIN WORKSPACE
          ==================================================== */}

          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1600px]">
              <section className="z-0 h-[650px] overflow-hidden border border-black/[0.06] bg-white/90 shadow-[0_12px_40px_rgba(80,60,30,0.06)]">
                <div className="h-full overflow-hidden">
                  <KanbanBoard />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* =====================================================
          TOOL OVERLAY
      ====================================================== */}

      {activeTool && <ToolOverlay tool={activeTool} onClose={closeTool} />}
    </div>
  );
}

/* =========================================================
   SIDEBAR BUTTON
========================================================= */

function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all ${
        active
          ? "bg-orange-50 text-orange-600"
          : "text-[#777067] hover:bg-[#F7F4EF] hover:text-[#29251F]"
      }`}
    >
      <span
        className={`text-lg transition ${
          active
            ? "text-orange-500"
            : "text-[#A39B91] group-hover:text-orange-500"
        }`}
      >
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}

/* =========================================================
   TOOL OVERLAY
========================================================= */

function ToolOverlay({ tool, onClose }) {
  const tools = {
    todo: {
      title: "Today's Tasks",
      component: <PlayfulTodolist />,
    },

    calculator: {
      title: "Calculator",
      component: <Calculator />,
    },

    sports: {
      title: "Live Cricket",
      component: <LiveSports />,
    },

    pomodoro: {
      title: "Focus Session",
      component: <Pomodoro />,
    },

    ai: {
      title: "Quick AI",
      component: <QuickAI />,
    },
  };

  const selected = tools[tool];

  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#29251F]/20 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-[#FFFDF9] shadow-[0_30px_100px_rgba(50,40,20,0.18)]"
      >
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-500">
              Utility
            </p>

            <h2 className="mt-0.5 text-lg font-bold text-[#29251F]">
              {selected.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8E877F] transition hover:bg-black/[0.04] hover:text-[#29251F]"
          >
            ×
          </button>
        </div>

        {/* Content */}

        <div className="min-h-0 flex-1 overflow-auto custom-scrollbar">
          {selected.component}
        </div>
      </div>
    </div>
  );
}
