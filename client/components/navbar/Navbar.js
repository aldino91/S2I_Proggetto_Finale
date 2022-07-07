import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full font-mono bg-green-500 shadow-md shadow-slate-400">
      <div className="flex flex-row items-center justify-center py-4">
        <Image
          src="/reserved-table.png"
          alt="Picture of the author"
          width={40}
          height={40}
        />
        <div className="px-2 text-xl text-white">T-Control</div>
      </div>
    </div>
  );
}
