import React, { useState } from "react";
import FormAddTable from "../form/FormAddTable";
import IconClose from "../icons/IconClose";
import BaseModal from "./BaseModal";
import { useRouter } from "next/router";
import Navbar from "../navbar/Navbar";
import ListTables from "../tables/ListTables";

export default function ModalAddRestaurant({
  setOpenAddTables,
  setShowConfiguration,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [reload, setReload] = useState(false);
  function closeModals() {
    setOpenAddTables(false);
    setShowConfiguration(false);
  }

  return (
    <BaseModal>
      <Navbar />
      <div onClick={closeModals} className="absolute top-2 right-2">
        <IconClose />
      </div>

      <FormAddTable id={id} reload={reload} setReload={setReload} />
      <ListTables id={id} reload={reload} setReload={setReload} />
    </BaseModal>
  );
}
