import React, { useEffect, useState } from "react";
import AddTables from "../../components/AddTables";
import Navbar from "../../components/navbar/Navbar";
import { getAuthentication, fetchGetTable } from "../../AllFetchApi";
import { useRouter } from "next/router";
import GridAllTables from "../../components/GridAllTables";

export default function restaurant() {
  const [allTables, setAllTables] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getAuthentication()
      .then((resp) => {
        fetchGetTable(id, setAllTables);
      })
      .catch((e) => {
        console.log(e);
        router.push("/");
      });
  }, [id]);
  return (
    <>
      <Navbar />
      <AddTables />
      <GridAllTables allTables={allTables} />
    </>
  );
}
