import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
