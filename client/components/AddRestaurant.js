import React, { useState } from "react";
import Image from "next/image";
import ModalAddRestaurant from "./modal/ModalAddRestaurant";

export default function AddRestaurant() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div
        className="flex flex-row justify-center w-1/2 h-40 mx-auto my-24 border-2 rounded-md"
        onClick={() => setOpenModal(true)}
      >
        <div className="flex flex-col justify-center w-auto h-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
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
      {openModal ? <ModalAddRestaurant setOpenModal={setOpenModal} /> : null}
    </>
  );
}
