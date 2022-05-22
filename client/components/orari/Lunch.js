import React, { useState, useEffect, useMemo } from "react";
import { orariPranzo } from "../../utils/mezzogiorno";
import BaseModal from "../modal/BaseModal";
import IconClose from "../icons/IconClose";
import FormAddReserved from "../form/FormAddReserved";
import ListReserved from "../listReserved/ListReserved";
import { GetReservedTimeZone } from "../../AllFetchApi";
import { useRouter } from "next/router";

export default function Lunch({ daySelected }) {
  const router = useRouter();
  const { day, id } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [dataHour, setDataHour] = useState(null);
  const [reload, setReload] = useState(false);
  const [allReservedTimeZone, setallReservedTimeZone] = useState([]);

  const totalPax = allReservedTimeZone
    .map((i) => i.pax)
    .reduce((prev, curr) => prev + curr, 0);

  const timezone = "lunch";

  useEffect(() => {
    GetReservedTimeZone(id, day, timezone, setallReservedTimeZone);
  }, [reload, day, id, daySelected]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between py-2 text-white w-ful bg-slate-500">
        <h2 className="pl-2 text-left">Reserved Tables</h2>
        <div className="pr-2">{`${allReservedTimeZone.length} Table/${totalPax} Pax`}</div>
      </div>

      <div className="w-full">
        {orariPranzo.map((orari) => (
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
                allReservedTimeZone={allReservedTimeZone}
              />
            </div>
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
            data={day}
            id={id}
            setOpenModal={setOpenModal}
            setReload={setReload}
            reload={reload}
            timezone={timezone}
          />
        </BaseModal>
      ) : null}
    </div>
  );
}

{
  /* <ListReserved
            key={orari}
            orari={orari}
            setOpenModal={setOpenModal}
            openModal={openModal}
            setDataHour={setDataHour}
            id={id}
            setReload={setReload}
            reload={reload}
            daySelected={daySelected}
            allReservedTimeZone={allReservedTimeZone}
          /> */
}
