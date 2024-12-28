import express from "express";
import {
  bookAppointment,
  getProfile,
  loginUser,
  registerUser,
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

export default UserRouter;
