import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Plant document
interface IPlant extends Document {
  name: string;
  wateringSchedule: string;
  fertilizerPlan: string;
}

// Define the Plant schema
const PlantSchema: Schema = new Schema({
  name: { type: String, required: true },
  wateringSchedule: { type: String, required: true },
  fertilizerPlan: { type: String, required: true },
});

// Export the Mongoose model
const Plant = mongoose.model<IPlant>("Plant", PlantSchema);
export default Plant;
