import { useContext } from "react";
import { createContext } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const ctxVal = {};
  return (
    <DoctorContext.Provider value={ctxVal}>{children}</DoctorContext.Provider>
  );
};

export function useDoctorContext() {
  const data = useContext(DoctorContext);
  return data;
}

export default DoctorContextProvider;
