import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utils/token";
import jwtDecode from "jwt-decode";

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

export const getAuthentication = () => {
  const token = getToken();

  const url = `${process.env.NEXT_PUBLIC_URL_AUTHENTICATION}`;

  return axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchAddRestaurant = async (
  e,
  name,
  city,
  telephone,
  address,
  setOpenModal
) => {
  const token = getToken();
  const idUser = jwtDecode(token).user.id;
  const url = process.env.NEXT_PUBLIC_URL_ADD_RESTAURANT;

  try {
    await axios.post(url, {
      name: name,
      city: city,
      telephone: telephone,
      address: address,
      idUser,
    });
    toast.success("Il nuovo ristorante é stato salvato!");
    setOpenModal(false);
    e.target.reset();
  } catch (error) {
    console.log(error);
    toast.error("Non é stato possibile registrare il nuovo ristorante!");
  }
};

export const fetchGetRestaurant = async (idUser, setAllRestaurant) => {
  const url = process.env.NEXT_PUBLIC_URL_GET_RESTAURANT;
  try {
    const resp = await axios.get(url + idUser);
    console.log(resp);
    setAllRestaurant(resp.data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
