import React from "react";
import { useAdminContext } from "../context/adminContext";
import Login from "./Login";
import X from "./X";
import { ToastContainer } from "react-toastify";

function Home() {
  const { adminToken } = useAdminContext();
  return (
    <div className="min-h-screen bg-slate-100">
      {adminToken ? (
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
