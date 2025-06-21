import express, { Request, Response } from 'express';
import Farm from '../models/Farm';
import Plant from '../models/Plant';
import User from "../models/User";

import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// backend/routes/reminderRoutes.ts

router.get("/reminders", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId).populate({
      path: 'farms',
      populate: {
        path: 'crops.plantId',
        model: 'Plant'
      }
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const reminders = (user.farms as any[]).map((farm) => ({
      farmName: farm.name,
      crops: farm.crops
        .filter((crop: any) => crop.plantId) // Ensure plant is valid
        .map((crop: any) => {
          const plant = crop.plantId;
          const addedAt = new Date(crop.addedAt);
          const today = new Date();
          const wateringDays = parseInt(plant.wateringPlan); // Example: "7" means water every 7 days
          const daysPassed = Math.floor((today.getTime() - addedAt.getTime()) / (1000 * 60 * 60 * 24));
          const daysLeft = wateringDays - (daysPassed % wateringDays);

          return {
            name: plant.name, // or plant.arabicName based on locale
            wateringEvery: `${wateringDays} days`,
            daysLeft: daysLeft,
          };
        })
    }));

    res.status(200).json({ reminders });
  } catch (error) {
    console.error("❌ Reminder Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
