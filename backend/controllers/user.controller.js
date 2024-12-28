import validator from "validator";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudnary } from "cloudinary";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.models.js";

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    //checking values
    if (!name || !password || !email) {
      throw new Error("all fileds are required");
    }

    //validating email
    if (!validator.isEmail(email)) {
      throw new Error("enter valid email");
    }

    //checking for email duplication
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);

      throw new Error("user already exists");
    }

    //hashing password
    const hashedPw = await bcrypt.hash(password, 10);

    //saving user to DB
    const newUser = new User({
      name,
      password: hashedPw,
      email,
    });
    const user = await newUser.save();

    //generating Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //sending response
    res.json({
      success: true,
      message: "user registered",
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking for user existance
    const isUser = await User.findOne({ email });
    if (!isUser) {
      throw new Error("User didnt exist try register");
    }

    //compare passwords
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      throw new Error("invalid credentials");
    }

    //creating token
    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET);

    //sending response
    res.json({
      success: true,
      message: "user loged in",
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phoneNo, age, gender } = req.body;
    const image = req.file;
    if (!name) {
      throw new Error("name is required");
    }

    //updateing profile
    const user = await User.findByIdAndUpdate(userId, {
      name,
      phoneNo,
      age,
      gender,
    });

    //updating image if given
    if (image) {
      const imgUpload = await cloudnary.uploader.upload(image.path, {
        resource_type: "image",
      });

      const imgUrl = imgUpload.secure_url;
      await User.findByIdAndUpdate(userId, { img: imgUrl });
    }

    const updatedUser = await user.save();
    //sending response
    res.json({
      success: true,
      user: updatedUser,
      message: "user updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    //taking values
    const { userId, docId, slotDate, slotTime } = req.body;

    //getting doctor data
    const docData = await Doctor.findById(docId).select("-password");

    //checking doctor avialbility
    if (!docData.available) {
      throw new Error("doctor not available");
    }

    let slots_booked = docData.slots_booked;

    //checking for slots avaliability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        throw new Error("doctor slot was not available");
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    //getting userData
    const userData = await User.findById(userId).select("-password");

    delete docData.slots_booked;

    //saving appointment
    const newAppointment = new Appointment({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await newAppointment.save();

    //updating slots of doctor
    await Doctor.findByIdAndUpdate(docId, { slots_booked: slots_booked });

    //sending responsee
    res.json({
      success: true,
      message: "slot booked",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };
