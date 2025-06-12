import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // <-- ADD THIS
  crops: { type: [String], default: [] },
});


export default mongoose.model("Farm", FarmSchema);
