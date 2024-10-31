import { Request, Response } from "express";
import {
  getAllSeats,
  getAllSeatsByAuditorium,
  seatMap,
  bookSeatsForScreening
} from "../services/seats.service";

export const getSeats = async (req: Request, res: Response) => {
  try {
    const seats = await getAllSeats();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

export const getAllAuditoriumSeats = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid screening id" });
    }

    const seats = await getAllSeatsByAuditorium(id);

    if (!seats) {
      res.status(404).json({ error: "Seats not found" });
    }

    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the seats " });
  }
};

export const getSeatMap = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user id" });
    }

    const mapOfSeats = await seatMap(id);

    if (!mapOfSeats) {
      res.status(404).json({ error: "Booking history not found." });
    }

    res.status(200).json(mapOfSeats);
  } catch (error) {
    res.status(500).json({ error: "Could not get seatmap" });
  }
};

export const bookSeats = async (req: Request, res: Response) => {
  try {
    const { screeningId, seatsId, userId } = req.body;

    if (!screeningId || !seatsId || seatsId.length === 0 || !userId) {
      return res.status(400).json({ error: "Missing booking details" });
    }

    const bookingResult = await bookSeatsForScreening(screeningId, seatsId, userId);

    if (bookingResult.success) {
      res.status(200).json({ message: "Seats booked successfully", bookedSeats: bookingResult.bookedSeats });
    } else {
      res.status(409).json({ error: "Some seats are already booked", failedSeats: bookingResult.failedSeats });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to book seats" });
  }
};