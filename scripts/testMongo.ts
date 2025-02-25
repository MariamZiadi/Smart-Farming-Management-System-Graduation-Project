import connectDB from "../constants/database";
import Plant from "../models/Plant";  // ✅ Make sure this matches exactly

// Function to add a test plant
const addTestPlant = async () => {
  await connectDB();

  const newPlant = new Plant({
    name: "Tomato",
    wateringSchedule: "Every 2 days",
    fertilizerPlan: "Every 2 weeks",
  });

  await newPlant.save();
  console.log("Test plant added:", newPlant);
};

// Run the function
addTestPlant();
