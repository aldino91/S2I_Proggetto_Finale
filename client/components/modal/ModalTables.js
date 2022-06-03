import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchGetTable } from "../../AllFetchApi";
import GridAllTables from "../GridAllTables";

import IconClose from "../icons/IconClose";
import StateCurrent from "../listReserved/StateCurrent";

import BaseModal from "./BaseModal";
export default function ModalTables({ setShowModalTable, res }) {
  const router = useRouter();

  const [allTables, setAllTables] = useState();
  const [busyTable, setBusyTable] = useState([]);

  const { id } = router.query;

  useEffect(() => {
    fetchGetTable(id, setAllTables);
  }, [id]);

  function chosenTables(tab) {
    if (busyTable.includes(tab)) {
      const filterArray = busyTable.filter((item) => item !== tab);
      setBusyTable(filterArray);
    } else {
      setBusyTable([...busyTable, tab]);
    }
  }

  return (
    <BaseModal>
      <div
        onClick={() => setShowModalTable(false)}
        className="absolute top-2 right-2"
      >
        <IconClose />
      </div>
      <div className="flex flex-row items-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-1/3 bg-white h-2/3">
          <div className="flex flex-col justify-between w-5/6 p-2 rounded-md h-4/6 space-y-7 bg-slate-100">
            <div>
              <p>{res.data}</p>

              <p className="font-semibold">{res.timezone}</p>
            </div>

            <div>
              <div className="flex flex-row items-center justify-between mb-4">
                <StateCurrent stateCurrent={res.State.statereserved} />
                <p className="font-semibold capitalize">{res.Client.name}</p>
                <p>{res.pax} pax</p>
              </div>

              <p>{res.hour}</p>
            </div>
            <div className="space-y-2">
              <div className="flex flex-row justify-center w-full p-2 overflow-scroll text-center bg-green-400 rounded-md">
                {busyTable.length > 0 ? (
                  busyTable?.map((tab) => (
                    <div key={tab.id} className="text-white">
                      {tab},
                    </div>
                  ))
                ) : (
                  <div>nessun tavolo</div>
                )}
              </div>
              <div className="w-full p-2 text-center text-white bg-green-400 rounded-md">
                cancellare
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 h-2/3 bg-slate-100">
          <GridAllTables
            allTables={allTables}
            chosenTables={chosenTables}
            busyTable={busyTable}
          />
        </div>
      </div>
    </BaseModal>
  );
}
