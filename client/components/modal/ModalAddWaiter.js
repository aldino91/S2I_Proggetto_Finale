import React, { useState } from "react";
import FormAddWaiter from "../form/FormAddWaiter";
import IconClose from "../icons/IconClose";
import IconWaiter from "../icons/IconWaiter";
import BaseModal from "./BaseModal";

export default function ModalAddWaiter({ setAddWaiter, id }) {
  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setAddWaiter(false)}
      >
        <IconClose />
      </div>

      <FormAddWaiter setAddWaiter={setAddWaiter} id={id} />
    </BaseModal>
  );
}
