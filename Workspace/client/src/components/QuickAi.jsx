"use client";

import React, { useState } from "react";
import { askAI } from "@/services/aiService";

export default function QuickAI() {
  const [type, setType] = useState("ask");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await askAI({ type, input });
      setOutput(res.data.result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden border border-black/[0.06] bg-[#FFFDF9] p-4 text-[#29251F] shadow-[0_18px_50px_rgba(80,60,30,0.08)] select-none">
      {/* =====================================================
        SUBTLE AMBIENT GLOW
    ====================================================== */}

      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-300/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-orange-200/15 blur-3xl" />

      {/* =====================================================
        HEADER
    ====================================================== */}

      <div className="relative z-10 mb-3 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
            <span className="text-sm">✦</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-[#29251F]">
                Quick AI
              </h2>

              <span className="rounded-full border border-purple-100 bg-purple-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-purple-500">
                Assistant
              </span>
            </div>

            <p className="mt-0.5 text-[10px] text-[#A49A8E]">
              Your quick thinking companion
            </p>
          </div>
        </div>

        {/* MODE SELECTOR */}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="max-w-[125px] cursor-pointer rounded-xl border border-black/[0.06] bg-white px-2.5 py-2 text-[10px] font-medium text-[#756D64] shadow-sm outline-none transition-all duration-200 hover:border-purple-100 focus:border-purple-200 focus:ring-2 focus:ring-purple-100"
        >
          <option value="ask">Ask anything</option>

          <option value="summarize">Summarize</option>

          <option value="grammar">Grammar</option>

          <option value="decision">Yes / No</option>

          <option value="sentiment">Sentiment</option>

          <option value="email">Email</option>
        </select>
      </div>

      {/* =====================================================
        INPUT
    ====================================================== */}

      <div className="relative z-10 shrink-0">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like help with?"
            rows={4}
            className="w-full resize-none rounded-2xl border border-black/[0.06] bg-white p-3.5 pr-3 text-xs font-medium leading-relaxed text-[#403A34] shadow-[0_3px_12px_rgba(80,60,30,0.03)] outline-none transition-all duration-200 placeholder:text-[#B0A79B] focus:border-purple-200 focus:shadow-[0_6px_20px_rgba(124,58,237,0.07)]"
          />

          {/* CHARACTER / INPUT INDICATOR */}

          <div className="pointer-events-none absolute bottom-2.5 right-3 text-[9px] text-[#B5ACA1]">
            {input.length > 0 ? `${input.length} chars` : ""}
          </div>
        </div>
      </div>

      {/* =====================================================
        GENERATE BUTTON
    ====================================================== */}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="relative z-10 my-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#29251F] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(41,37,31,0.14)] transition-all duration-200 hover:bg-purple-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Thinking...
          </>
        ) : (
          <>
            <span className="text-sm">✦</span>
            Generate
          </>
        )}
      </button>

      {/* =====================================================
        OUTPUT
    ====================================================== */}

      <div className="relative z-10 min-h-[80px] min-w-0 flex-1 overflow-y-auto rounded-2xl border border-black/[0.06] bg-[#F7F4EF] p-3.5 shadow-inner custom-scrollbar">
        {/* OUTPUT HEADER */}

        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-white text-purple-500 shadow-sm">
            ✦
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9A9186]">
            Result
          </span>
        </div>

        {/* RESULT */}

        {output ? (
          <p className="whitespace-pre-wrap break-words text-xs leading-relaxed text-[#403A34]">
            {output}
          </p>
        ) : (
          <div className="flex min-h-[70px] items-center justify-center text-center">
            <div>
              <p className="text-[11px] font-medium text-[#948B80]">
                Your result will appear here
              </p>

              <p className="mt-1 text-[9px] text-[#B0A79B]">
                Ask, summarize, rewrite, or analyze something above.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
        FOOTER
    ====================================================== */}

      <div className="relative z-10 mt-2 flex shrink-0 items-center justify-between">
        <span className="text-[9px] text-[#AAA095]">Quick AI</span>

        <span className="flex items-center gap-1.5 text-[9px] text-[#AAA095]">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          Ready
        </span>
      </div>
    </div>
  );
}
