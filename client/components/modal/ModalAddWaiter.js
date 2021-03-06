import React, { useState } from "react";
import FormAddWaiter from "../form/FormAddWaiter";
import IconClose from "../icons/IconClose";
import Navbar from "../navbar/Navbar";

import ListWaiters from "../waiters/ListWaiters";
import BaseModal from "./BaseModal";

export default function ModalAddWaiter({
  id,
  setOpenAddWaiter,
  setShowConfiguration,
}) {
  const [reload, setReload] = useState(false);
  function closeModals() {
    setOpenAddWaiter(false);
    setShowConfiguration(false);
  }
  return (
    <BaseModal>
      <div className="absolute top-2 right-2" onClick={closeModals}>
        <IconClose />
      </div>
      <Navbar />

      <FormAddWaiter setReload={setReload} reload={reload} id={id} />
      <ListWaiters id={id} reload={reload} setReload={setReload} />
    </BaseModal>
  );
}
