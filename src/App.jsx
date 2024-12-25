import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";
import Profile from "./pages/profile";
import Login from "./pages/Login";
import Doctor from "./pages/Doctor";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/doctors", element: <Doctors /> },
      // { path: "/doctors/:type", element: <Doctors /> },
      {
        path: "/doctors/:Did",
        element: <Doctor />,
      },
      {
        path: "/myAppoitments",
        element: <MyAppointments />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  // return <div className="mx-4 md:mx-[10%]">App</div>;
  return <RouterProvider router={Routes} />;
}

export default App;
