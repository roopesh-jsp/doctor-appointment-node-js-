import Doctor from "../models/doctor.model.js";

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

export { changeAvialability, getDoctors, getDoctor };
