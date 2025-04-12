import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    image: { type: String }, // This will store the image URL
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // To automatically add createdAt and updatedAt
);

export default mongoose.model("Post", PostSchema);
