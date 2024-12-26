import express from "express";
import { addDoctor, adminLogin } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import checkAdminAuth from "../middlewares/adminAuth.js";

const adminRoutes = express.Router();

adminRoutes.post(
  "/add-doctor",
  checkAdminAuth,
  upload.single("image"),
  addDoctor
);

adminRoutes.post("/login", adminLogin);

export default adminRoutes;
