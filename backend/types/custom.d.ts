// backend/types/custom.d.ts

import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    isAdmin?: boolean;
    // Add more user fields if needed
  };
}

// Enable global usage of `req.user` without casting
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        isAdmin?: boolean;
      };
    }
  }
}

export {}; // required to treat this as a module
