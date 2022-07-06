import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchGetTable, fetchSaveTables } from "../../AllFetchApi";
import GridAllTables from "../GridAllTables";

import IconClose from "../icons/IconClose";
import StateCurrent from "../listReserved/StateCurrent";
import BaseModal from "./BaseModal";

export default function ModalTables({ setShowModalTable, res, reserved }) {
  const router = useRouter();
  const { id } = router.query;

  const allTablesReservation = reserved.map((tab) => tab.tables);
  const stringAllTables = allTablesReservation.toString();
  const arrayTables = stringAllTables.split(",");

  localStorage.setItem("arrayAllTables", arrayTables);

  const [localStorageTables, setLocalStorageTables] = useState(
    localStorage.getItem("arrayAllTables").split(",")
  );

  const [allTables, setAllTables] = useState();

  const tablesSelected = !res.tables ? [] : res.tables.split(",");

  const [busyTable, setBusyTable] = useState(
    tablesSelected ? tablesSelected : []
  );

  useEffect(() => {
    fetchGetTable(id, setAllTables);
  }, [id]);

  async function chosenTables(tab) {
    if (busyTable.includes(tab)) {
      const filterArrayLocal = await localStorageTables.filter(
        (item) => item !== tab
      );
      await setLocalStorageTables(filterArrayLocal);
      const filterBusyTable = await busyTable.filter((item) => item !== tab);
      await setBusyTable(filterBusyTable);
    } else {
      await setBusyTable([...busyTable, tab]);
    }
  }

  async function saveTables(idReserved) {
    const tables = await busyTable.toString();

    const idRestaurant = id;
    await fetchSaveTables(
      idReserved,
      idRestaurant,
      tables,
      setShowModalTable,
      router
    );
  }

  return (
    <BaseModal>
      <div
        onClick={() => setShowModalTable(false)}
        className="absolute top-2 right-2"
      >
        <IconClose />
      </div>
      <div className="flex flex-col items-center w-full h-full overflow-scroll lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full py-0 bg-white lg:w-1/3 h-2/4 md:h-1/3 lg:h-2/4 md:py-7">
          <div className="flex flex-col justify-around w-full h-full p-0 space-y-0 rounded-md md:w-5/6 lg:justify-between lg:p-2 md:space-y-7 bg-slate-100">
            <div className="pl-2">
              <p>{res.data}</p>

              <p className="font-semibold">{res.timezone}</p>
            </div>

            <div>
              <div className="flex flex-row items-center justify-between px-2">
                <StateCurrent stateCurrent={res.State.statereserved} />
                <p className="font-semibold capitalize">{res.client}</p>
                <p>{res.pax} pax</p>
              </div>

              <p className="pl-2">{res.hour}</p>
            </div>

            <div className="w-full">
              <div
                className="flex flex-row justify-center w-full p-2 overflow-scroll text-center bg-green-400 rounded-md"
                onClick={() => saveTables(res.id)}
              >
                {busyTable?.length > 0 ? (
                  <div className="flex flex-row overflow-scroll text-white">
                    {busyTable.map((select) => (
                      <div key={select}>
                        <p className="mr-2">{select}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-white"
                    onClick={() => saveTables(res.id)}
                  >
                    nessun tavolo
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <GridAllTables
          allTables={allTables}
          chosenTables={chosenTables}
          busyTable={busyTable}
          localStorageTables={localStorageTables}
        /> */}
      </div>
    </BaseModal>
  );
}
