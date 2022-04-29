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
        console.log("usuario registrato correttamente!");
      });
    toast.success("I dati sono stati registrati");
    e.target.reset();
    changeForm(false);
  } catch (error) {
    toast.error("C'é stato un errore nella registarzione!");
    console.log(error);
  }
};

export const fetchLogin = async (e, email, password, login) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_LOGIN}`;
    await axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp?.data.token) {
          login(resp.data.token);
        } else {
          toast.error("Email o password errata!");
        }
      });
    e.target.reset();
  } catch (error) {
    toast.error("Email o password errata!");
    console.log(error);
  }
};
