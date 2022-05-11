import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { fetchDeleteRestaurant } from "../../AllFetchApi";
import { useRouter } from "next/router";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import IconLogout from "../icons/IconLogout";
import IconDelete from "../icons/IconDelete";
import IconClose from "../icons/IconClose";
import BaseModal from "../modal/BaseModal";

export default function NavBarReserver({
  data,
  startLunch,
  startDinner,
  timetables,
  selectedDate,
  setSelectDate,
}) {
  const [openModal, setOpenModal] = useState(false);
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
    setOpenModal(false);
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
            <div
              className={`p-2 ${
                timetables === true ? "bg-blue-300" : "bg-white"
              } border-2 rounded-l-md border-y-2`}
              onClick={startLunch}
            >
              Pranzo
            </div>
            <div
              className={`p-2 ${
                timetables === false ? "bg-blue-300" : "bg-white"
              } border-2 rounded-r-md border-y-2`}
              onClick={startDinner}
            >
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
                onChange={(date) => setSelectDate(date)}
              />
            </ThemeProvider>
          </div>

          <Link href={"/home"}>
            <a className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:ml-10">
              <IconLogout />
            </a>
          </Link>
          <div
            className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:ml-10"
            onClick={() => setOpenModal(true)}
          >
            <IconDelete />
          </div>
          {openModal ? (
            <BaseModal>
              <div
                className="absolute top-2 right-2"
                onClick={() => setOpenModal(false)}
              >
                <IconClose />
              </div>

              <div className="flex flex-col justify-center w-2/3 mx-auto border-2 border-green-500 rounded-md my-28 bg-opacity-70 h-2/3 bg-zinc-200">
                <div className="text-center mb-7">
                  Sei sicuro di voler cancellare questo ristorante??
                </div>
                <div className="flex flex-row justify-around">
                  <button
                    className="w-1/3 border-2 border-green-500 rounded-md hover:bg-green-300"
                    onClick={deleteRestaurant}
                  >
                    SI
                  </button>
                  <button
                    className="w-1/3 border-2 border-green-500 rounded-md hover:bg-green-300"
                    onClick={() => setOpenModal(false)}
                  >
                    NO
                  </button>
                </div>
              </div>
            </BaseModal>
          ) : null}
        </div>
      </div>
    </div>
  );
}
