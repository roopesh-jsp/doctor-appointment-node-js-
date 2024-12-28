import validator from "validator";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudnary } from "cloudinary";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.models.js";
import { sendGMail } from "../config/nodemailer.js";

// import { transporter } from "../config/nodemailer.js";
let jobs = {};
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

    //sending mail of appointment booked
    sendGMail({
      to: userData.email,
      subject: "sucessfully booked the appoitment",
      text: `you have booked the appointment with the doctor ${docData.name}
      on the day of ${slotDate} at ${slotTime} utlise your slot on right time, thank you `,
    });

    //sending mail on missing appointment
    const [day, month, year] = slotDate.split("_");
    const formattedDate = `${year}-${month}-${day}`;

    // Convert the slotTime (04:00 PM) to 24-hour format
    function convertTo24Hour(time) {
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart.split(":");

      if (modifier === "PM" && hours !== "12") {
        hours = parseInt(hours) + 12;
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }

      return `${hours}:${minutes}`;
    }

    const formattedTime = convertTo24Hour(slotTime);

    //Combine the formattedDate and formattedTime
    const appointmentDateTime = new Date(
      `${formattedDate}T${formattedTime}:00`
    );
    console.log(appointmentDateTime);
    const reminderTime = new Date(
      appointmentDateTime.getTime() + 15 * 60 * 1000
    ); // 15 minutes after appointment

    const delay = reminderTime.getTime() - new Date().getTime();

    const fun = async () => {
      const appoinment = await Appointment.findById(newAppointment._id);

      if (!appoinment.isCompleted) {
        sendGMail({
          to: userData.email,
          subject: "you have missed the appointment",
          text: `you have missed the appointment with the doctor ${docData.name}
          on the day of ${slotDate} at ${slotTime} reschdule ypuself with confortable date and time , thank you `,
        });
      }
    };

    const job = setTimeout(() => {
      fun();
    }, 10 * 1000);

    jobs[newAppointment._id] = job;
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

// get user appointments
const getAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await Appointment.find({ userId });
    res.json({
      success: true,
      appointments,
      message: "appointments fetched",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      throw new Error("noot authorized");
    }

    //canceling appointment via appoinment model
    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    //updateing doctors slots
    const { docId, slotTime, slotDate } = appointmentData;

    const doctorData = await Doctor.findById(docId);

    //removing slot
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate]?.filter(
      (ele) => ele !== slotTime
    );

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    //sending response
    res.json({
      success: true,
      message: "appointment cancelled",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const sendMail = async (req, res) => {
  try {
    sendGMail({
      to: "rupzkumar5@gmail.com",
      subject: "testing",
      text: "lorem test purpose",
    });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
};
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getAppointments,
  cancelAppointment,
  sendMail,
  jobs,
};
