import Image from "next/image";
import React from "react";
import useAuth from "../../hooks/useAuth";

export default function NavBarUser({ name }) {
  const { logout } = useAuth();
  return (
    <div className="w-full font-mono bg-green-500 shadow-md shadow-slate-400">
      <div className="flex flex-row items-center justify-center py-4 border-b-2 border-slate-100">
        <Image
          src="/reserved-table.png"
          alt="Picture of the author"
          width={40}
          height={40}
        />
        <div className="px-2 text-xl text-white">T-Control</div>
      </div>
      <div className="flex flex-row justify-around p-1">
        <div className="flex flex-col justify-center">
          <div className="capitalize">Welcome {name}</div>
        </div>
        <div
          className="p-2 bg-white border-2 rounded-md hover:bg-slate-100"
          onClick={logout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
