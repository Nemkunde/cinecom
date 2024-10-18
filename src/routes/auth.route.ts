import { Router, Request, Response } from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get(
  "/profile",
  authenticateToken,
  authorizeRole(["user", "admin"]),
  (req: Request, res: Response): void => {
    res.status(200).json({
      message: "Profile content for user or admin",
      user: req.user,
    });
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
