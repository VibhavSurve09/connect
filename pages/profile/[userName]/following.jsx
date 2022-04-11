import React from "react";
import Link from "next/link";
export default function following() {
  return (
    <div className="fixed bottom-0 left-0 flex items-center justify-center w-full h-screen bg-indigo-400">
      <div className="w-1/3 px-8 py-6 text-center bg-white rounded-md">
        <Link href="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <span className="mb-4 text-2xl italic font-bold underline text-slate-900">
          Following :
        </span>
      </div>
    </div>
  );
}
