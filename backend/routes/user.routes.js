import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getAppointments,
  getProfile,
  loginUser,
  registerUser,
  sendMail,
  updateProfile,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";
const UserRouter = express.Router();

UserRouter.post("/register", registerUser);

UserRouter.post("/login", loginUser);

UserRouter.get("/profile", authUser, getProfile);

UserRouter.post(
  "/update-profile",
  upload.single("img"),
  authUser,
  updateProfile
);

UserRouter.post("/book-appointment", authUser, bookAppointment);

UserRouter.get("/my-appointments", authUser, getAppointments);

UserRouter.post("/cancel-appointment", authUser, cancelAppointment);

UserRouter.get("/mail", sendMail);

export default UserRouter;
