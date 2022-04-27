import React from "react";

export default function FormLogin({ changeForm }) {
  return (
    <div className="w-full font-mono">
      <form
        className="w-full mx-auto my-20 lg:w-1/2" /* onSubmit={handleSubmit} */
      >
        <div className="flex flex-col w-2/3 p-3 mx-auto space-y-4 rounded-md shadow-md shadow-slate-400">
          <div className="text-center text-green-500">Login</div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border-2 rounded-md border-slate-300"
            required
            /* onChange={(e) => {
          setCity(e.target.value);
        }} */
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border-2 rounded-md border-slate-300"
            required
            /*  onChange={(e) => {
          setTemp(e.target.value);
        }} */
          />
          <div className="text-green-500" onClick={() => changeForm(true)}>
            Register
          </div>

          <button
            type="submit"
            className="p-2 text-white bg-green-500 rounded-md"
          >
            Login
            {/* {!loading ? (
          "Send"
        ) : (
          <ClipLoader color="#ffffff" loading={loading} size={20} />
        )} */}
          </button>
        </div>
      </form>
    </div>
  );
}
