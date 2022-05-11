import React, { useState } from "react";
import Image from "next/image";
import ModalAddRestaurant from "./modal/ModalAddRestaurant";
import IconPlusBig from "./icons/IconPlusBig";

export default function AddRestaurant({ setReload }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className="flex flex-row justify-center w-1/2 h-40 mx-auto my-24 border-2 rounded-md"
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
    </>
  );
}
