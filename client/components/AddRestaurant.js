import React, { useState } from "react";
import Image from "next/image";
import ModalAddRestaurant from "./modal/ModalAddRestaurant";
import IconPlusBig from "./icons/IconPlusBig";

export default function AddRestaurant({ setReload }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="pt-11">
      <div
        className="flex flex-row justify-center w-1/2 h-40 mx-auto border-2 border-green-500 rounded-md bg-white hover:bg-gray-100"
        onClick={() => setOpenModal(true)}
      >
        <div className="flex flex-col justify-center w-auto h-auto">
          <IconPlusBig />
        </div>
        <div className="flex flex-col justify-center w-auto h-auto">
          <Image
            src="/icono-restaurante.png"
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
      </div>
      {/* Modal */}
      {openModal ? (
        <ModalAddRestaurant setOpenModal={setOpenModal} setReload={setReload} />
      ) : null}
    </div>
  );
}
