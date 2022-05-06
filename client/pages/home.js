import React, { useEffect, useState } from "react";

import AddRestaurant from "../components/AddRestaurant";
import { useRouter } from "next/router";

import NavBarUser from "../components/navbar/NavBarUser";
import { getAuthentication, fetchGetRestaurant } from "../AllFetchApi";
import GridAllRestaurant from "../components/GridAllRestaurant";

export default function home() {
  const [name, setName] = useState("");
  const [allRestaurant, setAllRestaurant] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAuthentication()
      .then((resp) => {
        const idUser = resp.user.id;
        fetchGetRestaurant(idUser, setAllRestaurant);
        setName(resp.user.name);
      })
      .catch((e) => {
        console.log(e);
        router.push("/");
      });
  }, []);

  return (
    <div className="relative w-full h-screen">
      <NavBarUser name={name} />
      {allRestaurant === undefined ? (
        <AddRestaurant />
      ) : (
        <GridAllRestaurant allRestaurant={allRestaurant} />
      )}
    </div>
  );
}
