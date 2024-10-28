import express from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: string;
        email?: string;
        firstname?: string;
        lastname?: string;
      };
    }
  }
}
