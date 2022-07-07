import React from "react";
import Navbar from "./navbar/Navbar";
import Form from "../components/form/Form";

export default function Layout() {
  return (
    <div className="w-full sfondo">
      <Navbar />
      <Form />
    </div>
  );
}
