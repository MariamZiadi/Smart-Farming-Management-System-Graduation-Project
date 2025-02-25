import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://nadamostafa5:Nadam@grad.httqa.mongodb.net/?retryWrites=true&w=majority&appName=grad"; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
