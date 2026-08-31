"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Calculator from "@/components/Calculator";
import PlayfulTodolist from "@/components/PlayfulTodolist";
import Profile from "@/components/Profile";
import KanbanBoard from "@/components/KanbanBoard";
import MusicPlayer from "@/components/MusicPlayer";
import LiveSports from "@/components/LiveSports";
import Pomodoro from "@/components/Pomodoro";
import QuickAI from "@/components/QuickAi";
import { LuListTodo } from "react-icons/lu";
import { MdCalculate } from "react-icons/md";
import { IoMusicalNotes } from "react-icons/io5";
import { MdOutlineSportsCricket } from "react-icons/md";
import { TbPlant } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";

const widgets = [
{
id: "todo",
label: <LuListTodo />,
component: <PlayfulTodolist />,
},
{
id: "calculator",
label: <MdCalculate />,
component: <Calculator />,
},
{
id: "music",
label: <IoMusicalNotes />,
component: <MusicPlayer />,
},
{
id: "sports",
label: <MdOutlineSportsCricket />,
component: <LiveSports />,
},
{
id: "pomodoro",
label: <TbPlant />,
component: <Pomodoro />,
},
{
id: "ai",
label: <GiArtificialIntelligence />,
component: <QuickAI />,
},
];

export default function Page() {
const router = useRouter();
const [activeWidget, setActiveWidget] = useState("todo");

useEffect(() => {
const token = localStorage.getItem("token");

if (!token) {
  router.replace("/auth/login");
}

}, [router]);

const selectedWidget = widgets.find(
(widget) => widget.id === activeWidget
);

return ( <div className="h-screen w-full p-3 bg-zinc-900 overflow-hidden">

  {/* MAIN 30 / 70 WORKSPACE */}
  <div className="flex h-full gap-3">

    {/* =====================================================
        LEFT 30%
    ====================================================== */}
    <aside className="w-[25%] min-w-0 h-full flex flex-col gap-3">

      {/* PROFILE - FIXED TOP */}
      <div className="shrink-0 h-40 rounded-xl overflow-hidden bg-zinc-800 shadow">
        <Profile />
      </div>

      {/* WIDGET AREA */}
      <div className="flex-1 min-h-0 rounded-xl bg-zinc-800 overflow-hidden shadow flex flex-col">

        {/* WIDGET BUTTONS */}
        <div className="shrink-0 p-2 border-b border-zinc-700">
          <div className="grid grid-cols-6 gap-1">

            {widgets.map((widget) => (
              <button
                key={widget.id}
                onClick={() => setActiveWidget(widget.id)}
                className={`
                  h-9 rounded-lg text-2xl flex items-center justify-center font-medium
                  transition-all duration-200
                  ${
                    activeWidget === widget.id
                      ? "bg-white text-zinc-900"
                      : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white"
                  }
                `}
              >
                {widget.label}
              </button>
            ))}

          </div>
        </div>

        {/* ACTIVE WIDGET */}
        <div className="flex-1 min-h-0 overflow-auto">
          {selectedWidget?.component}
        </div>

      </div>
    </aside>


    {/* =====================================================
        RIGHT 70% - KANBAN
    ====================================================== */}
    <main className="w-[85%] min-w-0 h-full rounded-xl bg-zinc-800 overflow-hidden shadow">

      <KanbanBoard />

    </main>

  </div>
</div>

);
}
