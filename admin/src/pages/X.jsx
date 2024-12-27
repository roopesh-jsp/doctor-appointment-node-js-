import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../context/SideBar";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AddDoctor from "./admin/AddDoctor";
import AllApointments from "./admin/Apointments";
import DoctorList from "./admin/DoctorList";
import Apointments from "./admin/Apointments";
import { ToastContainer } from "react-toastify";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <></>,
//   },
//   {
//     path: "/addDoc",
//     element: <AddDoctor />,
//   },
//   {
//     path: "/Apointments",
//     element: <AllApointments />,
//   },
//   {
//     path: "/doctors",
//     element: <DoctorList />,
//   },
//   {
//     path: "/admin-dashboard",
//     element: <AdminDashboard />,
//   },
// ]);

function X() {
  return (
    <div className="md:w-[90%] mx-auto">
      <Navbar />
      <div className="flex gap-3 ">
        <SideBar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/addDoc" element={<AddDoctor></AddDoctor>} />
          <Route path="/Appointments" element={<Apointments></Apointments>} />
          <Route path="/doctors" element={<DoctorList></DoctorList>} />
        </Routes>
        <ToastContainer />
        {/* <RouterProvider router={router} /> */}
      </div>
    </div>
  );
}

export default X;
