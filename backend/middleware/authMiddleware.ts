import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Unauthorized: No token provided" });
     return
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      console.error(" JWT_SECRET is missing from environment variables.");
      res.status(500).json({ message: "Internal Server Error: JWT secret is not configured" });
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    req.user = { userId: decoded.userId }; // Attach user to request

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error(" Token verification failed:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return
  }
};
