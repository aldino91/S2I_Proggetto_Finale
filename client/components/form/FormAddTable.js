import React, { useState } from "react";
import { fetchAddTable } from "../../AllFetchApi";
import RingLoader from "react-spinners/RingLoader";
import Image from "next/image";

export default function FormAddTable({ id, reload, setReload }) {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddTable(e, name, id, setLoading, reload, setReload);
  };
  return (
    <form
      className="w-full mx-auto mb-10 lg:w-2/3 pt-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col  w-5/6 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Table</div>

        <input
          type="text"
          name="name"
          placeholder="Name Table"
          className="p-2 border-2 rounded-md border-green-500"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          type="submit"
          disabled={loading ? true : false}
          className="p-2 text-white bg-green-500 rounded-md flex flex-row justify-center hover:bg-green-400"
        >
          {!loading ? (
            <Image
              src="/Icon-table.png"
              alt="icon-table"
              width={25}
              height={25}
            />
          ) : (
            <RingLoader color="#008000" loading={loading} size={20} />
          )}
        </button>
      </div>
    </form>
  );
}
