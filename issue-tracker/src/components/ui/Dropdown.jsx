import { useState, useRef, useEffect } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

export default function Dropdown({ dropItem, setStatusFilter, statusFilter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
      type="button"
        onClick={() => setOpen(!open)}
        className="bg-zinc-900 flex items-center gap-2 text-white px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
      >
        {statusFilter}
        
        <div className=""><RiArrowDownSFill /></div>
      </button>

      {open && (
  <div className="absolute z-80 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden">
    {dropItem.map((item) => (
      <button
      type="button"
        key={item}
        onClick={() => {
          setStatusFilter(item);
          setOpen(false);
        }}
        className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
      >
        {item}
      </button>
    ))}
  </div>
)}
    </div>
  );
}
