import { useState, useRef, useEffect } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

export default function Dropdown({ dropItem, setStatusFilter, statusFilter }) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const ref = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 Detect available space
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // if not enough space below, open upward
      setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-zinc-900 flex items-center gap-2 text-white px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
      >
        {statusFilter}
        <RiArrowDownSFill />
      </button>

      {open && (
        <div
          className={`absolute z-50 w-48 bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden ${
            openUpward ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
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