import React from "react";
import FormAddReserved from "../form/FormAddReserved";
import IconClose from "../icons/IconClose";
import Navbar from "../navbar/Navbar";
import BaseModal from "./BaseModal";

export default function ModalAddReserved({
  dataHour,
  day,
  id,
  setOpenModal,
  timezone,
  reload,
  setReload,
}) {
  return (
    <BaseModal>
      <div
        onClick={() => setOpenModal(false)}
        className="absolute top-2 right-2"
      >
        <IconClose />
      </div>
      <Navbar />
      <FormAddReserved
        dataHour={dataHour}
        data={day}
        id={id}
        setOpenModal={setOpenModal}
        timezone={timezone}
        reload={reload}
        setReload={setReload}
      />
    </BaseModal>
  );
}
