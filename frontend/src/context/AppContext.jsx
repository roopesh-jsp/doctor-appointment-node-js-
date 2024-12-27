import { createContext, useContext } from "react";
import { doctorsData } from "../data";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext({
  getAllDoctors: () => {},
  doctors: [],
  findDoctor: () => {},
  doctor: {},
});

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState();
  const [doctor, setDoctor] = useState({});

  //fetching single doctor
  const findDoctor = async (docId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/doc/doctors/${docId}`
      );

      setDoctor(data.doctor);
    } catch (error) {
      // toast.error(error.message);
    }
  };

  //backend url
  // const backendUrl = process.meta.env.VITE_BACKEND_URL;

  //getting doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000" + "/doc/doctors"
      );
      console.log(data);

      if (data.success) {
        setDoctors(data.doctors);
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
  };

  return <AppContext.Provider value={ctxvalue}>{children}</AppContext.Provider>;
};

export const useAppContext = async () => {
  const data = useContext(AppContext);
  return data;
};

export default AppContextProvider;
