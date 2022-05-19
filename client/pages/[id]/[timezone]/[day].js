import React, { useEffect, useState } from "react";
import {
  getAuthentication,
  fetchDataRestaurant,
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

  useEffect(() => {
    getAuthentication()
      .then((resp) => {
        fetchDataRestaurant(id, setData);
      })
      .catch((e) => {
        console.log(e);
        router.push("/");
      });
  }, [id, selectedDate, daySelected]);

  return (
    <>
      <NavBarReserver
        data={data}
        selectedDate={selectedDate}
        setSelectDate={setSelectDate}
        id={id}
        daySelected={daySelected}
        setDaySelected={setDaySelected}
      />

      {timezone === "lunch" ? (
        <Lunch daySelected={daySelected} />
      ) : (
        <Dinner daySelected={daySelected} />
      )}
    </>
  );
}
