import React from "react";
import FormAddRestaurant from "../form/FormAddRestaurant";

export default function ModalAddRestaurant({ setOpenModal }) {
  return (
    <div className="absolute inset-0 z-40 w-full h-full bg-white border-4 border-green-500 bg-opacity-80">
      <div
        onClick={() => setOpenModal(false)}
        className="absolute top-2 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 rounded-full hover:bg-red-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <FormAddRestaurant setOpenModal={setOpenModal} />
    </div>
  );
}
