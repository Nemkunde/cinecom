import { Request, Response } from "express";
import {
  bookSeat,
  deleteBooking,
  getAvailableSeats,
  getBookedSeats,
} from "../services/bookings.service";

export const allAvailableSeats = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid movie id" });
    }

    const availableSeats = await getAvailableSeats(id);

    if (!availableSeats) {
      res.status(400).json({ message: "No available seats" });
    }

    res.json(availableSeats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};
export const getAllBookedSeats = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid movie id" });
    }

    const bookedSeats = await getBookedSeats(id);
    if (!bookedSeats) {
      res.status(400).json({ message: "No booked seats" });
    }
    res.json(bookedSeats);
  } catch (error) {
    res.status(500).json({ error: "Failed getting booked seats" });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { seatIds, screeningId, userId } = req.body;
    const booking = await bookSeat({ seatIds, screeningId, userId });
    res.json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to create booking" });
  }
};

export const deleteBookingById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid booking id" });
    }

    const deletedBooking = await deleteBooking(id);
    res.json({ message: "Booking deleted", deletedBooking, success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete booking", success: false });
  }
};
