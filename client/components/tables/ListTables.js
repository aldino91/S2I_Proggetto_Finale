import React, { useEffect, useState } from "react";
import { fetchGetTable } from "../../AllFetchApi";
import IconDelete from "../icons/IconDelete";

export default function ListTables({ id, reload, setReload }) {
  const [allTables, setAllTables] = useState();

  useEffect(() => {
    fetchGetTable(id, setAllTables);
  }, [id, reload]);

  function deleteTables(idTables, setReload, reload) {}
  return (
    <div className="w-full mx-auto lg:w-2/3">
      <div className="flex flex-col w-5/6 h-56 p-3 mx-auto space-y-4 overflow-scroll bg-white rounded-md shadow-md md:h-96 shadow-slate-400">
        <div className="text-center text-green-500">List Tables</div>
        {allTables?.map((resp) => (
          <div
            key={resp.id}
            className="flex flex-row justify-between w-full p-2 text-white bg-green-500 border-2 rounded-md"
          >
            {" "}
            <div className="border-2 border-green-700 rounded-md w-1/3 text-center bg-zinc-400 overflow-x-scroll">
              {resp.name}
            </div>
            <div
              className="border rounded-md hover:bg-green-300"
              onClick={() => deleteTables(resp.id, setReload, reload)}
            >
              <IconDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
