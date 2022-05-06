import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function NavBarReserver({ data }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="w-full font-mono bg-green-500">
      <div className="flex flex-row items-center justify-center py-4 border-b-2 border-slate-100">
        <Image
          src="/reserved-table.png"
          alt="Picture of the author"
          width={40}
          height={40}
        />
        <div className="px-2 text-xl text-white">Reserved Tables</div>
      </div>

      <div className="flex flex-col justify-around p-1 md:flex-row md:justify-around">
        <div className="p-2 text-center underline capitalize">{data.name}</div>
        <div className="flex flex-row justify-between pb-2 md:pb-0">
          <div className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:mr-10">
            Piantina
          </div>
          <div className="flex flex-row justify-around rounded-md">
            <div className="p-2 bg-white border-2 rounded-l-md border-y-2 hover:bg-slate-100 ">
              Pranzo
            </div>
            <div className="p-2 bg-white border-2 rounded-r-md border-y-2 hover:bg-slate-100">
              Cena
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row rounded-md">
            <div className="p-2 bg-white border-2 rounded-md hover:bg-slate-100">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="p-2 bg-white border-2 rounded-md">
              <DatePicker
                controls={["calendar"]}
                selected={startDate}
                dateFormat="dd/MM/yyyy"
                touchUi={true}
                calendarScroll="horizontal"
                onChange={(date) => setStartDate(date)}
                className="text-center"
                calendarType="month"
                pages={1}
              />
            </div>

            <div className="p-2 bg-white border-2 rounded-md hover:bg-slate-100">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <Link href={"/home"}>
            <a className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:ml-10">
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
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
