import React, { useEffect, useState } from "react";
import IconPlusSmall from "../icons/IconPlusSmall";
import IconReserved from "../icons/IconReserved";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { fetchGetWaiters, fetchUpdateReserved } from "../../AllFetchApi";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";

import { allHours } from "../../utils/allHours";
import {
  changeDay,
  dateSetting,
  updateDaySelected,
} from "../../utils/function";

export default function FormEditReserved({
  id,
  day,
  res,
  setShowIconEdit,
  router,
}) {
  const [allWaiters, setAllWaiters] = useState();
  const [pax, setPax] = useState(res.pax);
  const name = res.client;
  const telephone = res.telephone;
  const [hour, setHour] = useState(res.hour);
  const [waiter, setWaiter] = useState();
  const [chosenDay, setChosenDay] = useState();
  const [selectDay, setSelectDay] = useState();

  const timezone = hour < "19:00" ? "lunch" : "dinner";

  useEffect(() => {
    fetchGetWaiters(id, setAllWaiters);
    dateSetting(day, setChosenDay);
  }, [id, day]);

  useEffect(() => {
    if (chosenDay) {
      updateDaySelected(chosenDay, setSelectDay);
    } else {
      null;
    }
  }, [chosenDay]);

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

  const idReserved = res.id;
  const idState = res.idState;
  const data = selectDay;
  const idRestaurant = id;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUpdateReserved(
      pax,
      hour,
      data,
      waiter,
      idRestaurant,
      timezone,
      idReserved,
      idState,
      setShowIconEdit,
      router
    );
  };
  return (
    <form
      className="w-full mx-auto my-2 md:my-10 lg:w-1/2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">Edit Reserved</div>
        <div>
          <p>Client:</p>
          <div className="capitalize rounded-sm bg-slate-200">{name}</div>
          <p>Telephone:</p>
          <div className="rounded-sm bg-slate-200">{telephone}</div>
        </div>
        <div className="flex flex-row justify-center p-2 border-2 rounded-md border-slate-300">
          <input
            type="number"
            name="pax"
            value={pax}
            className="w-1/2 text-xl lg:w-1/3"
            required
            onChange={(e) => {
              setPax(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col items-center w-full bg-white">
          <ThemeProvider theme={defaultMaterialTheme}>
            <KeyboardDatePicker
              variant="inline"
              format="dd-MM-yyyy"
              inputVariant="standard"
              value={chosenDay}
              InputAdornmentProps={{ position: "start" }}
              onChange={(date) => changeDay(date, setChosenDay, setSelectDay)}
            />
          </ThemeProvider>
        </div>

        <label className="flex flex-row justify-around p-2 bg-white border-2 rounded-md border-slate-300">
          Hour
          <select
            required
            className="bg-white border-2 rounded-md"
            onChange={(e) => {
              setHour(e.target.value);
            }}
          >
            {" "}
            <option value=""></option>
            {allHours?.map((resp) => (
              <option value={resp} key={resp}>
                {resp}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-row justify-around p-2 bg-white border-2 rounded-md border-slate-300">
          waiter
          <select
            required
            className="bg-white border-2 rounded-md"
            onChange={(e) => {
              setWaiter(e.target.value);
            }}
          >
            {" "}
            <option value=""></option>
            {allWaiters?.map((resp) => (
              <option value={resp.name} key={resp.id}>
                {resp.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="flex flex-row justify-center p-2 text-white bg-green-500 rounded-md"
        >
          <div className="flex flex-row items-center">
            <IconPlusSmall />
            <IconReserved />
          </div>
        </button>
      </div>
    </form>
  );
}
