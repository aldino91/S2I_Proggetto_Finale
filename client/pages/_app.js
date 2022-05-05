import '../styles/globals.css'

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { setToken, getToken, removeToken } from "../utils/token";

import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).user.id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    toast.success(`Welcome ${jwtDecode(token).user.name}!`);
    setAuth({
      token,
      idUser: jwtDecode(token).user.id,
    });
    router.push("/home");
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      toast.success("A presto!");
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
      />
    </AuthContext.Provider>
  );
}

export default MyApp
