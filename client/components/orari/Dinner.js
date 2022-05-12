import React, { useState } from "react";
import IconDown from "../../components/icons/IconDown";

import IconPlusSmall from "../../components/icons/IconPlusSmall";
import { orariCena } from "../../utils/cena";
import BaseModal from "../modal/BaseModal";
import IconClose from "../icons/IconClose";
import FormAddReserved from "../form/FormAddReserved";

export default function Dinner({ selectedDate, id }) {
  const [openModal, setOpenModal] = useState(false);
  const [dataHour, setDataHour] = useState(null);

  const day = selectedDate.getDate();
  const month = selectedDate.getMonth() + 1;
  const year = selectedDate.getFullYear();

  const data = `${day + "/" + month + "/" + year}`;

  function AddReserved(data) {
    setDataHour(data);
    setOpenModal(!openModal);
  }
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between py-2 text-white w-ful bg-slate-500">
        <button className="flex flex-row pl-2">
          <IconDown />

          <h2 className="pl-1 text-left">Reserved Tables</h2>
        </button>
        <div className="pr-2">Table / Pax</div>
      </div>

      <div className="w-full">
        {orariCena.map((orari) => (
          <div
            className="flex flex-row justify-between w-full px-2 py-1 border-b-2 bg-slate-200 border-b-gray-400"
            key={orari}
          >
            <p>{orari}</p>
            <div
              className="flex flex-row items-center"
              onClick={() => AddReserved(orari)}
            >
              <IconPlusSmall />
              <p className="pl-1">Prenotazione</p>
            </div>
            <div className="">Tavoli / Pax</div>
          </div>
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
          />
        </BaseModal>
      ) : null}
    </div>
  );
}
