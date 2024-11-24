import { Router } from "express";
import {
  getSeats,
  getAllAuditoriumSeats,
  getSeatMap,
  bookSeat,
} from "../controllers/seats.controller";

const router = Router();

router.get("/", getSeats);
router.get("/seatmap/:id", getSeatMap);
router.get("/:id", getAllAuditoriumSeats);
router.post("/book-seat", bookSeat);

export default router;
