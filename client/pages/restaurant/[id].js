import React, { useEffect, useState } from "react";
import { getAuthentication, fetchDataRestaurant } from "../../AllFetchApi";
import { useRouter } from "next/router";
import NavBarReserver from "../../components/navbar/NavBarReserver";
import Lunch from "../../components/orari/Lunch";
import Dinner from "../../components/orari/Dinner";

export default function HomeRestaurant() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [timetables, setTimetables] = useState(true);
  const [selectedDate, setSelectDate] = useState(new Date());

  function startLunch() {
    setTimetables(true);
  }

  function startDinner() {
    setTimetables(false);
  }

  useEffect(() => {
    getAuthentication()
      .then((resp) => {
        fetchDataRestaurant(id, setData);
      })
      .catch((e) => {
        console.log(e);
        router.push("/");
      });
  }, [id]);
  return (
    <>
      <NavBarReserver
        data={data}
        startLunch={startLunch}
        startDinner={startDinner}
        timetables={timetables}
        selectedDate={selectedDate}
        setSelectDate={setSelectDate}
        id={id}
      />

      {timetables ? (
        <Lunch selectedDate={selectedDate} id={id} />
      ) : (
        <Dinner selectedDate={selectedDate} id={id} />
      )}
    </>
  );
}
