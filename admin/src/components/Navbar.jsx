import React from "react";
import { useAdminContext } from "../context/adminContext";
import { useDoctorContext } from "../context/DoctorContext";

function Navbar() {
  const { adminToken, setAdminToken } = useAdminContext();
  const { dtoken, setDToken } = useDoctorContext();
  function handleLogout() {
    setAdminToken("");
    setDToken("");
    adminToken && localStorage.removeItem("adminToken");
    dtoken && localStorage.removeItem("dtoken");
  }
  return (
    <div className="bg-white ">
      <div className="flex  gap-4 items-center justify-between px-5 py-2">
        <div className="flex gap-10 items-center justify-between px-4 py-2">
          <h1>Logo.</h1>
          <h3 className="border border-slate-400 rounded-full px-3 py-1 font-semibold">
            {adminToken ? "admin" : "doctor"}
          </h3>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-400 text-stone-50 rounded-full px-5 py-2 font-semibold"
        >
          logout
        </button>
      </div>
      <hr className=" w-full" />
    </div>
  );
}

export default Navbar;
