import React, { useState } from "react";
import FormAddWaiter from "../form/FormAddWaiter";
import IconClose from "../icons/IconClose";

import ListWaiters from "../waiters/ListWaiters";
import BaseModal from "./BaseModal";

export default function ModalAddWaiter({ id, setOpenAddWaiter }) {
  const [reload, setReload] = useState(false);
  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setOpenAddWaiter(false)}
      >
        <IconClose />
      </div>

      <FormAddWaiter setReload={setReload} reload={reload} id={id} />
      <ListWaiters id={id} reload={reload} setReload={setReload} />
    </BaseModal>
  );
}
