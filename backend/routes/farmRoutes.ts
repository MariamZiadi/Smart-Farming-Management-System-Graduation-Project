import express, { Request, Response } from "express";
import Farm from "../models/Farm";
import { User } from "../models/User";
import Plant from "../models/Plant";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password, crops } = req.body;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const existingFarm = await Farm.findOne({ name });
    if (existingFarm) {
      res.status(400).json({ message: "Farm name already exists" });
      return;
    }

    const formattedCrops: { plantId: any; addedAt: Date }[] = [];

    for (const cropObj of crops || []) {
  const cropName = typeof cropObj === 'string' ? cropObj : cropObj.name;

  const plant = await Plant.findOne({
    $or: [{ name: cropName }, { arabicName: cropName }],
  });


      if (plant) {
        formattedCrops.push({
          plantId: plant._id,
          addedAt: new Date(),
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newFarm = new Farm({
      name,
      password: hashedPassword,
      plainPassword: password,
      owner: userId,
      crops: formattedCrops,
    });

    await newFarm.save();

    await User.findByIdAndUpdate(userId, { $push: { farms: newFarm._id } });

    res.status(201).json({
      message: "Farm created successfully",
      farmId: newFarm._id,
    });
  } catch (error: any) {
    console.error("❌ Farm Creation Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});


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

    const isAlreadyMember =
      user.farms.includes(matchedFarm._id) && matchedFarm.members.includes(userId);

    if (isAlreadyMember) {
      res.status(400).json({ message: "You are already a member in this farm" });
      return;
    }

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

router.get("/my-farms", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findById(userId).populate({
      path: "farms",
      populate: {
        path: "crops.plantId",
        model: "Plant",
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const farmsWithPasswords = user.farms.map((farm: any) => ({
      _id: farm._id,
      name: farm.name,
      plainPassword: farm.plainPassword || "N/A",
      crops: farm.crops.map((crop: any) => ({
        name: crop.plantId?.name,
      })),
    }));

    res.status(200).json({ farms: farmsWithPasswords });
  } catch (error) {
    console.error("❌ Fetch Farms Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:farmId", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
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

    await User.updateMany({ farms: farmId }, { $pull: { farms: farmId } });
    await Farm.findByIdAndDelete(farmId);

    res.status(200).json({ message: "Farm deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Farm Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

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

    if (crops && crops.length > 0) {
      // Normalize input
      const normalizedCrops = crops.map((crop: string) => crop.trim().toLowerCase());

      // Fetch plants matching either name or arabicName
      const plantDocs = await Plant.find({
  $or: normalizedCrops.flatMap((crop: string) => [
    { name: new RegExp(`^${crop}$`, 'i') },
    { arabicName: new RegExp(`^${crop}$`, 'i') },
  ])
});


      // Extract all matched values for comparison
      const matchedInputs = new Set([
        ...plantDocs.map((p: any) => p.name?.toLowerCase()),
        ...plantDocs.map((p: any) => p.arabicName?.toLowerCase())
      ]);

      const notFound = normalizedCrops.filter((input: string) => !matchedInputs.has(input));
      if (notFound.length > 0) {
        res.status(400).json({ message: `Some crops not found: ${notFound.join(', ')}` });
        return;
      }

      farm.set('crops', plantDocs.map(plant => ({
        plantId: plant._id,
        addedAt: new Date()
      })));
    }

    await farm.save();
    res.status(200).json({ message: "Farm updated", farm });
  } catch (error) {
    console.error("❌ Update Farm Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;