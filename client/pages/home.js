import React, { useEffect, useState } from "react";

import AddRestaurant from "../components/AddRestaurant";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { getToken } from "../utils/token";
import NavBarUser from "../components/navbar/NavBarUser";

export default function home() {
  const [name, setName] = useState("");
  const router = useRouter();
  const token = getToken();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      setName(jwtDecode(token).user.name);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <NavBarUser name={name} />
      <AddRestaurant />
    </div>
  );
}
