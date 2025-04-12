import express, { Request, Response } from "express";
import Post from "../models/Post";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthRequest } from "../types/custom"; // Import the custom request type

const router = express.Router();

// POST /posts - Create a new post
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => { // Use AuthRequest type
  const { description, image } = req.body;
  const userId = req.user?.userId; // TypeScript knows that req.user has userId

  try {
    const newPost = new Post({
      description,
      image,
      user: userId, // Link post to the authenticated user
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("❌ Post Creation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /posts - Get all posts for the feed
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    console.error("❌ Fetch Posts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
