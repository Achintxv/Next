import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Add these
import Dropdown from "./Dropdown";
import { MdDeleteForever } from "react-icons/md";

export default function ExpandableList({ issue, fetchIssue }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  
  const handleDelete = async(id) => {
    await fetch(`/api/user?id=${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application-json"
      },
      body: JSON.stringify({ id }),
    });
    
    await fetchIssue();
  }
  
  

  const handleChanges = async (e, id) => {
    e.preventDefault();
    await fetch(`/api/user`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title: title || undefined,
        description: description || undefined,
        status: status || undefined,
      }),
    });

    await fetchIssue();
    setTitle("");
    setDescription("");
    setStatus("");
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const dropItem = ["OPEN", "IN-PROGRESS", "CLOSED"];
  const statusColors = {
    OPEN: "text-green-500 bg-green-500/20",
    "IN-PROGRESS": "text-yellow-400 bg-yellow-400/20",
    CLOSED: "text-red-500 bg-red-500/20",
  };

  return (
    <div className="bg-zinc-900 text-white mx-auto rounded-md overflow-hidden border border-white/5">
      <div className="flex justify-between px-5 py-2 border-b border-zinc-700 text-zinc-400 text-xs uppercase tracking-wider">
        <h1 className="w-1/4">Issue</h1>
        <h1 className="w-1/4">Description</h1>
        <h1 className="w-1/4 flex justify-center">Status</h1>
        <h1 className="w-1/4 flex justify-end">Delete</h1>
      </div>

      {issue.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item._id} className="border-b border-white/10 last:border-none">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4  text-left hover:bg-white/5 transition-colors"
            >
              <span className="w-1/4 truncate text-sm font-medium">{item.title}</span>
              <span className="w-1/4 truncate  text-sm text-zinc-400">{item.description}</span>
              <div className="w-1/4 flex justify-center">
                <span className={`text-xs  font-bold px-2 py-1 rounded-md ${statusColors[item.status] || "bg-zinc-700 text-white"}`}>
                  {item.status}
                </span>
              </div>
                <span className={`w-1/4 flex justify-end text-xs px-2 py-1 rounded-md`}>
                  
                    <MdDeleteForever className="text-xl cursor-pointer" onClick={(e)=>{
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}/>
                  
                </span>
            </button>

            {/* AnimatePresence allows elements to animate as they leave the DOM */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-visible" // Essential to hide the text during the slide
                >
                  <div className="px-5 pb-4 text-white/80">
                    <form
                      onSubmit={(e) => handleChanges(e, item._id)}
                      className="flex flex-col gap-3 p-3 bg-zinc-800/50 rounded-lg border border-white/5"
                    >
                      <input
                        className="bg-zinc-800 rounded-md p-2 border border-zinc-700 focus:border-blue-500 outline-none transition"
                        type="text"
                        value={title}
                        placeholder={item.title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <textarea
                        className="bg-zinc-800 rounded-md p-2 border border-zinc-700 focus:border-blue-500 outline-none transition max-h-24"
                        value={description}
                        placeholder={item.description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Dropdown
                        dropItem={dropItem}
                        statusFilter={status}
                        setStatusFilter={setStatus}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 text-xs text-amber-300">
                          <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
                          Pending Changes
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-md px-4 py-2 transition"
                        >
                          Apply changes
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}