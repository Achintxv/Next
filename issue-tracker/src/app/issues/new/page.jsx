import React from "react";
import Issueform from "@/components/Issueform";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <Link
          href="/issues"
          className="text-white hover:text-zinc-600 inline-flex items-center gap-1"
        >
          <IoIosArrowBack /> Go back
        </Link>
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-white font-semibold">
          Submit a new Issue
        </h1>
        <p className="text-zinc-400 text-sm">
          Report bugs, request features, or submit improvements for the project.
        </p>
      </div>

      <div className="max-w-xl">
        <Issueform />
      </div>
    </div>
  );
};

export default page;
