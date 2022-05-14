import React, { useState } from "react";
import { orariCena } from "../../utils/cena";
import BaseModal from "../modal/BaseModal";
import IconClose from "../icons/IconClose";
import FormAddReserved from "../form/FormAddReserved";
import ListReserved from "../listReserved/ListReserved";

export default function Dinner({ selectedDate, id }) {
  const [openModal, setOpenModal] = useState(false);
  const [dataHour, setDataHour] = useState(null);
  const [reload, setReload] = useState(false);

  const day = selectedDate.getDate();
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const data = `${day + "/" + month + "/" + year}`;

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between py-2 text-white w-ful bg-slate-500">
        <h2 className="pl-2 text-left">Reserved Tables</h2>
        <div className="pr-2">Table / Pax</div>
      </div>

      <div className="w-full">
        {orariCena.map((orari) => (
          <ListReserved
            orari={orari}
            setOpenModal={setOpenModal}
            openModal={openModal}
            setDataHour={setDataHour}
            id={id}
            data={data}
            reload={reload}
          />
        ))}
      </div>
      {openModal ? (
        <BaseModal>
          <div
            onClick={() => setOpenModal(false)}
            className="absolute top-2 right-2"
          >
            <IconClose />
          </div>
          <FormAddReserved
            dataHour={dataHour}
            data={data}
            id={id}
            setOpenModal={setOpenModal}
            setReload={setReload}
          />
        </BaseModal>
      ) : null}
    </div>
  );
}
