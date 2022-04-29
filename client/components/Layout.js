import React from "react";
import Navbar from "./navbar/Navbar";
import Form from "../components/form/Form";
import useAuth from "../hooks/useAuth";

export default function Layout() {
  const { auth } = useAuth();

  return (
    <div className="w-full">
      <Navbar />
      <Form />
    </div>
  );
}
