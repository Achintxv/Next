'use client';

import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState('');

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
      return;
    }

    if (value === '=') {
      try {
        // simple eval for demo
        const result = eval(input || '0');
        setInput(String(result));
      } catch {
        setInput('Error');
      }
      return;
    }

    setInput((prev) => prev + value);
  };

  return (
    <div className="flex h-48 mx-auto rounded-2xl overflow-hidden shadow-xl border border-zinc-700">

      {/* LEFT SIDE - RESULT */}
      <div className="w-1/3 bg-black text-white flex flex-col justify-end p-2">
        <div className="text-sm text-gray-400 mb-1">Result</div>
        <div className="text-2xl font-bold break-all">
          {input || '0'}
        </div>
      </div>

      {/* RIGHT SIDE - KEYPAD */}
      <div className="w-2/3 bg-zinc-900 p-2 grid grid-cols-4 gap-1">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(btn)}
            className={`rounded-lg text-md font-semibold transition
              ${btn === '=' ? 'bg-green-500 text-white col-span-1' : ''}
              ${btn === 'C' ? 'bg-red-500 text-white col-span-4' : 'bg-zinc-700 hover:bg-zinc-500'}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}