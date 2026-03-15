"use client";

import React, { useState } from "react";

const Issueform = ({ refreshIssues }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    refreshIssues;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/3 border border-zinc-700  rounded-2xl flex flex-col px-5 py-4 gap-6"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-semibold">Title</h1>
          <input
            type="text"
            className="bg-white/5 text-white border p-1.5 border-zinc-700 rounded-md focus:outline-none caret-zinc-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-white font-semibold">Description</h1>
          <textarea
            type="text"
            className="bg-white/5 text-white border p-1.5 border-zinc-700 rounded-md focus:outline-none caret-zinc-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white w-1/4 p-1 rounded-md"
      >
        Post Issue
      </button>
    </form>
  );
};

export default Issueform;
