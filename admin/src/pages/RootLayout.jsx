import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RootLayout() {
  return (
    <div>
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default RootLayout;
