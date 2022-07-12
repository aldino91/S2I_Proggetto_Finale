import React, { useEffect, useState } from "react";
import FormAddTable from "../form/FormAddTable";
import FormAddWaiter from "../form/FormAddWaiter";
import GridAllTables from "../tables/GridAllTables";
import IconClose from "../icons/IconClose";
import IconConfiguration from "../icons/IconConfiguration";
import IconSittingTable from "../icons/IconSittingTable";
import ListWaiters from "../waiters/ListWaiters";
import BaseModal from "./BaseModal";
import ListTables from "../tables/ListTables";

export default function ModalWarnig({ id, setShowModal }) {
  const [reload, setReload] = useState(false);
  useEffect(() => {
    localStorage.setItem(id, true + id);
  }, []);

  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setShowModal(false)}
      >
        <IconClose />
      </div>
      <div className="flex flex-col justify-around">
        <div className="w-full text-center  bg-neutral-600 bg-opacity-50 p-2 lg:p-4 mt-10 text-green-700 font-mono text-lg flex flex-col justify-center">
          <div>
            <h1>
              Benvenuto a T-Control! Prima d'iniziare a riempire il tuo
              ristorante di prenotazioni, aggiungi Camerieri e Tavoli! Buon
              servizio!
            </h1>
          </div>
          <div className="flex flex-col mt-3 lg:flex-row lg:justify-around">
            <div className="flex flex-row justify-around w-full lg:w-2/5">
              <h2>ps: puoi sempre andare a </h2> <IconConfiguration />
            </div>
            <div className=" w-full lg:w-3/5">
              per cambiare a tuo piacimento tutte le configurazioni!
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-screen items-center lg:items-start">
          <div className="flex flex-col w-full lg:w-1/2">
            <FormAddWaiter setReload={setReload} reload={reload} id={id} />
            <ListWaiters id={id} reload={reload} setReload={setReload} />
          </div>
          <div className="flex flex-col w-full lg:w-1/2">
            <FormAddTable id={id} reload={reload} setReload={setReload} />
            <ListTables id={id} reload={reload} setReload={setReload} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
