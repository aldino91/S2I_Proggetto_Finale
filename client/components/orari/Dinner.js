import React, { useState, useEffect } from "react";
import { hourDinner } from "../../utils/hourDinner";
import BaseModal from "../modal/BaseModal";
import IconClose from "../icons/IconClose";
import FormAddReserved from "../form/FormAddReserved";
import ListReserved from "../listReserved/ListReserved";
import { GetReservedTimeZone } from "../../AllFetchApi";
import { useRouter } from "next/router";
import ModalWarnig from "../modal/ModalWarnig";

export default function Dinner({
  daySelected,
  timeZoneDinner: reserved,
  id,
  day,
  setReload,
  reload,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [dataHour, setDataHour] = useState(null);


  const timezone = "dinner";

  const totalPax = reserved?
    .map((i) => i.pax)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between py-2 text-white w-ful bg-slate-500">
        <h2 className="pl-2 text-left">Reserved Tables</h2>
        {
          <div className="pr-2">{`${reserved?.length} Table/${totalPax} Pax`}</div>
        }
      </div>

      <div className="w-full">
        {hourDinner.map((orari) => (
          <ListReserved
            key={orari}
            orari={orari}
            setOpenModal={setOpenModal}
            openModal={openModal}
            setDataHour={setDataHour}
            id={id}
            setReload={setReload}
            reload={reload}
            daySelected={daySelected}
            reserved={reserved}
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
            data={day}
            id={id}
            setOpenModal={setOpenModal}
            timezone={timezone}
            reload={reload}
            setReload={setReload}
          />
        </BaseModal>
      ) : null}
    </div>
  );
}
