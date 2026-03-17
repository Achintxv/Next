"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaExternalLinkAlt } from "react-icons/fa";

const Home = () => {
  const [open, setOpen] = useState(0);
  const [closed, setClosed] = useState(0);
  const [inProgress, setinProgress] = useState(0);
  const [Data, setData] = useState([]);

  const fetchState = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();

    const openCount = data.filter((issue) => issue.status === "OPEN").length;
    const closedCount = data.filter(
      (issue) => issue.status === "CLOSED",
    ).length;
    const inProgressCount = data.filter(
      (issue) => issue.status === "IN-PROGRESS",
    ).length;

    setData(data);

    setOpen(openCount);
    setClosed(closedCount);
    setinProgress(inProgressCount);
  };

  useEffect(() => {
    fetchState();
  }, []);

  const chartData = [
    { name: "Open", issues: open },
    { name: "In Progress", issues: inProgress },
    { name: "Closed", issues: closed },
  ];

  return (
    <div className="">
      <h1 className="text-2xl text-white">Welcome</h1>
      <div className="py-4 flex gap-5">
        <div className="flex flex-col gap-5">
          <div className="text-white flex gap-4">
            <div className="bg-zinc-700 rounded-md p-2 border border-zinc-600">
              <h1>Open Issues</h1>
              <p className="font-semibold">{open}</p>
            </div>
            <div className="bg-zinc-700 rounded-md p-2 border border-zinc-600">
              <h1>In progress Issues</h1>
              <p className="font-semibold">{inProgress}</p>
            </div>
            <div className="bg-zinc-700 rounded-md p-2 border border-zinc-600">
              <h1>Closed Issues</h1>
              <p className="font-semibold">{closed}</p>
            </div>
          </div>

          <div className="">
            <div className="w-[500px] h-[300px] bg-zinc-800 py-2 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" allowDecimals={false} />
                  <Bar
                    barSize={40}
                    dataKey="issues"
                    fill="#6366f1"
                    radius={[8, 8, 0, 0]}
                  />
                  <Tooltip cursor={false}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="text-white w-full h-full rounded-md bg-zinc-800 px-2 py-2 gap-1 flex flex-col">
          <a href="/issues" className="mb-1">
            <h1 className="font-semibold text-2xl flex items-center gap-2 hover:text-zinc-500">Latest Issues <FaExternalLinkAlt className="text-[18px]"/>
</h1>
          </a>
          <div className="flex flex-col gap-1 h-83 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-600 bg-zinc-900 p-1 rounded-md">
            {[...Data].reverse().map((i) => (
              <div
                key={i._id}
                className="p-2 flex justify-between bg-black rounded-md"
              >
                <span className="font-medium">{i.title}</span>
                <span className="text-sm text-zinc-400">{i.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
