import React from "react";
import { useState } from "react";
import { useAdminContext } from "../context/adminContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("admin");

  const { setAdminToken, backendUrl } = useAdminContext();
  console.log(backendUrl);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enteredData = Object.fromEntries(formData);
    try {
      if (state === "admin") {
        const { data } = await axios.post(
          backendUrl + "/admin/login",
          enteredData
        );
        console.log(data);

        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border w-[400px] px-10 py-5 mt-10 mx-auto shadow-lg">
      <h1 className="text-slate-700 font-bold text-2xl capitalize">
        {" "}
        {state} login{" "}
      </h1>
      <form className="flex flex-col gap-4 my-3" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={`${state} mail`}
          className="border border-slate-300 px-2 py-1 rounded-sm "
        />
        <input
          type="password"
          name="password"
          placeholder={`${state} password`}
          className="border border-slate-300 px-2 py-1 rounded-sm "
        />
        <button
          className="bg-blue-400
          mt-2
        py-2 rounded-lg text-stone-100 font-bold"
        >
          LOGIN
        </button>
        <p className="font-light text-sm mx-1">
          want to log in as{" "}
          <span
            className="text-blue-700 cursor-pointer font-bold underline"
            onClick={() =>
              setState((prev) => (prev === "admin" ? "doctor" : "admin"))
            }
          >
            {state === "admin" ? "doctor" : "admin"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
