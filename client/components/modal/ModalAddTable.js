import React from "react";
import FormAddTable from "../form/FormAddTable";
import IconClose from "../icons/IconClose";
import BaseModal from "./BaseModal";
import { useRouter } from "next/router";

export default function ModalAddRestaurant({ setOpenModal }) {
  const router = useRouter();
  const { id } = router.query;

  function closeModal(params) {
    setOpenModal(false), router.reload();
  }
  return (
    <BaseModal>
      <div onClick={closeModal} className="absolute top-2 right-2">
        <IconClose />
      </div>
      <FormAddTable setOpenModal={setOpenModal} id={id} />
    </BaseModal>
  );
}
