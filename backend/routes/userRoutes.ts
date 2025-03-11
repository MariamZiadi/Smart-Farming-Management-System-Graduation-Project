import express, { Request, Response } from "express";
import User from "../models/User"; // ✅ Ensure correct import
import bcrypt from "bcryptjs";

const router = express.Router(); // ✅ Ensure using express.Router()

// Register a new user
router.post("/register", async (req: Request, res: Response) : Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in database
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("❌ User Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users (for testing)
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Fetch Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router; // ✅ Ensure default export
