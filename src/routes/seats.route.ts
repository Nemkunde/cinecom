import { Router } from "express";
import {
  getSeats,
  getAllAuditoriumSeats,
  getSeatMap,
} from "../controllers/seats.controller";

const router = Router();

router.get("/", getSeats);
router.get("/seatmap/:id", getSeatMap);
router.get("/:id", getAllAuditoriumSeats);
// router.post('/book-seat', book);

export default router;
