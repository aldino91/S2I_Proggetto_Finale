import React, { useEffect, useState } from "react";
import Head from "next/head";
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
      <Head>
        <title>TControl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icono-app.ico" />
      </Head>
      <Navbar />
      <AddTables />
      <GridAllTables allTables={allTables} />
    </>
  );
}
