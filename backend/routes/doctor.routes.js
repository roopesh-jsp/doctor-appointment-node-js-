import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  docAppointments,
  doctorProfile,
  getDoctor,
  getDoctors,
  loginDoctor,
  updateDocProfile,
} from "../controllers/doctor.controller.js";
import authDoc from "../middlewares/doctorAuth.js";

const DoctorRoutes = express.Router();

DoctorRoutes.get("/doctors", getDoctors);

DoctorRoutes.get("/doctors/:docId", getDoctor);

DoctorRoutes.post("/login", loginDoctor);

DoctorRoutes.get("/appointments", authDoc, docAppointments);

DoctorRoutes.post("/appointment-cancel", authDoc, appointmentCancel);

DoctorRoutes.post("/appointment-complete", authDoc, appointmentComplete);

DoctorRoutes.get("/profile", authDoc, doctorProfile);

DoctorRoutes.post("/profile-update", authDoc, updateDocProfile);

export default DoctorRoutes;
