"use client";

import React, { useEffect, useState } from "react";
import { LuRadio, LuRefreshCw, LuTrophy } from "react-icons/lu";
import { getCricketLive } from "@/services/sportsService";

export default function LiveCricket() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getCricketLive();
      setMatches(res.data.data || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-black/[0.06] bg-[#FFFDF9] p-4 text-[#29251F] shadow-[0_18px_50px_rgba(80,60,30,0.08)] select-none">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
            <LuTrophy size={17} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-[#29251F]">
                Live Cricket
              </h2>

              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            </div>

            <p className="mt-0.5 text-[10px] text-[#A49A8E]">
              Live scores & match updates
            </p>
          </div>
        </div>

        {/* LIVE + REFRESH */}

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-bold tracking-wider text-emerald-600">
            LIVE
          </span>

          <button
            onClick={fetchData}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#9A9186] transition-all hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            title="Refresh matches"
          >
            <LuRefreshCw size={12} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* =====================================================
          MATCHES
      ====================================================== */}

      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto py-3 pr-1 custom-scrollbar">
        {/* =================================================
            LOADING
        ================================================== */}

        {loading && matches.length === 0 && (
          <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
              <LuRadio size={19} className="animate-pulse" />
            </div>

            <p className="text-xs font-semibold text-[#5E574F]">
              Fetching live matches
            </p>

            <p className="mt-1 text-[10px] text-[#A49A8E]">
              Checking the latest cricket updates...
            </p>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================== */}

        {!loading && matches.length === 0 && (
          <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F4EF] text-[#AAA095]">
              <LuTrophy size={19} />
            </div>

            <p className="text-xs font-semibold text-[#5E574F]">
              No live matches
            </p>

            <p className="mt-1 max-w-[190px] text-[10px] leading-relaxed text-[#A49A8E]">
              There aren't any live cricket matches right now.
            </p>
          </div>
        )}

        {/* =================================================
            MATCH CARDS
        ================================================== */}

        {!loading &&
          matches.map((match) => (
            <div
              key={match.id}
              className="group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-3.5 transition-all duration-200 hover:border-emerald-100 hover:shadow-[0_6px_20px_rgba(80,60,30,0.06)]"
            >
              {/* LEFT LIVE ACCENT */}

              <div className="absolute bottom-0 left-0 top-0 w-1 bg-emerald-400 opacity-70" />

              {/* MATCH NAME */}

              <div className="pl-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold leading-relaxed text-[#403A34] transition-colors group-hover:text-[#29251F]">
                    {match.name}
                  </p>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-emerald-600">
                    Live
                  </span>
                </div>

                {/* STATUS */}

                <div className="mt-3 flex items-center gap-2 border-t border-black/[0.05] pt-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-emerald-500">
                    <LuRadio size={10} />
                  </span>

                  <span className="text-[10px] font-medium leading-relaxed text-[#8F877D]">
                    {match.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="flex shrink-0 items-center justify-between border-t border-black/[0.06] pt-3">
        <div className="flex items-center gap-1.5 text-[9px] text-[#A49A8E]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Updates every 30 sec
        </div>

        <span className="text-[9px] font-medium text-[#A49A8E]">
          {matches.length} {matches.length === 1 ? "match" : "matches"}
        </span>
      </div>
    </div>
  );
}
