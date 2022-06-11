import React, { useState } from "react";
import IconPlusSmall from "../icons/IconPlusSmall";
import IconEditReserved from "../icons/IconEditReserved";

import StateReserved from "./StateReserved";
import ModalEditResereved from "../modal/ModalEditResereved";
import ModalTables from "../modal/ModalTables";

export default function ListReserved({
  orari,
  setOpenModal,
  openModal,
  setDataHour,
  setReload,
  reload,
  allReservedTimeZone,
}) {
  const [showIconEdit, setShowIconEdit] = useState(false);
  const [dataReserved, setDataReserved] = useState();
  const [showModalTable, setShowModalTable] = useState(false);

  function openModalEdit(res) {
    setShowIconEdit(true);
    setDataReserved(res);
  }

  function openModalTables(res) {
    setShowModalTable(true);
    setDataReserved(res);
  }
  function AddReserved(data) {
    setOpenModal(!openModal);
    setDataHour(data);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between w-full px-2 py-1 border-b-2 bg-slate-200 border-b-gray-400">
        <div className="flex flex-row items-center w-1/3">
          <p>{orari}</p>
        </div>
        <button
          className="flex flex-row items-center justify-center w-1/3"
          onClick={() => AddReserved(orari)}
        >
          <IconPlusSmall />
          <p className="pl-1">Prenotazione</p>
        </button>
        <div className="flex flex-row justify-end w-1/3">
          {`${
            allReservedTimeZone?.filter((item) => item.hour === orari).length
          } Table/${allReservedTimeZone
            ?.filter((item) => item.hour === orari)
            .map((i) => i.pax)
            .reduce((prev, curr) => prev + curr, 0)}Pax`}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 px-2 pb-1 md:grid-cols-2 md:gap-2">
        {allReservedTimeZone
          ?.filter((item) => item.hour === orari)
          .map((res) => (
            <div key={res.id} className="p-1 my-1">
              <div className="flex flex-row items-center justify-between w-full p-2 border-2 rounded-md">
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
                    <div className="flex flex-row items-center">
                      <p className="capitalize font-base text-normal">
                        {res.hour}
                      </p>
                      <button
                        className="pl-2"
                        onClick={() => openModalEdit(res)}
                      >
                        <IconEditReserved />
                      </button>
                    </div>
                    <div className="text-sm">({res.waiter})</div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end w-1/3">
                  <p className="mr-3 text-xl font-semibold">{res.pax}</p>
                  <div
                    className="flex flex-row p-2 overflow-y-scroll border-2 rounded-md"
                    onClick={() => openModalTables(res)}
                  >
                    {res.tables ? (
                      res.tables.split(",").map((arr) => (
                        <div key={arr}>
                          <p className="mr-1">{arr}</p>
                        </div>
                      ))
                    ) : (
                      <p>tavoli</p>
                    )}
                  </div>
                </div>
                {showIconEdit ? (
                  <ModalEditResereved
                    res={dataReserved}
                    setShowIconEdit={setShowIconEdit}
                  />
                ) : null}
                {showModalTable ? (
                  <ModalTables
                    setShowModalTable={setShowModalTable}
                    res={dataReserved}
                    allReservedTimeZone={allReservedTimeZone}
                  />
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
