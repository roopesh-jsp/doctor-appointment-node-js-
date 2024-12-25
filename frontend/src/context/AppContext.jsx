import { createContext } from "react";

export const AppContext = createContext();

import { doctorsData } from "../data";

const AppContextProvider = ({ children }) => {
  const findDoctor = (id) => {
    return doctorsData.find((doctor) => doctor.id === Number(id));
  };

  const ctxvalue = {
    doctors: doctorsData,
    findDoctor,
  };
  return <AppContext.Provider value={ctxvalue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
