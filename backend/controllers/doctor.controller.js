import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.models.js";
import { jobs } from "./user.controller.js";

const changeAvialability = async (req, res) => {
  try {
    const { docId } = req.body;
    const doc = await Doctor.findById(docId);
    await Doctor.findByIdAndUpdate(docId, { available: !doc.available });
    res.json({
      success: true,
      message: "available changed",
    });
  } catch (error) {
    //sending error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      message: "doctors fetched",
      doctors,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctor = async (req, res) => {
  try {
    const { docId } = req.params;
    const doctor = await Doctor.findById(docId).select(["-password", "-email"]);
    res.json({
      success: true,
      message: "doctor fetched",
      doctor,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("doc");

    // console.log(email, password);

    if (!email || !password) {
      throw new Error("invalid credentials");
    }
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new Error("invalid credentials");
    }
    // console.log(doctor);

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      throw new Error("invalid credentials");
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      message: "doctor logged in",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

//to get doctor specific appointments to doctor panel
const docAppointments = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await Appointment.find({ docId });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.docId !== docId) {
      throw new Error("invalid user");
    }

    await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });

    //clearing timeout setted for sending email on missing appointment
    clearTimeout(jobs[appointmentId]);

    res.json({
      success: true,
      message: "Appointment completed",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData && appointmentData.docId !== docId) {
      throw new Error("invalid user");
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    //clearing timeout setted for sending email on missing appointment
    clearTimeout(jobs[appointmentId]);

    res.json({
      success: true,
      message: "Appointment cancelled",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

//get doctors profile data

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await Doctor.findById(docId).select("-password");

    res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

const updateDocProfile = async (req, res) => {
  try {
    const { fees, available, docId } = req.body;

    await Doctor.findByIdAndUpdate(docId, { fees, available });

    res.json({
      success: true,
      message: "profile updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

export {
  changeAvialability,
  getDoctors,
  getDoctor,
  loginDoctor,
  docAppointments,
  appointmentCancel,
  appointmentComplete,
  doctorProfile,
  updateDocProfile,
};
