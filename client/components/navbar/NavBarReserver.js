import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import IconLogout from "../icons/IconLogout";
import IconDelete from "../icons/IconDelete";
import IconWaiter from "../icons/IconWaiter";
import ModalDeleteRestaurant from "../modal/ModalDeleteRestaurant";
import ModalAddWaiter from "../modal/ModalAddWaiter";
import { useRouter } from "next/router";

export default function NavBarReserver({
  data,
  startLunch,
  startDinner,
  timetables,
  setSelectDate,
  id,
  daySelected,
  setDaySelected,
}) {
  const router = useRouter();
  const { day } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [openAddWaiter, setOpenAddWaiter] = useState(false);

  const [chosenDay, setChosenDay] = useState(chosenDay);

  useEffect(() => {
    if (day) {
      const arrDay = day.split(/-/);

      const giorno = `${arrDay[2] + "/" + arrDay[1] + "/" + arrDay[0]}`;
      setChosenDay(new Date(giorno));
    } else {
      null;
    }
  }, [day]);

  const createTheme =
    process.env.NODE_ENV === "production"
      ? createMuiTheme
      : unstable_createMuiStrictModeTheme;

  const defaultMaterialTheme = createTheme({
    spacing: 8,
    palette: {
      primary: {
        main: "#1ec55e",
      },
    },
  });

  function showDay(date) {
    setSelectDate(date);
    setDaySelected(!daySelected);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayCurrent = `${day + "-" + month + "-" + year}`;
    const dayReplace = `${year + "/" + month + "/" + day}`;

    setChosenDay(new Date(dayReplace));
    router.push(`/${id}/${dayCurrent}`);
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
          <div
            className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:mr-10"
            onClick={() => setOpenAddWaiter(true)}
          >
            <IconWaiter />
          </div>
          <div className="flex flex-row justify-around rounded-md">
            <div
              className={`p-2 ${
                timetables === true ? "bg-blue-300" : "bg-white"
              } border-2 rounded-l-md border-y-2`}
              onClick={startLunch}
            >
              Lunch
            </div>
            <div
              className={`p-2 ${
                timetables === false ? "bg-blue-300" : "bg-white"
              } border-2 rounded-r-md border-y-2`}
              onClick={startDinner}
            >
              Dinner
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="bg-white rounded-md bg-opacity-60">
            <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardDatePicker
                variant="inline"
                format="dd-MM-yyyy"
                inputVariant="standard"
                value={chosenDay}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => showDay(date)}
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
            <ModalDeleteRestaurant setOpenModal={setOpenModal} />
          ) : null}

          {openAddWaiter ? (
            <ModalAddWaiter id={id} setOpenAddWaiter={setOpenAddWaiter} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
