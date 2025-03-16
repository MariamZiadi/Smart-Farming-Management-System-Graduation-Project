import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique farm name
  password: { type: String, required: true }, // Protect farm access
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  crops: { type: [String], default: [] }, // List of crops or plants
});

export default mongoose.model("Farm", FarmSchema);
