import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    img: String,
    fees: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
