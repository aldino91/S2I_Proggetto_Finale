import React, { useEffect, useState } from "react";
import { getAuthentication, fetchDataRestaurant } from "../../AllFetchApi";
import { useRouter } from "next/router";
import NavBarReserver from "../../components/navbar/NavBarReserver";

export default function HomeRestaurant() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

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
      <NavBarReserver data={data} />
    </>
  );
}
