"use client";

import { useEffect, useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const buttons = [
    "AC",
    "⌫",
    "%",
    "÷",

    "7",
    "8",
    "9",
    "×",

    "4",
    "5",
    "6",
    "−",

    "1",
    "2",
    "3",
    "+",

    "0",
    ".",
    "=",
  ];

  const operators = ["+", "−", "×", "÷"];

  const calculate = (expression) => {
    try {
      if (!expression) return "";

      const sanitized = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/%/g, "/100");

      // Only allow calculator characters
      if (!/^[0-9+\-*/.()\s]+$/.test(sanitized)) {
        return "Error";
      }

      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${sanitized})`)();

      if (!Number.isFinite(value)) return "Error";

      return String(
        Number.isInteger(value) ? value : Number(value.toFixed(10)),
      );
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    // Clear
    if (value === "AC") {
      setInput("");
      setResult("");
      return;
    }

    // Backspace
    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    // Equals
    if (value === "=") {
      const calculated = calculate(input);

      if (calculated === "Error") {
        setResult("Error");
      } else {
        setResult(calculated);
      }

      return;
    }

    // Operator handling
    if (operators.includes(value)) {
      setInput((prev) => {
        if (!prev) return "";

        const lastCharacter = prev.slice(-1);

        if (operators.includes(lastCharacter)) {
          return prev.slice(0, -1) + value;
        }

        return prev + value;
      });

      return;
    }

    // Decimal handling
    if (value === ".") {
      const parts = input.split(/[+\-×÷]/);
      const currentNumber = parts[parts.length - 1];

      if (currentNumber.includes(".")) return;

      if (!currentNumber) {
        setInput((prev) => prev + "0.");
        return;
      }
    }

    // Percentage
    if (value === "%") {
      if (!input) return;

      setInput((prev) => prev + "%");
      return;
    }

    setInput((prev) => prev + value);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (/^[0-9.]$/.test(key)) {
        handleClick(key);
      }

      if (["+", "-", "*", "/"].includes(key)) {
        const operatorMap = {
          "+": "+",
          "-": "−",
          "*": "×",
          "/": "÷",
        };

        handleClick(operatorMap[key]);
      }

      if (key === "Enter" || key === "=") {
        handleClick("=");
      }

      if (key === "Backspace") {
        handleClick("⌫");
      }

      if (key === "Escape") {
        handleClick("AC");
      }

      if (key === "%") {
        handleClick("%");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-black/[0.06] bg-[#FFFDF9] p-4 text-[#29251F] shadow-[0_18px_50px_rgba(80,60,30,0.08)] select-none">
      {/* =====================================================
        DISPLAY
    ====================================================== */}

      <div className="mb-3 flex min-h-[105px] shrink-0 flex-col justify-end rounded-2xl border border-black/[0.06] bg-[#F7F4EF] p-4 shadow-inner">
        {/* CALCULATOR LABEL */}

        <div className="mb-auto flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#A49A8E]">
            Calculator
          </span>

          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-medium text-[#A49A8E] shadow-sm">
            Basic
          </span>
        </div>

        {/* EXPRESSION */}

        <div className="min-h-[20px] truncate text-right font-mono text-[11px] tracking-wide text-[#9A9186]">
          {input || " "}
        </div>

        {/* RESULT */}

        <div className="mt-1 truncate text-right font-mono text-3xl font-medium tracking-tight text-[#29251F]">
          {result || input || "0"}
        </div>
      </div>

      {/* =====================================================
        KEYPAD
    ====================================================== */}

      <div className="grid min-h-0 flex-1 grid-cols-4 gap-2">
        {buttons.map((btn) => {
          const isOperator = operators.includes(btn);
          const isAction = ["AC", "⌫", "%"].includes(btn);
          const isEquals = btn === "=";
          const isZero = btn === "0";

          return (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`
              ${isZero ? "col-span-2" : ""}

              flex
              min-h-0
              items-center
              justify-center

              rounded-xl

              border

              text-base
              font-semibold

              transition-all
              duration-150

              active:scale-95

              select-none

              ${
                isEquals
                  ? `
                    border-orange-400
                    bg-orange-500
                    text-white
                    shadow-[0_6px_16px_rgba(249,115,22,0.20)]
                    hover:bg-orange-600
                  `
                  : ""
              }

              ${
                isOperator
                  ? `
                    border-orange-100
                    bg-orange-50
                    text-orange-500
                    hover:border-orange-200
                    hover:bg-orange-100
                  `
                  : ""
              }

              ${
                isAction
                  ? `
                    border-red-100
                    bg-red-50
                    text-red-400
                    hover:border-red-200
                    hover:bg-red-100
                    hover:text-red-500
                  `
                  : ""
              }

              ${
                !isEquals && !isOperator && !isAction
                  ? `
                    border-black/[0.05]
                    bg-white
                    text-[#403A34]
                    shadow-[0_2px_6px_rgba(80,60,30,0.03)]
                    hover:border-black/[0.08]
                    hover:bg-[#F7F4EF]
                  `
                  : ""
              }
            `}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
