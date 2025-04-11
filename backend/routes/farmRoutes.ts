import express, { Request, Response } from "express";
import Farm from "../models/Farm";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleware"; // Ensure user authentication

const router = express.Router();

// Create a new farm
router.post("/create", authMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, password, crops } = req.body;
      const userId = (req as any).user?.userId; // Extract user ID from decoded token
  
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
  
      // Check if farm name already exists
      const existingFarm = await Farm.findOne({ name });
      if (existingFarm) {
        res.status(400).json({ message: "Farm name already exists" });
        return;
      }
  
      // Hash the farm password for security
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create and save farm
      const newFarm = new Farm({ name, password: hashedPassword, owner: userId, crops });
      await newFarm.save();
  
      // Add farm to the user's list
      await User.findByIdAndUpdate(userId, { $push: { farms: newFarm._id } });
  
      res.status(201).json({ message: "Farm created successfully", farmId: newFarm._id });
    } catch (error) {
      console.error("❌ Farm Creation Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
// Get all farms of the logged-in user
router.get("/my-farms", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
      const userId = (req as any).user.userId;

      // Find the user and populate farm details
      const user = await User.findById(userId).populate("farms");
      if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      if (!user.farms || user.farms.length === 0) {
          res.status(200).json({ message: "You don't have any farms", farms: [] });
          return;
      }

      res.status(200).json({ farms: user.farms });
  } catch (error) {
      console.error("❌ Fetch Farms Error:", error);
      res.status(500).json({ message: "Server error" });
  }
});



export default router;
