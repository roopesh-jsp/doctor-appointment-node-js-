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
  getAllAppointments: () => {},
  appointments: [],
  cancelAppointment: () => {},
});

const AdminContextProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken")
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

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

  //getting all appointment
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/admin/appointments", {
        headers: { adminToken },
      });
      setAppointments(data.appointments);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/admin/appointment-cancel",
        { appointmentId },
        { headers: { adminToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const ctxVal = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    getAllAppointments,
    appointments,
    cancelAppointment,
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
