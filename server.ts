import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// MongoDB Connection
const MONGO_URI = "mongodb+srv://nadamostafa5:Nadam@grad.httqa.mongodb.net/?retryWrites=true&w=majority&appName=grad";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};

// Define Plant Schema
const plantSchema = new mongoose.Schema({
  name: String,
  wateringSchedule: String,
  fertilizerPlan: String,
});

const Plant = mongoose.model("Plant", plantSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/plants", async (req: Request, res: Response) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

// Start Server
const PORT = 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
