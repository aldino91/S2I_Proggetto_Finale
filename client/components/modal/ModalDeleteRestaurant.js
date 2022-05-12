import React from "react";
import { useRouter } from "next/router";
import IconClose from "../icons/IconClose";
import { fetchDeleteRestaurant } from "../../AllFetchApi";
import BaseModal from "./BaseModal";

export default function ModalDeleteRestaurant({ setOpenModal }) {
  const router = useRouter();
  const { id } = router.query;

  function deleteRestaurant() {
    fetchDeleteRestaurant(id, router);
    setOpenModal(false);
  }
  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setOpenModal(false)}
      >
        <IconClose />
      </div>

      <div className="flex flex-col justify-center w-2/3 mx-auto border-2 border-green-500 rounded-md my-28 bg-opacity-70 h-2/3 bg-zinc-200">
        <div className="text-center mb-7">
          Sei sicuro di voler cancellare questo ristorante??
        </div>
        <div className="flex flex-row justify-around">
          <button
            className="w-1/3 border-2 border-green-500 rounded-md hover:bg-green-300"
            onClick={deleteRestaurant}
          >
            SI
          </button>
          <button
            className="w-1/3 border-2 border-green-500 rounded-md hover:bg-green-300"
            onClick={() => setOpenModal(false)}
          >
            NO
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
