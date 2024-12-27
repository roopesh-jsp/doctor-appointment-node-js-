import { useContext } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const ctxVal = {};
  return <AppContext.Provider value={ctxVal}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const data = useContext(AppContext);
  return data;
}

export default AppContextProvider;
