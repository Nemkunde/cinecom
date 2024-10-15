import express from "express";
import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: string;
      }
    }
  }
}
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & { userId: number; role: string };
        }
    }
}