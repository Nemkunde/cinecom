import express, { Request, Response } from "express";
import {
  getSeats,
  getAllAuditoriumSeats,
  getSeatMap,
  bookSeats
} from "../controllers/seats.controller";

const router = express.Router();

router.get("/", getSeats);
router.get("/seatmap/:id", getSeatMap);
router.get("/:id", getAllAuditoriumSeats);

router.post("/book", async (req: Request, res: Response) => {
  try {
    await bookSeats(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
