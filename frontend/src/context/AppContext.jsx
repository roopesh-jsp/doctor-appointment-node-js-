import { createContext, useContext, useEffect } from "react";
import { doctorsData } from "../data";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext({
  getAllDoctors: () => {},
  doctors: [],
  findDoctor: () => {},
  doctor: {},
  backendUrl: "",
  token: "",
  setToken: () => {},
  userData: {},
  setUserData: () => {},
  loadUserData: () => {},
});

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState();
  const [doctor, setDoctor] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState();

  //backend url
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //functions

  //fetching single doctor
  const findDoctor = async (docId) => {
    try {
      const { data } = await axios.get(backendUrl + `/doc/doctors/${docId}`);

      setDoctor(data.doctor);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    }
  };

  //getting doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/doc/doctors");
      console.log(data);

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //loading userData profile
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/profile", {
        headers: { token: token },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const ctxvalue = {
    doctors,
    getAllDoctors,
    findDoctor,
    doctor,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserData,
  };
  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setUserData(false);
    }
  }, []);

  return <AppContext.Provider value={ctxvalue}>{children}</AppContext.Provider>;
};

export const useAppContext = async () => {
  const data = useContext(AppContext);
  return data;
};

export default AppContextProvider;
