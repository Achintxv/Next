"use client";

import React from "react";

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="flex items-end gap-8 h-60">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100;

        return (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className="w-12 bg-indigo-500 rounded-md transition-all duration-500"
              style={{ height: `${height}%` }}
            ></div>

            <p className="text-sm text-white">{item.name}</p>
            <p className="text-xs text-zinc-400">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;