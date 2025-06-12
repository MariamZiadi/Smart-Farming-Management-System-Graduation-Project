import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// =====================
// ✅ Middleware to verify token
// =====================
const authenticateToken = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return; // 👈 ensures function ends here, so no return value
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    req.userId = decoded.userId;
    next(); // 👈 properly passes control
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
    return; // 👈 again, exit after sending a response
  }
};


// =====================
// ✅ POST /login
// =====================
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Wrong password. Please try again" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// =====================
// ✅ GET /profile
// =====================
router.get("/profile", authenticateToken, async (
  req: Request & { userId?: string },
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("name email image");

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});


export default router;
