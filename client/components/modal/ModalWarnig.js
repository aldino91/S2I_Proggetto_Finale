import React from "react";
import IconClose from "../icons/IconClose";
import IconConfiguration from "../icons/IconConfiguration";
import IconSittingTable from "../icons/IconSittingTable";
import BaseModal from "./BaseModal";

export default function ModalWarnig({ setShowModalWarning }) {
  return (
    <BaseModal>
      <div
        className="absolute top-2 right-2"
        onClick={() => setShowModalWarning(false)}
      >
        <IconClose />
      </div>

      <div className="flex flex-col justify-center w-2/3 mx-auto border-2 border-green-500 rounded-md my-28 bg-opacity-50 h-1/3 bg-black">
        <div className="text-center mb-7 text-white flex flex-col items-center lg:flex-row lg:justify-around">
          <p>Prima d'iniziare a usare l'app, vai a configurazioni</p>
          <IconConfiguration /> <p>e aggiungi i WAITERS e i TAVOLI</p>
        </div>
      </div>
    </BaseModal>
  );
}
