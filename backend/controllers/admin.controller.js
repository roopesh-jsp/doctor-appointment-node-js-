import Doctor from "../models/doctor.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    //geting values
    const { name, email, password, type, fees, available } = req.body;
    const img = req.file;

    //validating fields
    if (!name || !email || !password || !type || !img || !fees || !available) {
      throw new Error("All fields are required");
    }

    //checking if email already exists
    const checkMail = await Doctor.findOne({ email: email });
    if (checkMail) {
      throw new Error("Email already exists");
    }

    //validating email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }

    //hashing passwoerd
    const hashedpw = await bcrypt.hash(password, 10);

    //uploading image to cloudinary
    const imgUpload = await cloudinary.uploader.upload(img.path);
    const imgUrl = imgUpload.secure_url;

    //saving doctor to database
    const doctor = new Doctor({
      name,
      email,
      password: hashedpw,
      type,
      img: imgUrl,
      fees,
      available: true,
    });
    doctor.save();

    //sending success response
    return res.status(200).json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    //sending error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(
      email,
      password,
      process.env.ADMIN_MAIL,
      process.env.ADMIN_PASSWORD
    );

    //validating fields
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    if (
      email !== process.env.ADMIN_MAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      throw new Error("Invalid Credentials");
    }

    //generating jwt token
    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    //sending success response
    res.status(200).json({
      success: true,
      token: token,
      message: "Login Successful",
    });
  } catch (error) {
    //sending error response
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addDoctor, adminLogin };
