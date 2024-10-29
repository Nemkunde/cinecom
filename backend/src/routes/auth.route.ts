import { Router, Request, Response } from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware";
import express from "express";
import { getSingleUser } from "../services/users.service";
const router = Router();

router.get(
  "/checkout",
  authenticateToken,
  authorizeRole(["user", "admin", "guest"]),
  (req: Request, res: Response): void => {
    res.status(200).json({
      message: "Checkout page",
      userRole: req.user?.role,
    });
  }
);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get(
  "/profile",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const user = await getSingleUser(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "Profile content for user or admin",
        user: {
          userId: user.userId,
          role: user.role,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/admin",
  authenticateToken,
  authorizeRole(["admin"]),
  (req: Request, res: Response): void => {
    res.status(200).json({
      message: "Admin content",
      user: req.user,
    });
  }
);

export default router;
