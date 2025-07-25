import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    wateringPlan: { type: String, required: true },
    fertilizerPlan: { type: String, required: true }
});

const plant_arabic = mongoose.model("plant_arabic", plantSchema);

export default plant_arabic;
