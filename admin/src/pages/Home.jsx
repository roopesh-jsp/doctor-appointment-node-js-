import React from "react";
import { useAdminContext } from "../context/adminContext";
import Login from "./Login";
import X from "./X";
import { ToastContainer } from "react-toastify";
import { useDoctorContext } from "../context/DoctorContext";

function Home() {
  const { adminToken } = useAdminContext();
  const { dtoken } = useDoctorContext();
  return (
    <div className="min-h-screen bg-slate-100">
      {adminToken || dtoken ? (
        <X />
      ) : (
        <>
          <Login />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default Home;
