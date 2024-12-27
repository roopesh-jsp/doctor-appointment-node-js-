import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

const adminContext = createContext({
  adminToken: "",
  setAdminToken: () => {},
  backendUrl: "",
  doctors: [],
  getAllDoctors: () => {},
  changeAvailability: () => {},
});

const AdminContextProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [doctors, setDoctors] = useState([]);

  //getting backend url
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //getting doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/doctors", {
        headers: { adminToken },
      });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //chaanging availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/admin/change-available",
        { docId },
        { headers: { adminToken } }
      );
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ctxVal = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
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
