import mongoose, { Document } from "mongoose"; // ✅ Add Document import

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  farms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Farm" }],
  isAdmin: { type: Boolean, default: false }, // ✅ Add this
});

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  farms: mongoose.Types.ObjectId[];
  isAdmin: boolean; // ✅ Add this
}
export const User = mongoose.model("User", UserSchema); // ✅ NAMED EXPORT
