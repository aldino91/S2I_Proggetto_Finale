import React, { useState } from "react";
import IconWaiter from "../icons/IconWaiter";
import { fetchAddWaiter } from "../../AllFetchApi";

export default function FormAddWaiter({ setAddWaiter, id }) {
  const [name, setName] = useState("");
  const idRestaurant = id;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddWaiter(e, name, idRestaurant, setAddWaiter);
  };
  return (
    <form className="w-full mx-auto my-20 lg:w-1/2" onSubmit={handleSubmit}>
      <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Waiter</div>

        <input
          type="text"
          name="name"
          placeholder="Name Waiter"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          type="submit"
          className="flex flex-row justify-center p-2 text-white bg-green-500 rounded-md"
        >
          <IconWaiter />

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
