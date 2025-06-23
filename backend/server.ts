import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { connectDB } from "./database";
import plantRoutes from "./routes/plantRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"; // Import user routes
import farmsRoutes from "./routes/farmRoutes";
import postRoutes from "./routes/postRoutes"; // Import post routes
import plantRoutes_arabic from "./routes/plantRoutes_arabic"; // adjust path as needed
import reminderRoutes from './routes/reminderRoutes';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*", // Allows requests from any origin
  methods: ["GET", "POST"], // Allows only GET and POST requests
  allowedHeaders: ["Content-Type"], // Allows Content-Type header
}));

app.use(express.json());

// Routes
app.use("/plants", plantRoutes);
app.use("/plant_arabics", plantRoutes_arabic);
app.use("/auth", authRoutes);
app.use("/users", userRoutes); 
app.use("/farms", farmsRoutes);
app.use("/posts", postRoutes); 
app.use("/farms", reminderRoutes);


app.post("/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing GEMINI_API_KEY in environment");
      res.status(500).json({ error: "API key is missing" });
      return;
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.status(200).json({ reply });
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
});




app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});
app.get("/api/test", (req, res) => {
  res.send({ message: "API is working!" });
});


 app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
 });

