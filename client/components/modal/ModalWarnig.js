import React, { useState } from "react";
import FormAddTable from "../form/FormAddTable";
import FormAddWaiter from "../form/FormAddWaiter";
import GridAllTables from "../GridAllTables";
import IconClose from "../icons/IconClose";
import IconConfiguration from "../icons/IconConfiguration";
import IconSittingTable from "../icons/IconSittingTable";
import ListWaiters from "../waiters/ListWaiters";
import BaseModal from "./BaseModal";

export default function ModalWarnig({ id, setShowModalWarning }) {
  const [reload, setReload] = useState(false);
  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setShowModalWarning(false)}
      >
        <IconClose />
      </div>
      <p>Prima d'iniziare a usare l'app, vai a configurazioni</p>

      <div className="flex flex-col lg:flex-row w-screen items-center lg:items-start">
        <div className="flex flex-col w-full lg:w-1/2">
          <FormAddWaiter setReload={setReload} reload={reload} id={id} />
          <ListWaiters id={id} reload={reload} setReload={setReload} />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <FormAddTable id={id} reload={reload} setReload={setReload} />
          <GridAllTables id={id} reload={reload} setReload={setReload} />
        </div>
      </div>
    </BaseModal>
  );
}
