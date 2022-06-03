import React from "react";
import IconCancelledReservatio from "../icons/IconCancelledReservatio";
import IconConfirmedReserved from "../icons/IconConfirmedReserved";
import IconNoShow from "../icons/IconNoShow";
import IconSittingTable from "../icons/IconSittingTable";

export default function StateCurrent({ stateCurrent }) {
  return (
    <div>
      {stateCurrent === "reservation made" ? (
        <div className="p-2 border rounded-full bg-slate-200">
          <IconConfirmedReserved />
        </div>
      ) : stateCurrent === "sitting table" ? (
        <div className="p-2 bg-green-500 border rounded-full ">
          <IconSittingTable />
        </div>
      ) : stateCurrent === "cancelled reservation" ? (
        <div className="p-2 bg-red-500 border rounded-full">
          <IconCancelledReservatio />
        </div>
      ) : stateCurrent === "no show" ? (
        <div className="p-2 bg-red-500 border rounded-full">
          <IconNoShow />
        </div>
      ) : null}
    </div>
  );
}
