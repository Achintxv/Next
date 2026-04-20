"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getTasks } from "@/services/taskService";
import { getIdeas } from "@/services/ideaService";

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

  fetchStats(); // initial load

  // 🔁 auto refresh every 5 seconds
  interval = setInterval(fetchStats, 5000);

  return () => clearInterval(interval);
}, []);

  const initial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 text-white">

      {/* TOP */}
      <div className="flex justify-between items-start">
        <p className="text-sm text-zinc-400">Welcome</p>

        <button
          onClick={handleLogout}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 transition rounded-lg text-xs font-medium"
        >
          Logout
        </button>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center gap-2 mt-2">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold">
          {initial}
        </div>

        {/* Email */}
        <p className="text-xs text-zinc-400 text-center break-all">
          {user?.email || "user@email.com"}
        </p>

        {/* Stats */}
        <div className="flex gap-3 text-xs text-zinc-300 mt-1">
          <span>Tasks: {stats.tasks}</span>
          <span>Ideas: {stats.ideas}</span>
        </div>

      </div>

      {/* BOTTOM (optional space for future features) */}
      <div />
    </div>
  );
};

export default Profile;