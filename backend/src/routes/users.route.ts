import { Router } from "express";
import {
  getUsers,
  getUser,
  create,
  getBookingHistory,
} from "../controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/create", create);
router.get("/:id/bookinghistory", getBookingHistory);

export default router;
