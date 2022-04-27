import axios from "axios";
import { toast } from "react-toastify";

export const fetchRegister = async (e, name, email, password, changeForm) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_REGISTER}`;
    await axios
      .post(url, {
        name: name,
        email: email,
        password: password,
      })
      .then((resp) => {
        console.log(resp);
      });
    toast.success("I dati sono stati registrati");
    e.target.reset();
    changeForm(false);
  } catch (error) {
    toast.error("C'é stato un errore nella registarzione!");
    console.log(error);
  }
};
