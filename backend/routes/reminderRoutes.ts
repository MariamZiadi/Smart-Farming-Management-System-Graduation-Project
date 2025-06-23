import express, { Request, Response } from 'express';
import Farm from '../models/Farm';
import { User } from '../models/User'; // ✅ CORRECT
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

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

    const reminders = (user.farms as any[]).map((farm) => {
      const crops = farm.crops.map((crop: any) => {
        const plant = crop.plantId;
        if (!plant) return null;

        const wateringText = plant.wateringPlan || "";

        // Match patterns like "every 2 days", "every 2–3 days", or "every 2-3 days"
        const match = wateringText.match(/every\s+(\d+)(?:[\–\-]\d+)?\s+days?/i);
        const wateringInterval = match ? parseInt(match[1]) : null;

        let daysLeft: number | string = "N/A";
        if (wateringInterval) {
          const addedAt = new Date(crop.addedAt);
          const today = new Date();
          const daysPassed = Math.floor((today.getTime() - addedAt.getTime()) / (1000 * 60 * 60 * 24));
          daysLeft = wateringInterval - (daysPassed % wateringInterval);
        }

        return {
          name: plant.name,
          wateringEvery: wateringText,
          daysLeft,
        };
      }).filter(Boolean); // keep all valid crops

      return {
        farmName: farm.name,
        crops: crops,
      };
    });

    res.status(200).json({ reminders });
  } catch (error) {
    console.error("❌ Reminder Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
