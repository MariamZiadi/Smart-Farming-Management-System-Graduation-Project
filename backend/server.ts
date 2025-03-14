import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { connectDB } from "./database";
import plantRoutes from "./routes/plantRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"; // Import user routes

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:19006", "http://192.168.1.100:5000/chat"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Routes
app.use("/plants", plantRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes); // User routes

// Gemini AI Chat Route
app.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: message }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

// Global Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
