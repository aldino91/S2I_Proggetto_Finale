import React, { useState } from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

export default function Form() {
  const [signUp, setSignUp] = useState(false);

  const changeForm = (params) => {
    setSignUp(params);
  };

  return signUp === false ? (
    <FormLogin changeForm={changeForm} />
  ) : (
    <FormRegister changeForm={changeForm} />
  );
}
