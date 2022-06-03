import React from "react";
import Link from "next/link";
import ModalDeleteRestaurant from "./ModalDeleteRestaurant";
import ModalAddWaiter from "./ModalAddWaiter";
import IconClose from "../icons/IconClose";

export default function ModalConfiguration({
  setShowConfiguration,
  openModal,
  setOpenModal,
  openAddWaiter,
  setOpenAddWaiter,
  id,
}) {
  return (
    <div className="fixed inset-0 z-30 flex flex-col justify-center w-1/2 h-full bg-white border-r-2 border-teal-500 border-y-2 rounded-r-md bg-opacity-90 lg:w-1/3">
      <div
        onClick={() => setShowConfiguration(false)}
        className="absolute top-2 right-2"
      >
        <IconClose />
      </div>
      <div className="flex flex-col justify-between h-2/3">
        <Link href={`/${id}/restaurant`}>
          <a className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-teal-300 rounded-r-md hover:bg-teal-400">
            Piantina
          </a>
        </Link>
        <div
          className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-teal-300 rounded-r-md hover:bg-teal-400"
          onClick={() => setOpenAddWaiter(true)}
        >
          Add Waiter
        </div>
        <div
          className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-teal-300 rounded-r-md hover:bg-teal-400"
          onClick={() => setOpenModal(true)}
        >
          Delete Restaurant
        </div>
        <Link href={"/home"}>
          <a className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-teal-300 rounded-r-md hover:bg-teal-400">
            Logout
          </a>
        </Link>
      </div>
      {openModal ? <ModalDeleteRestaurant setOpenModal={setOpenModal} /> : null}

      {openAddWaiter ? (
        <ModalAddWaiter id={id} setOpenAddWaiter={setOpenAddWaiter} />
      ) : null}
    </div>
  );
}
