import express from "express";
import { getDoctor, getDoctors } from "../controllers/doctor.controller.js";

const DoctorRoutes = express.Router();

DoctorRoutes.get("/doctors", getDoctors);

DoctorRoutes.get("/doctors/:docId", getDoctor);

export default DoctorRoutes;
