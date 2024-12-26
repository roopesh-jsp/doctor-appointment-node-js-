import express from "express";
import cors from "cors";
import "dotenv/config";

//app configuration
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//endpoints
app.get("/", (req, res) => {
  res.send("Hello World");
});

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
