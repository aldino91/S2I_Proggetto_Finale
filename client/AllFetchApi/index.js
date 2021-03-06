import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utils/token";
import jwtDecode from "jwt-decode";

export const fetchRegister = async (e, name, email, password, setLoading) => {
  try {
    await setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_URL_REGISTER}`;
    await axios
      .post(url, {
        name: name,
        email: email,
        password: password,
      })
      .then((resp) => {
        setLoading(false);
        toast.success("Usuario registrato! Vai al Login!");
        e.target.reset();
      });
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Usuario giá registrato! Vai al Login!");
      setLoading(false);
    } else {
      toast.error("C'é stato un errore nella registrazione!");
      setLoading(false);
    }
  }
};

export const fetchLogin = async (e, email, password, login, setLoading) => {
  try {
    await setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_URL_LOGIN}`;
    await axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp?.data.token) {
          login(resp.data.token);
          setLoading(false);
          e.target.reset();
        } else {
          toast.error("Email o password errata!");
          setLoading(false);
        }
      });
  } catch (error) {
    toast.error("Email o password errata!");
    setLoading(false);
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
  setOpenModal,
  setLoading
) => {
  const token = getToken();
  const idUser = jwtDecode(token).user.id;
  const url = process.env.NEXT_PUBLIC_URL_RESTAURANTS;

  try {
    await setLoading(true);
    await axios.post(url, {
      name: name,
      city: city,
      telephone: telephone,
      address: address,
      idUser,
    });
    toast.success("Il nuovo ristorante é stato salvato!");
    setLoading(false);
    setOpenModal(false);
    e.target.reset();
  } catch (error) {
    console.log(error);
    toast.error("Non é stato possibile registrare il nuovo ristorante!");
    setLoading(false);
  }
};

export const fetchGetRestaurant = async (idUser, setAllRestaurant) => {
  const url = `${process.env.NEXT_PUBLIC_URL_RESTAURANTS}/${idUser}`;
  try {
    const resp = await axios.get(url);
    setAllRestaurant(resp.data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataRestaurant = async (id, setData) => {
  const url = `${process.env.NEXT_PUBLIC_URL_RESTAURANTS}/data/${id}`;
  try {
    const resp = await axios.get(url);
    setData(resp.data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteRestaurant = async (id, router, setLoading) => {
  const url = `${process.env.NEXT_PUBLIC_URL_RESTAURANTS}/delete/${id}`;
  try {
    setLoading(true);
    await axios.delete(url);
    toast.success("I dati sono stati cancellati con successo!");
    setLoading(false);
    router.push("/home");
  } catch (error) {
    toast.error("Abbiamo problemi ad eliminarlo!");
    router.back();
    console.log(error);
  }
};

export const fetchAddReserved = async (
  e,
  pax,
  name,
  telephone,
  hour,
  day,
  waiter,
  idRestaurant,
  timezone,
  setLoading,
  setOpenModal,
  reload,
  setReload
) => {
  const url = process.env.NEXT_PUBLIC_URL_RESERVED;
  try {
    setLoading(true);
    await axios.post(url, {
      pax: pax,
      client: name,
      telephone: telephone,
      hour: hour,
      data: day,
      waiter: waiter,
      idRestaurant: idRestaurant,
      timezone: timezone,
    });
    toast.success("prenotazione realizzata");
    setLoading(false);
    setOpenModal(false);
    setReload(!reload);
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("Abbiamo problemi a realizzare la prenotazione!");
  }
};

export const fetchUpdateReserved = async (
  pax,
  hour,
  data,
  waiter,
  idRestaurant,
  timezone,
  idReserved,
  idState,
  setShowIconEdit,
  setLoading,
  reload,
  setReload
) => {
  const url = process.env.NEXT_PUBLIC_URL_RESERVED;
  try {
    setLoading(true);
    await axios.put(url, {
      pax,
      hour,
      data,
      waiter,
      idRestaurant,
      timezone,
      idReserved,
      idState,
    });
    await setShowIconEdit(false);
    await setLoading(false);
    await setReload(!reload);
  } catch (error) {
    toast.error("Non riusciamo ad aggiornarlo!!");
    console.log(error);
  }
};

export const GetReserved = async (id, day, setallReservedTimeZone) => {
  const url = `${process.env.NEXT_PUBLIC_URL_RESERVED}?idRestaurant=${id}&data=${day}`;
  try {
    const resp = await axios.get(url);
    setallReservedTimeZone(resp.data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAddWaiter = async (
  e,
  name,
  idRestaurant,
  setReload,
  reload,
  setLoading
) => {
  const url = process.env.NEXT_PUBLIC_URL_WAITERS;

  try {
    setLoading(true);
    await axios.post(url, {
      name: name,
      idRestaurant: idRestaurant,
    });
    setReload(!reload);
    toast.success("Il cameriere é stato salvato!!");
    setLoading(false);
    e.target.reset();
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetWaiters = async (id, setAllWaiters) => {
  const url = `${process.env.NEXT_PUBLIC_URL_WAITERS}/${id}`;

  try {
    const resp = await axios.get(url);
    await setAllWaiters(resp.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteWaiter = async (id, setReload, reload) => {
  const url = `${process.env.NEXT_PUBLIC_URL_WAITERS}/${id}`;
  try {
    await axios.delete(url);
    setReload(!reload);
    toast.success("Cameriere eliminato!!");
  } catch (error) {
    console.log(error);
    toast.error("Abbiamo problemi ad eliminarlo!");
  }
};

export const fetchUpdateStateReserved = async (
  id,
  statereserved,
  reload,
  setReload,
  setShowModal
) => {
  const url = process.env.NEXT_PUBLIC_URL_UPDATE_STATE_RESERVED;
  const query = `?id=${id}&statereserved=${statereserved}`;
  try {
    await axios.put(url + query);
    await setReload(!reload);
    setShowModal(false);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAddTable = async (
  e,
  name,
  id,
  setLoading,
  realod,
  setRealod
) => {
  const url = process.env.NEXT_PUBLIC_URL_TABLES;

  try {
    setLoading(true);
    await axios.post(url, { name: name, idRestaurant: id });
    toast.success("tavolo salvato");
    setLoading(false);
    setRealod(!realod);
    e.target.reset();
  } catch (error) {
    console.log(error);
    toast.error("Non riusciamo a salvare il tavolo!");
    setLoading(false);
  }
};

export const fetchGetTable = async (id, setAllTables, controlTables) => {
  const url = `${process.env.NEXT_PUBLIC_URL_TABLES}/${id}`;
  try {
    const tables = await axios.get(url);
    await setAllTables(tables.data);
    return tables.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSaveTables = async (
  idReserved,
  idRestaurant,
  tables,
  setShowModalTable,
  router
) => {
  const url = process.env.NEXT_PUBLIC_URL_TABLES;
  const query = `?idReserved=${idReserved}&idRestaurant=${idRestaurant}&tables=${tables}`;
  try {
    await axios.put(url + query);
    await setShowModalTable(false);
    await router.reload();
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteTables = async (id, reload, setRealod) => {
  const url = `${process.env.NEXT_PUBLIC_URL_TABLES}/${id}`;

  try {
    await axios.delete(url);
    toast.success("Tavolo eliminato con successo!");
    setRealod(!reload);
  } catch (error) {
    console.log(error);
  }
};
