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
import DoctorAppointments from "./doctor/DoctorAppointments";
import DoctorProfile from "./doctor/DoctorProfile";

function X() {
  return (
    <div className="md:w-[90%] mx-auto">
      <Navbar />
      <div className="flex gap-3 ">
        <SideBar />
        <Routes>
          {/* admin routes */}
          <Route path="/" element={<></>} />
          <Route path="/addDoc" element={<AddDoctor></AddDoctor>} />
          <Route path="/Appointments" element={<Apointments></Apointments>} />
          <Route path="/doctors" element={<DoctorList></DoctorList>} />

          {/* doctor routes */}
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
        <ToastContainer />
        {/* <RouterProvider router={router} /> */}
      </div>
    </div>
  );
}

export default X;
