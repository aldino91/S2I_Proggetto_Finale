import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full">
      <Navbar />

      {children}
    </div>
  );
}
