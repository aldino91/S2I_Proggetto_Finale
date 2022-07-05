import React, { useEffect, useState } from "react";
import { fetchAddReserved, fetchGetWaiters } from "../../AllFetchApi";
import IconPlusSmall from "../icons/IconPlusSmall";
import IconReserved from "../icons/IconReserved";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import RingLoader from "react-spinners/RingLoader";

export default function FormAddReserved({
  dataHour,
  data,
  id,
  setOpenModal,
  timezone,
  router,
}) {
  const [name, setName] = useState("");
  const [pax, setPax] = useState(2);
  const [telephone, setTelephone] = useState();
  const hour = dataHour;
  const day = data;
  const idRestaurant = id;
  const [waiter, setWaiter] = useState(null);
  const [allWaiters, setAllWaiters] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGetWaiters(id, setAllWaiters);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAddReserved(
      e,
      pax,
      name,
      telephone,
      hour,
      day,
      waiter,
      idRestaurant,
      timezone,
      setLoading,
      setOpenModal,
      router
    );
  };

  return (
    <form
      className="w-full mx-auto my-2 md:my-10 lg:w-1/2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
        <div className="text-center text-green-500">New Reserved</div>
        <div className="flex flex-row justify-center p-2 border-2 rounded-md border-slate-300">
          <input
            type="number"
            name="pax"
            value={pax}
            className="w-1/2 text-xl lg:w-1/3"
            required
            onChange={(e) => {
              setPax(e.target.value);
            }}
          />
        </div>
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

        <div className="p-2 border-2 rounded-md border-slate-300">
          {dataHour}
        </div>

        <div className="p-2 border-2 rounded-md border-slate-300">{data}</div>

        <label className="flex flex-row justify-around p-2 bg-white border-2 rounded-md border-slate-300">
          waiter
          <select
            /* required */
            className="bg-white border-2 rounded-md"
            onChange={(e) => {
              setWaiter(e.target.value);
            }}
          >
            {" "}
            <option value=""></option>
            {allWaiters?.map((resp) => (
              <option value={resp.name} key={resp.id}>
                {resp.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="flex flex-row justify-center p-2 text-white bg-green-500 rounded-md"
        >
          {!loading ? (
            <div className="flex flex-row items-center">
              <IconPlusSmall />
              <IconReserved />
            </div>
          ) : (
            <RingLoader color="#ffffff" loading={loading} size={20} />
          )}
        </button>
      </div>
    </form>
  );
}
