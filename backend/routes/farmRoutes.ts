import express, { Request, Response } from "express";
import Farm from "../models/Farm";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Create a new farm
router.post("/create", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, crops } = req.body;
    const userId = (req as any).user?.userId;

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

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create farm with both hashed and plain password
    const newFarm = new Farm({
      name,
      password: hashedPassword,
      plainPassword: password, // 👈 Add this line
      owner: userId,
      crops,
    });

    await newFarm.save();

    // Add farm to user's list
    await User.findByIdAndUpdate(userId, { $push: { farms: newFarm._id } });

    res.status(201).json({ message: "Farm created successfully", farmId: newFarm._id });
  } catch (error) {
    console.error("❌ Farm Creation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Join a farm by password
router.post("/join", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { password } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId || !password) {
      res.status(400).json({ message: "User ID and password are required" });
      return;
    }

    const farms = await Farm.find();
    let matchedFarm = null;

    for (const farm of farms) {
      const isMatch = await bcrypt.compare(password, farm.password);
      if (isMatch) {
        matchedFarm = farm;
        break;
      }
    }

    if (!matchedFarm) {
      res.status(404).json({ message: "Farm not found or password incorrect" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // ✅ Check if user already in farm
    const isAlreadyMember =
      user.farms.includes(matchedFarm._id) && matchedFarm.members.includes(userId);

    if (isAlreadyMember) {
      res.status(400).json({ message: "You are already a member in this farm" });
      return;
    }

    // Otherwise, proceed to add
    if (!user.farms.includes(matchedFarm._id)) {
      user.farms.push(matchedFarm._id);
      await user.save();
    }

    if (!matchedFarm.members.includes(userId)) {
      matchedFarm.members.push(userId);
      await matchedFarm.save();
    }

    res.status(200).json({ message: "Successfully joined the farm", farm: matchedFarm });
  } catch (error) {
    console.error("❌ Join Farm Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all farms of the logged-in user
router.get("/my-farms", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId).populate("farms");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.farms || user.farms.length === 0) {
      res.status(200).json({ message: "You don't have any farms", farms: [] });
      return;
    }

    // Convert to plain object and send only the fields needed
    const farmsWithPasswords = user.farms.map((farm: any) => ({
      _id: farm._id,
      name: farm.name,
      crops: farm.crops,
      plainPassword: farm.plainPassword || "N/A", // fallback if missing
    }));

    res.status(200).json({ farms: farmsWithPasswords });
  } catch (error) {
    console.error("❌ Fetch Farms Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /farms/:farmId
router.delete("/:farmId", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { farmId } = req.params;
    const userId = (req as any).user?.userId;

    const farm = await Farm.findById(farmId);
    if (!farm) {
      res.status(404).json({ message: "Farm not found" });
      return;
    }

    // Only owner can delete
    if (farm.owner.toString() !== userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    // Remove from all users
    await User.updateMany({ farms: farmId }, { $pull: { farms: farmId } });

    // Delete the farm
    await Farm.findByIdAndDelete(farmId);

    res.status(200).json({ message: "Farm deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Farm Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /farms/:farmId
router.put("/:farmId", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, crops } = req.body;
    const { farmId } = req.params;
    const userId = (req as any).user?.userId;

    const farm = await Farm.findById(farmId);
    if (!farm) {
      res.status(404).json({ message: "Farm not found" });
      return;
    }

    if (farm.owner.toString() !== userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      farm.password = hashed;
      farm.plainPassword = password;
    }

    if (name) farm.name = name;
    if (crops) farm.crops = crops;

    await farm.save();
    res.status(200).json({ message: "Farm updated", farm });
  } catch (error) {
    console.error("❌ Update Farm Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
