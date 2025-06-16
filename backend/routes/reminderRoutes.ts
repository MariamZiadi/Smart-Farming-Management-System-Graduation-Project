import express, { Request, Response } from 'express';
import Farm from '../models/Farm';
import Plant from '../models/Plant';
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/reminders", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const farms = await Farm.find({ 
      $or: [{ owner: userId }, { members: userId }]
    });

    const reminders = [];

    for (const farm of farms) {
      const cropsWithReminders = [];

      for (const crop of farm.crops) {
        const plant = await Plant.findOne({ name: crop.name });

        let daysInterval = 0;
        const match = plant?.wateringPlan?.match(/(\d+)/);
        if (match) daysInterval = parseInt(match[1]);

        let daysLeft = null;
        if (daysInterval && crop.addedAt) {
          const addedDate = new Date(crop.addedAt);
          const now = new Date();
          const diff = Math.floor((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
          daysLeft = daysInterval - (diff % daysInterval);
        }

        cropsWithReminders.push({
          name: crop.name,
          daysLeft: daysLeft ?? 'N/A',
          wateringEvery: plant?.wateringPlan ?? 'Not available'
        });
      }

      reminders.push({
        farmName: farm.name,
        crops: cropsWithReminders
      });
    }

    res.json({ reminders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reminders" });
  }
});

export default router;
