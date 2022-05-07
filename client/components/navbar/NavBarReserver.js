import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { fetchDeleteRestaurant } from "../../AllFetchApi";
import { useRouter } from "next/router";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

export default function NavBarReserver({ data }) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const defaultMaterialTheme = createMuiTheme({
    spacing: 8,
    palette: {
      primary: {
        main: "#1ec55e",
      },
    },
  });

  const router = useRouter();
  const { id } = router.query;

  function deleteRestaurant() {
    fetchDeleteRestaurant(id, router);
  }

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
          <div className="bg-white rounded-md bg-opacity-60">
            <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                inputVariant="standard"
                value={selectedDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateChange(date)}
              />
            </ThemeProvider>
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
          <div
            className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:ml-10"
            onClick={deleteRestaurant}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
