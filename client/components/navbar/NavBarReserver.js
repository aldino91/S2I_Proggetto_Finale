import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import IconRefresh from "../icons/IconRefresh";
import IconToday from "../icons/IconToday";
import IconConfiguration from "../icons/IconConfiguration";
import { useRouter } from "next/router";
import { dateSetting, showDay, updateDaySelected } from "../../utils/function";
import ModalConfiguration from "../modal/ModalConfiguration";

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
  const [showConfiguration, setShowConfiguration] = useState(false);

  const [chosenDay, setChosenDay] = useState(chosenDay);

  const [toDay, setToDay] = useState();

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
        <div className="px-2 text-xl text-white">TControl</div>
      </div>

      <div className="flex flex-col justify-around p-1 lg:flex-row">
        <div className="flex flex-row justify-between w-full lg:w-1/4">
          <div
            className="p-2 rounded-md hover:bg-green-300 md:mr-10"
            onClick={() => setShowConfiguration(true)}
          >
            <IconConfiguration />
          </div>
          <div className="w-5/6 p-2 text-center underline capitalize">
            {data.name}
          </div>
        </div>

        <div className="flex flex-row justify-between w-full py-1 lg:justify-around lg:w-2/4 lg:py-0">
          <div
            className="p-2 rounded-md hover:bg-green-300 md:mr-10"
            onClick={() => router.reload()}
          >
            <IconRefresh />
          </div>
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
            <a className="p-2 rounded-md hover:bg-green-300 md:mr-10">
              <IconToday />
            </a>
          </Link>
        </div>

        <div className="flex flex-row justify-around w-full rounded-md lg:w-1/4">
          <div className="flex flex-row w-full">
            <div
              className={`p-2 ${
                timezone === "lunch" ? "bg-blue-300" : "bg-white"
              } border-2 rounded-l-md border-y-2 w-1/2 text-center`}
              onClick={timeLunch}
            >
              Lunch
            </div>
            <div
              className={`p-2 ${
                timezone === "dinner" ? "bg-blue-300" : "bg-white"
              } border-2 rounded-r-md border-y-2 w-1/2 text-center`}
              onClick={timeDinner}
            >
              Dinner
            </div>
          </div>
        </div>
      </div>
      {showConfiguration ? (
        <ModalConfiguration
          setShowConfiguration={setShowConfiguration}
          openModal={openModal}
          setOpenModal={setOpenModal}
          openAddWaiter={openAddWaiter}
          setOpenAddWaiter={setOpenAddWaiter}
          id={id}
        />
      ) : null}
    </div>
  );
}
