import React, { useState, useEffect } from "react";
import IconPlusSmall from "../icons/IconPlusSmall";
import { GetReserved } from "../../AllFetchApi";
import { useRouter } from "next/router";
import StateReserved from "./StateReserved";

export default function ListReserved({
  orari,
  setOpenModal,
  openModal,
  setDataHour,
  id,
  setReload,
  reload,
  daySelected,
}) {
  const router = useRouter();
  const { day } = router.query;
  const [getReserved, setGetReserved] = useState([]);

  const totalPax = getReserved
    .map((i) => i.pax)
    .reduce((prev, curr) => prev + curr, 0);

  function AddReserved(data) {
    setDataHour(data);
    setOpenModal(!openModal);
    setReload(!reload);
  }
  useEffect(() => {
    GetReserved(id, day, orari, setGetReserved);
  }, [id, day, reload, daySelected]);

  return (
    <div key={orari} className="flex flex-col">
      <div className="flex flex-row justify-between w-full px-2 py-1 border-b-2 bg-slate-200 border-b-gray-400">
        <div className="flex flex-row items-center">
          <p>{orari}</p>
        </div>
        <button
          className="flex flex-row items-center"
          onClick={() => AddReserved(orari)}
        >
          <IconPlusSmall />
          <p className="pl-1">Prenotazione</p>
        </button>
        <div className="">{`${getReserved.length} Table/${totalPax} Pax`}</div>
      </div>
      <div>
        {!getReserved[0] ? (
          <div className="pt-1"></div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-2">
            {getReserved.map((res) => (
              <div
                key={res.id}
                className="flex flex-row items-center justify-between w-full p-2 border-2 rounded-md"
              >
                <div className="flex flex-row items-center justify-start w-2/3 overflow-scroll">
                  <StateReserved
                    state={res.State}
                    res={res}
                    reload={reload}
                    setReload={setReload}
                  />
                  <div className="flex flex-col">
                    <div className="text-xl capitalize font-base">
                      {res.Client.name}
                    </div>
                    <p className="capitalize font-base text-normal">
                      {res.hour}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end w-1/3">
                  <p className="mr-3 text-xl font-semibold">{res.pax}</p>
                  <div className="p-2 border-2 rounded-md">tavolo</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
