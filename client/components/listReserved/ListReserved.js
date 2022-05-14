import React, { useState, useEffect } from "react";

import IconPlusSmall from "../icons/IconPlusSmall";
import { GetReserved } from "../../AllFetchApi";
import IconNotReserved from "../icons/IconNotReserved";
import IconConfirmedReserved from "../icons/IconConfirmedReserved";

export default function ListReserved({
  orari,
  setOpenModal,
  openModal,
  setDataHour,
  id,
  data,
  reload,
}) {
  const [getReserved, setGetReserved] = useState([]);

  function AddReserved(data) {
    setDataHour(data);
    setOpenModal(!openModal);
  }

  useEffect(() => {
    GetReserved(id, data, orari, setGetReserved);
  }, [id, reload]);

  return (
    <div key={orari} className="flex flex-col">
      <div className="flex flex-row justify-between w-full px-2 py-1 border-b-2 bg-slate-200 border-b-gray-400">
        <button className="flex flex-row items-center">
          <p>{orari}</p>
        </button>
        <div
          className="flex flex-row items-center"
          onClick={() => AddReserved(orari)}
        >
          <IconPlusSmall />
          <p className="pl-1">Prenotazione</p>
        </div>
        <div className="">Tavoli / Pax</div>
      </div>
      <div>
        {!getReserved[0] ? (
          <div className="w-full p-4">
            <div className="flex flex-col items-center w-1/2 mx-auto border-2 rounded-md">
              <IconNotReserved />
              <h2 className="text-center">Non ci sono prenotazioni!</h2>
            </div>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-2">
            {getReserved.map((res) => (
              <div
                key={res.id}
                className="flex flex-row items-center justify-between w-full p-2 border-2 rounded-md"
              >
                <div className="flex flex-row items-center justify-start w-2/3 overflow-scroll">
                  <button className="p-2 mr-4 border rounded-full bg-slate-200 hover:bg-slate-100">
                    <IconConfirmedReserved />
                  </button>
                  <div className="flex flex-col">
                    <div className="text-xl capitalize font-base">
                      {res.name}
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

      {/* {showAllReserved ? (
        <div>
          {!getReserved[0] ? (
            <div className="w-full p-4">
              <div className="flex flex-col items-center w-1/2 mx-auto border-2 rounded-md">
                <IconNotReserved />
                <h2>Non ci sono prenotazioni!</h2>
              </div>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-2">
              {getReserved.map((res) => (
                <div
                  key={res.id}
                  className="flex flex-row items-center justify-between w-full p-2 border-2 rounded-md"
                >
                  <div className="flex flex-row items-center justify-start w-1/2">
                    <button className="p-2 mr-4 border rounded-full bg-slate-200 hover:bg-slate-100">
                      <IconConfirmedReserved />
                    </button>
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold capitalize">
                        {res.name}
                      </p>
                      <p className="text-base font-medium capitalize">
                        {res.hour}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end w-1/2">
                    <p className="mr-3 text-xl font-semibold">{res.pax}</p>
                    <div className="p-2 border-2 rounded-md">tavolo</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null} */}
    </div>
  );
}
