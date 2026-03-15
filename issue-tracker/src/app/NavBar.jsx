"use client";

import React from "react";
import Link from "next/link";
import { IoBug } from "react-icons/io5";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <div className="text-white flex gap-4 items-center border-b border-zinc-800 px-2 h-10">
      <Link href="/" className="flex gap-2 items-center">
        <IoBug />
        Issue Tracker
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${link.href === currentPath ? "text-white" : "text-zinc-500"} hover:text-white transition-colors`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
