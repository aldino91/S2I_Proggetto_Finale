import React, { useState } from "react";
import { fetchAddRestaurant } from "../../AllFetchApi";

export default function FormAddRestaurant({ setOpenModal }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddRestaurant(e, name, city, telephone, address, setOpenModal);
  };
  return (
    <form className="w-full mx-auto my-20 lg:w-1/2" onSubmit={handleSubmit}>
      <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Restaurant</div>

        <input
          type="text"
          name="name"
          placeholder="Name Restaurant"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setCity(e.target.value);
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
          name="address"
          placeholder="Address"
          className="p-2 border-2 rounded-md border-slate-300"
          required
          onChange={(e) => {
            setAddress(e.target.value);
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
