import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
// import connectDB from "./config/DB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoutes from "./routes/admin.routes.js";
import DoctorRoutes from "./routes/doctor.routes.js";
import UserRouter from "./routes/user.routes.js";

//app configuration
const app = express();
connectCloudinary();
//middleware
app.use(express.json());
app.use(cors());

//endpoints
app.use("/admin", adminRoutes);
app.use("/doc", DoctorRoutes);
app.use("/user", UserRouter);

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
