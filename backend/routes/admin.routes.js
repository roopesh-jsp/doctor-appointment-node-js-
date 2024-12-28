import express from "express";
import {
  addDoctor,
  adminCancelAppointment,
  adminLogin,
  AllDoctors,
  getAllApointments,
} from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import checkAdminAuth from "../middlewares/adminAuth.js";
import { changeAvialability } from "../controllers/doctor.controller.js";

const adminRoutes = express.Router();

adminRoutes.post(
  "/add-doctor",
  checkAdminAuth,
  upload.single("img"),
  addDoctor
);

adminRoutes.post("/login", adminLogin);

adminRoutes.get("/doctors", checkAdminAuth, AllDoctors);

adminRoutes.post("/change-available", checkAdminAuth, changeAvialability);

adminRoutes.get("/appointments", checkAdminAuth, getAllApointments);

adminRoutes.post("/appointment-cancel", checkAdminAuth, adminCancelAppointment);

export default adminRoutes;
