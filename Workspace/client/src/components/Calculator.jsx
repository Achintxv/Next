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
    Number.isInteger(value)
      ? value
      : Number(value.toFixed(10))
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

return ( <div className="w-full h-full min-h-0 flex flex-col rounded-b-xl overflow-hidden bg-zinc-950 border border-zinc-700 shadow-xl">


  {/* DISPLAY */}
  <div className="flex-1 min-h-[60px] flex flex-col justify-end px-1 py-1 bg-black">

    {/* Expression */}
    <div className="text-right text-sm text-zinc-500 min-h-[20px] truncate">
      {input || " "}
    </div>

    {/* Result */}
    <div className="text-right text-2xl font-semibold text-white tracking-tight truncate">
      {result || input || "0"}
    </div>

  </div>

  {/* KEYPAD */}
  <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900">

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

            h-11
            rounded-xl
            font-medium
            text-sm

            transition-all
            duration-150
            active:scale-95

            select-none

            ${
              isEquals
                ? "bg-white text-black hover:bg-zinc-200"
                : ""
            }

            ${
              isOperator
                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                : ""
            }

            ${
              isAction
                ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                : ""
            }

            ${
              !isEquals &&
              !isOperator &&
              !isAction
                ? "bg-zinc-800 text-white hover:bg-zinc-700"
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
