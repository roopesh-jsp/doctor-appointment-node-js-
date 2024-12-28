import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorContext = createContext({
  backendUrl: "",
  dtoken: "",
  setDToken: () => {},
  appointments: "",
  setAppointments: () => {},
  getAppointments: () => {},
  completeAppointment: () => {},
  cancleAppointment: () => {},
  getProfileData: () => {},
  profileData: [],
});

const DoctorContextProvider = ({ children }) => {
  const [dtoken, setDToken] = useState(localStorage.getItem("dtoken"));
  const [appointments, setAppointments] = useState([]);
  const [profileData, setProfileData] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //to get all the appoinments of the logged in doctor
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/doc/appointments", {
        headers: { dtoken: dtoken },
      });
      console.log(data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/doc/appointment-complete",
        { appointmentId },
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const cancleAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/doc/appointment-cancel",
        { appointmentId },
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/doc/profile", {
        headers: { dtoken },
      });
      console.log(data);

      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const ctxVal = {
    backendUrl,
    dtoken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancleAppointment,
    getProfileData,
    profileData,
  };
  return (
    <DoctorContext.Provider value={ctxVal}>{children}</DoctorContext.Provider>
  );
};

export function useDoctorContext() {
  const data = useContext(DoctorContext);
  return data;
}

export default DoctorContextProvider;
