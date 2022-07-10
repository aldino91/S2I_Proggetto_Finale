import React, { useEffect, useState } from "react";
import IconClose from "../icons/IconClose";
import BaseModal from "./BaseModal";
import { useRouter } from "next/router";
import FormEditReserved from "../form/FormEditReserved";
import Navbar from "../navbar/Navbar";

export default function ModalEditResereved({
  res,
  setShowIconEdit,
  reload,
  setReload,
}) {
  const router = useRouter();
  const { id, day } = router.query;
  return (
    <BaseModal>
      <div
        onClick={() => setShowIconEdit(false)}
        className="absolute top-2 right-2"
      >
        <IconClose />
      </div>
      <Navbar />

      <FormEditReserved
        id={id}
        day={day}
        res={res}
        setShowIconEdit={setShowIconEdit}
        reload={reload}
        setReload={setReload}
      />
    </BaseModal>
  );
}
