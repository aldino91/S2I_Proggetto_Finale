import React, { useState } from "react";
import { fetchAddTable } from "../../AllFetchApi";

export default function FormAddTable({ id }) {
  const [name, setName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddTable(name, id);
  };
  return (
    <form className="w-full mx-auto my-20 lg:w-1/2" onSubmit={handleSubmit}>
      <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Table</div>

        <input
          type="text"
          name="name"
          placeholder="Name Table"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          type="submit"
          className="p-2 text-white bg-green-500 rounded-md"
        >
          Add
          {/* {!loading ? (
      "Send"
    ) : (
      <ClipLoader color="#ffffff" loading={loading} size={20} />
    )} */}
        </button>
      </div>
    </form>
  );
}
