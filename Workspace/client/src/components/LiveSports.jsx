// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   getCricketLive,
//   getFootballLive,
// } from "@/services/sportsService";

// export default function LiveSports() {
//   const [tab, setTab] = useState("cricket");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res =
//         tab === "cricket"
//           ? await getCricketLive()
//           : await getFootballLive();

//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   // 🔁 Auto refresh every 30s
//   useEffect(() => {
//     fetchData();

//     const interval = setInterval(fetchData, 30000);
//     return () => clearInterval(interval);
//   }, [tab]);

//   return (
//     <div className="h-full flex flex-col bg-zinc-800 rounded-xl border border-zinc-700 p-4 text-white">

//       {/* 🔹 Tabs */}
//       <div className="flex gap-2 mb-4">
//         <button
//           onClick={() => setTab("cricket")}
//           className={`px-3 py-1 rounded ${
//             tab === "cricket"
//               ? "bg-blue-600"
//               : "bg-zinc-700"
//           }`}
//         >
//           Cricket
//         </button>

//         <button
//           onClick={() => setTab("football")}
//           className={`px-3 py-1 rounded ${
//             tab === "football"
//               ? "bg-blue-600"
//               : "bg-zinc-700"
//           }`}
//         >
//           Football
//         </button>
//       </div>

//       {/* 🔹 Content */}
//       <div className="flex-1 overflow-y-auto no-scrollbar text-sm">

//         {loading && <p>Loading...</p>}

//         {/* 🏏 Cricket */}
//         {tab === "cricket" &&
//           data?.data?.map((match) => (
//             <div
//               key={match.id}
//               className="mb-3 p-3 bg-zinc-700 rounded-lg"
//             >
//               <p className="font-semibold">
//                 {match.name}
//               </p>
//               <p className="text-zinc-400 text-xs">
//                 {match.status}
//               </p>
//             </div>
//           ))}

//         {/* ⚽ Football */}
//         {tab === "football" &&
//           data?.response?.map((match) => (
//             <div
//               key={match.fixture.id}
//               className="mb-3 p-3 bg-zinc-700 rounded-lg"
//             >
//               <p className="font-semibold">
//                 {match.teams.home.name} vs{" "}
//                 {match.teams.away.name}
//               </p>
//               <p className="text-xs text-zinc-400">
//                 {match.goals.home} - {match.goals.away}
//               </p>
//             </div>
//           ))}

//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
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
    <div className="h-full flex flex-col bg-zinc-800 rounded-xl p-2 text-white">

      <h2 className="text-sm font-semibold mb-1 text-zinc-400">
        Live Cricket
      </h2>

      <div className="flex-1 overflow-y-auto no-scrollbar text-xs">
        {loading && <p>Loading...</p>}

        {matches.map((match) => (
          <div
            key={match.id}
            className="mb-3 p-2 bg-zinc-700 rounded-lg"
          >
            <p className="font-semibold">{match.name}</p>
            <p className="text-xs text-zinc-400">
              {match.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}