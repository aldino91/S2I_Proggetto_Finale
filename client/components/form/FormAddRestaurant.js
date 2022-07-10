import React, { useState } from "react";
import { fetchAddRestaurant } from "../../AllFetchApi";
import RingLoader from "react-spinners/RingLoader";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function FormAddRestaurant({ setOpenModal, setReload }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchAddRestaurant(
      e,
      name,
      city,
      telephone,
      address,
      setOpenModal,
      setLoading
    );
    setReload(true);
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
        <PhoneInput
          name="telephone"
          defaultCountry="ES"
          placeholder="Telephone number"
          className="p-2 border-2 rounded-md border-slate-300"
          value={telephone}
          onChange={(e) => {
            setTelephone(e);
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
          disabled={loading ? true : false}
          className="p-2 text-white bg-green-500 rounded-md flex flex-row justify-center"
        >
          {!loading ? (
            <div>Add</div>
          ) : (
            <RingLoader color="#ffffff" loading={loading} size={20} />
          )}
        </button>
      </div>
    </form>
  );
}
