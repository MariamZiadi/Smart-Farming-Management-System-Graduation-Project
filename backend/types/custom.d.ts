// backend/types/custom.d.ts
import { Request } from "express";

// Define a custom interface for the request object
export interface AuthRequest extends Request {
  user?: { userId: string };
  user?: any;

}
