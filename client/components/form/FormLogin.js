import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { fetchLogin } from "../../AllFetchApi";
import RingLoader from "react-spinners/RingLoader";

export default function FormLogin({ changeForm }) {
  const { login } = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetchLogin(e, email, password, login, setLoading);
  };
  return (
    <div className="w-full font-mono">
      <form className="w-full mx-auto my-20 lg:w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 rounded-md shadow-md shadow-slate-400 bg-white">
          <div className="text-center text-green-500">Login</div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border-2 rounded-md border-slate-300"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border-2 rounded-md border-slate-300"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="text-green-500" onClick={() => changeForm(true)}>
            Register
          </div>

          <button
            type="submit"
            disabled={loading ? true : false}
            className="p-2 text-white bg-green-500 rounded-md flex flex-row justify-center"
          >
            {!loading ? (
              <div>Login</div>
            ) : (
              <RingLoader color="#ffffff" loading={loading} size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
