 import mongoose from "mongoose";

 const CropSchema = new mongoose.Schema({
   plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
   addedAt: { type: Date, default: Date.now }
 });

 const FarmSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
   plainPassword: { type: String }, 
   crops: { type: [CropSchema], default: [] }
 });

 export default mongoose.model("Farm", FarmSchema);

