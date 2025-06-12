import cron from "node-cron";
import { parseInterval } from "../utils/planParser";
import Farm from "../../backend/models/Farm";
import Plant from "../../backend/models/Plant";
import User from "../../backend/models/User";
import { IUser } from "../../backend/models/User";


function sendNotification(user: IUser, message: string): void {
  console.log(`Notify ${user.email}: ${message}`);
}

cron.schedule("0 8 * * *", async () => {
  try {
    const farms = await Farm.find().populate<{ owner: IUser; members: IUser[] }>("owner members").exec();
    const plants = await Plant.find().exec();
    const today = new Date();

    for (const farm of farms) {
      for (const cropEntry of farm.crops) {
        const { name: cropName, addedAt } = cropEntry;

        const plant = plants.find(
          (p) => p.name.toLowerCase() === cropName.toLowerCase()
        );
        if (!plant) continue;

        const wateringInterval = parseInterval(plant.wateringPlan);
        const fertilizingInterval = parseInterval(plant.fertilizerPlan);

        const daysSinceAdded = Math.floor(
          (today.getTime() - new Date(addedAt).getTime()) / (1000 * 60 * 60 * 24)
        );

        const users = [farm.owner, ...(farm.members ?? [])];

        if (wateringInterval && daysSinceAdded % wateringInterval === 0) {
          users.forEach((user) =>
            sendNotification(
              user,
              `💧 Water your ${cropName} in "${farm.name}" today.`
            )
          );
        }

        if (fertilizingInterval && daysSinceAdded % fertilizingInterval === 0) {
          users.forEach((user) =>
            sendNotification(
              user,
              `🌱 Fertilize your ${cropName} in "${farm.name}" today.`
            )
          );
        }
      }
    }
  } catch (err) {
    console.error("Error in plant care reminder job:", err);
  }
});
