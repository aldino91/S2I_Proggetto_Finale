import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import {
  getAuthentication,
  fetchDataRestaurant,
  fetchGetTable,
  fetchGetWaiters,
  GetReserved,
} from "../../../AllFetchApi/index";
import { useRouter } from "next/router";
import NavBarReserver from "../../../components/navbar/NavBarReserver";
import Lunch from "../../../components/orari/Lunch";
import Dinner from "../../../components/orari/Dinner";

export default function HomeRestaurant() {
  const router = useRouter();
  const { id, timezone, day } = router.query;
  const [data, setData] = useState([]);
  const [selectedDate, setSelectDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState(false);
  const [allReservedTimeZone, setAllReservedTimeZone] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getAuthentication()
      .then((resp) => {
        fetchDataRestaurant(id, setData);
        GetReserved(id, day, setAllReservedTimeZone);
      })
      .catch((e) => {
        router.push("/");
      });
  }, [selectedDate, daySelected, id, day]);

  const timeZoneLunch = allReservedTimeZone?.filter(
    (zone) => zone.timezone === "lunch"
  );

  const timeZoneDinner = allReservedTimeZone?.filter(
    (zone) => zone.timezone === "dinner"
  );

  return (
    <>
      <Head>
        <title>TControl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icono-app.ico" />
      </Head>
      <NavBarReserver
        data={data}
        selectedDate={selectedDate}
        setSelectDate={setSelectDate}
        id={id}
        daySelected={daySelected}
        setDaySelected={setDaySelected}
      />
      {timezone === "lunch" ? (
        <Lunch
          daySelected={daySelected}
          timeZoneLunch={timeZoneLunch}
          id={id}
          day={day}
          router={router}
          setReload={setReload}
          reload={reload}
        />
      ) : (
        <Dinner
          daySelected={daySelected}
          timeZoneDinner={timeZoneDinner}
          id={id}
          day={day}
          router={router}
          setReload={setReload}
          reload={reload}
        />
      )}
    </>
  );
}
