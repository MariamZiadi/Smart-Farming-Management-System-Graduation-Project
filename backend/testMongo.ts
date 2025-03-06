import { connectDB } from "./database";
import Plant from "./models/plant";

const runTest = async () => {
    await connectDB();

    const samplePlant = new Plant({
        name: "Tomato",
        wateringPlan: "Water every 2 days",
        fertilizerPlan: "Fertilize once a month"
    });

    await samplePlant.save();
    console.log("✅ Sample plant saved!");

    const plants = await Plant.find();
    console.log("🌱 All plants:", plants);
};

runTest().catch(console.error);
