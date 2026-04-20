import React from "react";

export default function Button({
  children,
  variant = "default",
  className = "",
  ...props
}) {
   {/*#F5E6DA, #F3E2D5, or #EDD6C8*/}
  const baseStyles =
    "px-6 py-3 font-bold border-2 transition-all duration-150 active:translate-y-1 active:shadow-none";

  const variants = {
    default:
      "bg-[#F5E6DA] text-black border-black shadow-[4px_4px_0px_black] hover:bg-[#EDD6C8]", 
      
    destructive:
      "bg-red-500 text-white border-black shadow-[4px_4px_0px_black] hover:bg-red-400",
    outline:
      "bg-white text-black border-black shadow-[4px_4px_0px_black] hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}