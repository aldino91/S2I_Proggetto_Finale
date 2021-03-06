import React, { useState, useEffect, useMemo } from "react";
import { hourLunch } from "../../utils/hourLunch";
import BaseModal from "../modal/BaseModal";
import IconClose from "../icons/IconClose";
import FormAddReserved from "../form/FormAddReserved";
import ListReserved from "../listReserved/ListReserved";
import { toast } from "react-toastify";
import {
  fetchGetTable,
  fetchGetWaiters,
  GetReservedTimeZone,
} from "../../AllFetchApi";
import Navbar from "../navbar/Navbar";
import ModalAddReserved from "../modal/ModalAddReserved";

export default function Lunch({
  daySelected,
  timeZoneLunch: reserved,
  id,
  day,
  setReload,
  reload
}) {


  const [openModal, setOpenModal] = useState(false);
  const [dataHour, setDataHour] = useState(null);


  const timezone = "lunch";

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
        {hourLunch.map((orari) => (
          <div key={orari}>
            <div>
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
            </div>
          </div>
        ))}
      </div>
      {openModal ? (
        <ModalAddReserved dataHour={dataHour} day={day} id={id} setOpenModal={setOpenModal} timezone={timezone} reload={reload} setReload={setReload} />
      ) : null}
    </div>
  );
}
