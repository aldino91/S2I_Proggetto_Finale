import React, { useState } from "react";
import IconCancelledReservatio from "../icons/IconCancelledReservatio";
import IconClose from "../icons/IconClose";
import IconConfirmedReserved from "../icons/IconConfirmedReserved";
import IconSittingTable from "../icons/IconSittingTable";
import IconNoShow from "../icons/IconNoShow";
import BaseModal from "../modal/BaseModal";
import { stateReserved } from "../../utils/stateReserved";
import { fetchUpdateStateReserved } from "../../AllFetchApi";

export default function StateReserved({ state, res, reload, setReload }) {
  const stateCurrent = state.statereserved;

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {stateCurrent === "reservation made" ? (
        <button
          className="p-2 mr-4 border rounded-full bg-slate-200 hover:bg-slate-100"
          onClick={() => setShowModal(true)}
        >
          <IconConfirmedReserved />
        </button>
      ) : stateCurrent === "sitting table" ? (
        <button
          className="p-2 mr-4 bg-green-500 border rounded-full hover:bg-green-400"
          onClick={() => setShowModal(true)}
        >
          <IconSittingTable />
        </button>
      ) : stateCurrent === "cancelled reservation" ? (
        <button
          className="p-2 mr-4 bg-red-500 border rounded-full hover:bg-red-300"
          onClick={() => setShowModal(true)}
        >
          <IconCancelledReservatio />
        </button>
      ) : stateCurrent === "no show" ? (
        <button
          className="p-2 mr-4 bg-red-500 border rounded-full hover:bg-red-300"
          onClick={() => setShowModal(true)}
        >
          <IconNoShow />
        </button>
      ) : null}
      {showModal ? (
        <BaseModal>
          <div className="w-full mx-auto mt-10 mb-10 lg:w-2/4">
            <div
              className="absolute top-2 right-2"
              onClick={() => setShowModal(false)}
            >
              <IconClose />
            </div>
            <div className="flex flex-col w-5/6 p-3 mx-auto space-y-4 bg-white rounded-md shadow-md shadow-slate-400">
              <div className="font-medium text-left">
                <div className="flex flex-row justify-center space-x-2 overflow-scroll">
                  <div>{res.hour}</div>
                  <div>|</div>
                  <div>{res.pax}PAX</div>
                  <div>|</div>
                  <div className="capitalize">{res.Client.name}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {stateReserved.map((resp) => (
                  <div key={resp}>
                    {resp === "reservation made" ? (
                      <div
                        className={`flex flex-row items-center w-full p-2 border-2 rounded-md ${
                          stateCurrent === "reservation made"
                            ? "bg-cyan-300"
                            : "bg-white"
                        }`}
                      >
                        <button
                          className="p-2 mr-4 border rounded-full bg-slate-200 hover:bg-slate-100"
                          onClick={() =>
                            fetchUpdateStateReserved(
                              state.id,
                              "reservation made",
                              reload,
                              setReload,
                              setShowModal
                            )
                          }
                        >
                          <IconConfirmedReserved />
                        </button>
                        <div className="font-semibold capitalize">
                          Confirmed reservation
                        </div>
                      </div>
                    ) : resp === "sitting table" ? (
                      <div
                        className={`flex flex-row items-center w-full p-2 border-2 rounded-md ${
                          stateCurrent === "sitting table"
                            ? "bg-cyan-300"
                            : "bg-white"
                        }`}
                      >
                        <button
                          className="p-2 mr-4 bg-green-500 border rounded-full hover:bg-green-400"
                          onClick={() =>
                            fetchUpdateStateReserved(
                              state.id,
                              "sitting table",
                              reload,
                              setReload,
                              setShowModal
                            )
                          }
                        >
                          <IconSittingTable />
                        </button>
                        <div className="font-semibold capitalize">
                          seated customer
                        </div>
                      </div>
                    ) : resp === "cancelled reservation" ? (
                      <div
                        className={`flex flex-row items-center w-full p-2 border-2 rounded-md ${
                          stateCurrent === "cancelled reservation"
                            ? "bg-cyan-300"
                            : "bg-white"
                        }`}
                      >
                        <button
                          className="p-2 mr-4 bg-red-500 border rounded-full hover:bg-red-300"
                          onClick={() =>
                            fetchUpdateStateReserved(
                              state.id,
                              "cancelled reservation",
                              reload,
                              setReload,
                              setShowModal
                            )
                          }
                        >
                          <IconCancelledReservatio />
                        </button>
                        <div className="font-semibold capitalize">
                          canceled reserved
                        </div>
                      </div>
                    ) : resp === "no show" ? (
                      <div
                        className={`flex flex-row items-center w-full p-2 border-2 rounded-md ${
                          stateCurrent === "no show"
                            ? "bg-cyan-300"
                            : "bg-white"
                        }`}
                      >
                        <button
                          className="p-2 mr-4 bg-red-500 border rounded-full hover:bg-red-300"
                          onClick={() =>
                            fetchUpdateStateReserved(
                              state.id,
                              "no show",
                              reload,
                              setReload,
                              setShowModal
                            )
                          }
                        >
                          <IconNoShow />
                        </button>
                        <div className="font-semibold capitalize">No Show!</div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BaseModal>
      ) : null}
    </div>
  );
}
