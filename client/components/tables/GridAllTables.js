import React, { useEffect, useState } from "react";
import { fetchGetTable } from "../../AllFetchApi/index";

export default function GridAllTables({
  id,
  reload,
  setReload,
  chosenTables,
  busyTable,
  localStorageTables,
}) {
  const [allTables, setAllTables] = useState([]);

  useEffect(() => {
    fetchGetTable(id, setAllTables);
  }, [id, reload]);

  return (
    <div className="w-full h-3/5 bg-neutral-300 bg-opacity-70 shadow-md shadow-slate-400 border rounded-md overflow-y-scroll">
      <div className="grid w-full grid-cols-4 gap-1 p-4 md:grid-cols-7 lg:grid-cols-8 lg:gap-2">
        {chosenTables
          ? allTables?.map((rest) => (
              <div
                key={rest.id}
                className="flex flex-col justify-around w-16 h-16 mx-auto border-2 border-green-500 rounded-md md:w-25 md:h-25 lg:w-35 lg:h-35"
              >
                <div
                  className={`flex flex-col justify-center w-5/6 mx-auto rounded-md h-5/6 ${
                    busyTable?.find((tab) => tab == rest.name)
                      ? "bg-green-400 cursor-pointer"
                      : localStorageTables?.find((tab) => tab == rest.name)
                      ? "bg-gray-400 pointer-events-none"
                      : !localStorageTables?.find((tab) => tab == rest.name)
                      ? "bg-gray-100 cursor-pointer"
                      : null
                  }`}
                  onClick={() => chosenTables(rest.name)}
                >
                  <div className="w-full text-center">{rest.name}</div>
                </div>
              </div>
            ))
          : allTables?.map((rest) => (
              <div
                key={rest.id}
                className="flex flex-col justify-around w-16 h-16 mx-auto border-2 border-green-500 rounded-md md:w-25 md:h-25 lg:w-35 lg:h-35"
              >
                <div className="flex flex-col justify-center w-5/6 mx-auto rounded-md h-5/6 hover:bg-green-200">
                  <div className="w-full text-center">{rest.name}</div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
