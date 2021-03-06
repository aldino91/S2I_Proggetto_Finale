import React, { useState } from "react";
import IconWaiter from "../icons/IconWaiter";
import { fetchAddWaiter } from "../../AllFetchApi";
import RingLoader from "react-spinners/RingLoader";

export default function FormAddWaiter({ setReload, reload, id }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const idRestaurant = id;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddWaiter(e, name, idRestaurant, setReload, reload, setLoading);
  };
  return (
    <form
      className="w-full mx-auto mt-10 mb-10 lg:w-2/3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-5/6 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Waiter</div>

        <input
          type="text"
          name="name"
          placeholder="Name Waiter"
          className="p-2 border-2 rounded-md border-green-300"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          type="submit"
          disabled={loading ? true : false}
          className="flex flex-row justify-center p-2 text-white bg-green-500 rounded-md hover:bg-green-400"
        >
          {!loading ? (
            <IconWaiter />
          ) : (
            <RingLoader color="#ffffff" loading={loading} size={20} />
          )}
        </button>
      </div>
    </form>
  );
}
