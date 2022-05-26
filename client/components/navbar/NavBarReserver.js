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
import IconRefresh from "../icons/IconRefresh";
import IconToday from "../icons/IconToday";
import ModalDeleteRestaurant from "../modal/ModalDeleteRestaurant";
import ModalAddWaiter from "../modal/ModalAddWaiter";
import { useRouter } from "next/router";
import { dateSetting, showDay, updateDaySelected } from "../../utils/function";

export default function NavBarReserver({
  data,
  setSelectDate,
  id,
  daySelected,
  setDaySelected,
}) {
  const router = useRouter();
  const { day, timezone } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [openAddWaiter, setOpenAddWaiter] = useState(false);

  const [chosenDay, setChosenDay] = useState(chosenDay);

  const [toDay, setToDay] = useState();
  console.log(toDay);

  const today = new Date();

  useEffect(() => {
    dateSetting(day, setChosenDay);
    updateDaySelected(today, setToDay);
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

  function timeDinner() {
    router.push(`/${id}/dinner/${day}`);
  }

  function timeLunch() {
    router.push(`/${id}/lunch/${day}`);
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

      <div className="flex flex-col justify-around p-1 lg:flex-row">
        <div className="p-2 text-center underline capitalize">{data.name}</div>
        <div className="flex flex-row justify-around md:pb-0">
          <div className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:mr-10">
            Piantina
          </div>
          <div className="flex flex-row">
            <div
              className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:mr-10"
              onClick={() => router.reload()}
            >
              <IconRefresh />
            </div>
            <div
              className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:mr-10"
              onClick={() => setOpenAddWaiter(true)}
            >
              <IconWaiter />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around p-1 lg:p-0">
          <div className="bg-white rounded-md bg-opacity-60">
            <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardDatePicker
                variant="inline"
                format="dd-MM-yyyy"
                inputVariant="standard"
                value={chosenDay}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) =>
                  showDay(
                    date,
                    setChosenDay,
                    id,
                    setSelectDate,
                    setDaySelected,
                    daySelected,
                    timezone,
                    router
                  )
                }
              />
            </ThemeProvider>
          </div>

          <Link href={`/${id}/${timezone}/${toDay}`}>
            <a className="p-2 bg-white border-2 rounded-md hover:bg-slate-100 md:ml-10">
              <IconToday />
            </a>
          </Link>

          {openModal ? (
            <ModalDeleteRestaurant setOpenModal={setOpenModal} />
          ) : null}

          {openAddWaiter ? (
            <ModalAddWaiter id={id} setOpenAddWaiter={setOpenAddWaiter} />
          ) : null}
        </div>
        <div className="flex flex-row justify-around rounded-md">
          <div className="flex flex-row">
            <div
              className={`p-2 ${
                timezone === "lunch" ? "bg-blue-300" : "bg-white"
              } border-2 rounded-l-md border-y-2`}
              onClick={timeLunch}
            >
              Lunch
            </div>
            <div
              className={`p-2 ${
                timezone === "dinner" ? "bg-blue-300" : "bg-white"
              } border-2 rounded-r-md border-y-2`}
              onClick={timeDinner}
            >
              Dinner
            </div>
          </div>
          <div className="flex flex-row">
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
          </div>
        </div>
      </div>
    </div>
  );
}
