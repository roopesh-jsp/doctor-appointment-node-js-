import express from "express";
import {
  addDoctor,
  adminLogin,
  AllDoctors,
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

export default adminRoutes;
