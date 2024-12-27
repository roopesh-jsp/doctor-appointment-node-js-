import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import AppContextProvider from "./context/appContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import AdminContextProvider from "./context/adminContext.jsx";
import Login from "./pages/Login.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//     ],
//   },
// ]);
function App() {
  return (
    <AppContextProvider>
      <DoctorContextProvider>
        <AdminContextProvider>
          <Home />
        </AdminContextProvider>
      </DoctorContextProvider>
    </AppContextProvider>
  );
}

export default App;
