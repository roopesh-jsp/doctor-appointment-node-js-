import React from "react";
import { useAdminContext } from "../context/adminContext";
import Login from "./Login";
import X from "./X";

function Home() {
  const { adminToken } = useAdminContext();
  return <div>{adminToken ? <X /> : <Login />}</div>;
}

export default Home;
