import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Plant from "../models/Plant";
import { User } from "../models/User";

const router = express.Router();

// ✅ Middleware to authenticate token
const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// ✅ Middleware to check if user is admin
const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ message: 'Access denied. Admins only.' });
    return;
  }
  next();
};

// ✅ Get all plants (PUBLIC)
router.get("/", async (req: Request, res: Response) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

// ✅ Get plant by ID (PUBLIC)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ error: "Plant not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error fetching plant" });
  }
});

// ✅ Get Arabic data by ID (PUBLIC)
router.get("/arabic/:id", async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
      res.json({
        name: plant.arabicName,
        wateringPlan: plant.wateringPlanArabic || "لا توجد خطة ري متاحة",
        fertilizerPlan: plant.fertilizerPlanArabic || "لا توجد خطة تسميد متاحة"
      });
    } else {
      res.status(404).json({ error: "النبات غير موجود" });
    }
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ أثناء جلب بيانات النبات" });
  }
});

// ✅ Create new plant (ADMIN ONLY)
router.post("/", authenticateToken, checkAdmin, async (req: Request, res: Response) => {
  try {
    const { name, wateringPlan, fertilizerPlan } = req.body;
    const newPlant = new Plant({ name, wateringPlan, fertilizerPlan });
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(500).json({ error: "Failed to create plant" });
  }
});

// ✅ Update plant by ID (ADMIN ONLY)
router.put("/:id", authenticateToken, checkAdmin, async (req: Request, res: Response) => {
  try {
    const { name, wateringPlan, fertilizerPlan } = req.body;
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      { name, wateringPlan, fertilizerPlan },
      { new: true }
    );
    if (updatedPlant) {
      res.json(updatedPlant);
    } else {
      res.status(404).json({ error: "Plant not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update plant" });
  }
});

// ✅ Delete plant by ID (ADMIN ONLY)
router.delete("/:id", authenticateToken, checkAdmin, async (req: Request, res: Response) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (deletedPlant) {
      res.json({ message: "Plant deleted successfully" });
    } else {
      res.status(404).json({ error: "Plant not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete plant" });
  }
});

export default router;
