import React, { useState } from "react";
import FormAddTable from "../form/FormAddTable";
import FormAddWaiter from "../form/FormAddWaiter";
import GridAllTables from "../tables/GridAllTables";
import IconClose from "../icons/IconClose";
import IconConfiguration from "../icons/IconConfiguration";
import IconSittingTable from "../icons/IconSittingTable";
import ListWaiters from "../waiters/ListWaiters";
import BaseModal from "./BaseModal";
import ListTables from "../tables/ListTables";

export default function ModalWarnig({
  id,
  setShowModalWarning,
  setControlTables,
  setControlWaiters,
}) {
  const [reload, setReload] = useState(false);
  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setShowModalWarning(false)}
      >
        <IconClose />
      </div>
      <div className="flex flex-col justify-around">
        <div className="w-full text-center  bg-neutral-300 bg-opacity-50 p-4 mt-10 text-green-700 font-mono text-lg">
          <h2>
            Benvenuto a T-Control! Prima d'iniziare a riempire il tuo ristorante
            di prenotazioni, aggiungi Camerieri e Tavoli! Buon servizio!
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row w-screen items-center lg:items-start">
          <div className="flex flex-col w-full lg:w-1/2">
            <FormAddWaiter setReload={setReload} reload={reload} id={id} />
            <ListWaiters
              id={id}
              reload={reload}
              setReload={setReload}
              setControlWaiters={setControlWaiters}
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/2">
            <FormAddTable id={id} reload={reload} setReload={setReload} />
            <ListTables
              id={id}
              reload={reload}
              setReload={setReload}
              setControlTables={setControlTables}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
