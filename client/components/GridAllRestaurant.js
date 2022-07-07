import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GridAllRestaurant({ allRestaurant }) {
  const toDay = new Date();

  const day = toDay.getDate();
  const month = toDay.getMonth() + 1;
  const year = toDay.getFullYear();

  const data = `${day + "-" + month + "-" + year}`;

  const timezone = "lunch";

  return (
    <div className="grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 md:gap-2 lg:grid-cols-4 lg:gap-4 ">
      {allRestaurant.map((rest) => (
        <Link href={`/${rest.id}/${timezone}/${data}`} key={rest.id}>
          <a className="flex flex-col justify-around w-40 h-40 mx-auto border-2 border-green-500 rounded-md hover:bg-gray-100 bg-white">
            <div className="flex flex-row justify-center w-full">
              <Image
                src="/icono-restaurante.png"
                alt="Picture of the author"
                width={45}
                height={45}
              />
            </div>
            <div className="w-full text-center underline capitalize">
              {rest.name}
            </div>
            <div className="w-full text-center capitalize">{rest.city}</div>
            <div className="w-full text-center capitalize">{rest.address}</div>
          </a>
        </Link>
      ))}
    </div>
  );
}
