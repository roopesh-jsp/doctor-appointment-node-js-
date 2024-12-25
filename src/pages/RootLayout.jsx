import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppContextProvider from "../context/AppContext";

function RootLayout() {
  return (
    <AppContextProvider>
      <div className="mx-4 md:mx-[10%]">
        <Navbar />
        <Outlet />
      </div>
    </AppContextProvider>
  );
}

export default RootLayout;
