import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI as string;
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};
connectDB();

app.use(cors({
  origin: ["http://localhost:19006", "http://192.168.1.100:5000/chat"], // Allow React Native app (adjust for Expo)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));


app.use(express.json());

// Gemini AI Route
app.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return; // Ensure function exits after sending the response
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    

    res.json({
      reply: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
    });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);

    // Forcefully cast the error as `any` to fix TypeScript issue
    const error = err as any;

    res.status(500).json({
      error: "Failed to process request",
      details: error.response?.data || error.message || "Unknown error occurred",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
