import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  getAuthentication,
  fetchDataRestaurant,
  fetchGetTable,
  fetchGetWaiters,
} from "../../../AllFetchApi/index";
import { useRouter } from "next/router";
import NavBarReserver from "../../../components/navbar/NavBarReserver";
import Lunch from "../../../components/orari/Lunch";
import Dinner from "../../../components/orari/Dinner";

export default function HomeRestaurant() {
  const router = useRouter();
  const { id, timezone } = router.query;
  const [data, setData] = useState([]);
  const [selectedDate, setSelectDate] = useState(new Date());
  const [daySelected, setDaySelected] = useState(false);
  /*  const [allWaiters, setAllWaiters] = useState();
  const [allTables, setAllTables] = useState(); */

  useEffect(() => {
    getAuthentication()
      .then((resp) => {
        fetchDataRestaurant(id, setData);
        /* fetchGetTable(id, setAllTables);
        fetchGetWaiters(id, setAllWaiters); */
      })
      .catch((e) => {
        router.push("/");
      });
  }, [id, selectedDate, daySelected]);

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
          /*  allTables={allTables}
          allWaiters={allWaiters} */
        />
      ) : (
        <Dinner
          daySelected={daySelected}
          /* allTables={allTables}
          allWaiters={allWaiters} */
        />
      )}
    </>
  );
}
