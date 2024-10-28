import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = { role: "guest", userId: 0 };
    next();
    return;
  }

  jwt.verify(token, secret, (err: jwt.JsonWebTokenError | null, user: any) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
};
export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "Access denied: Unauthorized role" });
      return;
    }

    next();
  };
};
