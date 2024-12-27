import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const adminContext = createContext({
  adminToken: "",
  setAdminToken: () => {},
  backendUrl: "",
});

const AdminContextProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const ctxVal = {
    adminToken,
    setAdminToken,
    backendUrl,
  };
  return (
    <adminContext.Provider value={ctxVal}>{children}</adminContext.Provider>
  );
};

export function useAdminContext() {
  const data = useContext(adminContext);
  return data;
}

export default AdminContextProvider;
