import React, { useState } from "react";
import IconPlusBig from "./icons/IconPlusBig";
import Image from "next/image";
import ModalAddTable from "../components/modal/ModalAddTable";
import IconBack from "./icons/IconBack";
import { useRouter } from "next/router";

export default function AddTables() {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="absolute p-2 rounded-md top-2 left-2 hover:bg-green-300 md:mr-10"
      >
        <IconBack />
      </div>
      <div
        className="flex flex-row justify-center w-2/3 mx-auto my-16 border-2 rounded-md md:w-1/2 h-28"
        onClick={() => setOpenModal(true)}
      >
        <div className="flex flex-col justify-center w-auto h-auto">
          <IconPlusBig />
        </div>
        <div className="flex flex-col justify-center w-auto h-auto">
          <Image
            src="/Icon-table.png"
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
      </div>

      {openModal ? <ModalAddTable setOpenModal={setOpenModal} /> : null}
    </>
  );
}
