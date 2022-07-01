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
    <div className="fixed inset-0 z-30 w-full bg-black bg-opacity-20">
      <div className="w-2/3 md:w-1/3 flex flex-col justify-center h-full bg-white border-r-2 border-green-400 border-y-2 rounded-r-md bg-opacity-90 relative shadow-2xl shadow-black">
        <div
          onClick={() => setShowConfiguration(false)}
          className="absolute top-2 right-2"
        >
          <IconClose />
        </div>
        <div className="flex flex-col justify-between h-2/3">
          <Link href={`/${id}/restaurant`}>
            <a className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-green-400 rounded-r-md hover:bg-green-300">
              Piantina
            </a>
          </Link>
          <div
            className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-green-400 rounded-r-md hover:bg-green-300 cursor-pointer"
            onClick={() => setOpenAddWaiter(true)}
          >
            Add Waiter
          </div>
          <div
            className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-green-400 rounded-r-md hover:bg-green-300 cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            Delete Restaurant
          </div>
          <Link href={"/home"}>
            <a className="w-3/4 p-2 text-white transition-all duration-300 ease-in bg-green-400 rounded-r-md hover:bg-green-300 cursor-pointer">
              Logout
            </a>
          </Link>
        </div>
      </div>
      {openModal ? <ModalDeleteRestaurant setOpenModal={setOpenModal} /> : null}

      {openAddWaiter ? (
        <ModalAddWaiter id={id} setOpenAddWaiter={setOpenAddWaiter} />
      ) : null}
    </div>
  );
}
