import React, { useState } from "react";
import { fetchAddReserved } from "../../AllFetchApi";
import IconPlusSmall from "../icons/IconPlusSmall";
import IconReserved from "../icons/IconReserved";

export default function FormAddReserved({ dataHour, data, id, setOpenModal }) {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const hour = dataHour;
  const day = data;
  const idRestaurant = id;
  const [cameriere, setCameriere] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddReserved(
      e,
      name,
      telephone,
      hour,
      day,
      cameriere,
      idRestaurant,
      setOpenModal
    );
  };
  return (
    <form className="w-full mx-auto my-10 lg:w-1/2" onSubmit={handleSubmit}>
      <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Reserved</div>

        <input
          type="text"
          name="name"
          placeholder="Name Client"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="text"
          name="telephone"
          placeholder="Telephone number"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setTelephone(e.target.value);
          }}
        />
        <input
          type="text"
          name="hour"
          placeholder="Hour"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          defaultValue={dataHour}
          value={dataHour}
        />
        <input
          type="text"
          name="Day"
          placeholder="Day"
          className="p-2 border-2 rounded-md border-slate-300"
          defaultValue={data}
          value={data}
        />

        <label className="flex flex-row justify-around p-2 bg-white border-2 rounded-md border-slate-300">
          <p>Waiter</p>

          <select
            required
            className="bg-white border-2 rounded-md"
            onChange={(e) => {
              setCameriere(e.target.value);
            }}
          >
            <option value="aldo">Aldo</option>
            <option value="andres">Andres</option>
            <option value="marco">Marco</option>
          </select>
        </label>

        <button
          type="submit"
          className="flex flex-row justify-center p-2 text-white bg-green-500 rounded-md"
        >
          <div className="flex flex-row items-center">
            <IconPlusSmall />
            <IconReserved />
          </div>
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
