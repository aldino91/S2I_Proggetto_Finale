import React from "react";
import FormAddRestaurant from "../form/FormAddRestaurant";
import IconClose from "../icons/IconClose";
import Navbar from "../navbar/Navbar";
import BaseModal from "./BaseModal";

export default function ModalAddRestaurant({ setOpenModal, setReload }) {
  return (
    <BaseModal>
      <Navbar />
      <div
        onClick={() => setOpenModal(false)}
        className="absolute top-2 right-2"
      >
        <IconClose />
      </div>
      <FormAddRestaurant setOpenModal={setOpenModal} setReload={setReload} />
    </BaseModal>
  );
}
