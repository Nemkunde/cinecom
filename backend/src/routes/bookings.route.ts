import { Router } from "express";
import {
  allAvailableSeats,
  deleteBookingById,
  getAllBookedSeats,
  createBooking,
  getBookings,
} from "../controllers/bookings.controller";

const router = Router();

router.get("/available/:id", allAvailableSeats);
router.get("/booked/:id", getAllBookedSeats);
router.post("/create-booking", createBooking);
router.delete("/:id", deleteBookingById);
router.get("/allbookings", getBookings);

export default router;
