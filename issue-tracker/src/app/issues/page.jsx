"use client";

import { useEffect, useState } from "react";
import ExpandableList from "@/components/ui/ExpandableList";
import Dropdown from "@/components/ui/Dropdown";
import Link from "next/link";

export default function Home() {
  const [issue, setIssue] = useState([]);

  const fetchIssue = async (status = "ALL") => {
    const res = await fetch(`/api/user?status=${status}`);
    if (!res.ok) {
      console.error("Request failed:", res.status);
      return;
    }

    const data = await res.json();
    setIssue(data);
  };

  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchIssue(statusFilter);
  }, [statusFilter]);

  const dropItem = ["ALL", "OPEN", "IN-PROGRESS", "CLOSED"];

  return (
    <div className="text-white flex flex-col gap-5">
      <div className="flex justify-between px-2">
        <Dropdown
          dropItem={dropItem}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <Link
          href="/issues/new"
          className="px-3 py-1 flex items-center bg-blue-600 rounded-md hover:bg-blue-800 transition"
        >
          New Issue
        </Link>
      </div>

      <div className="">
        <ExpandableList issue={issue} fetchIssue={fetchIssue}></ExpandableList>
      </div>
    </div>
  );
}
