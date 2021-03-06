import React, { useEffect, useState } from "react";
import { fetchGetWaiters, fetchDeleteWaiter } from "../../AllFetchApi";
import IconDelete from "../icons/IconDelete";

export default function ListWaiters({ id, reload, setReload }) {
  const [allWaiters, setAllWaiters] = useState();

  useEffect(() => {
    fetchGetWaiters(id, setAllWaiters);
  }, [id, reload]);

  function deleteWaiter(idWaiter, setReload, reload) {
    fetchDeleteWaiter(idWaiter, setReload, reload);
  }

  return (
    <div className="w-full mx-auto lg:w-2/3">
      <div className="flex flex-col w-5/6 h-56 p-3 mx-auto space-y-4 overflow-scroll bg-white rounded-md shadow-md md:h-96 shadow-slate-400">
        <div className="text-center text-green-500">List Waiters</div>
        {allWaiters?.map((resp) => (
          <div
            key={resp.id}
            className="flex flex-row justify-between w-full p-2 text-white bg-green-500 border-2 rounded-md"
          >
            {resp.name}
            <div
              className="border rounded-md hover:bg-green-300"
              onClick={() => deleteWaiter(resp.id, setReload, reload)}
            >
              <IconDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
