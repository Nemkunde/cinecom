import { Request, Response, NextFunction } from "express";
import {
  getAllSeats,
  getAllSeatsByAuditorium,
  seatMap,
  bookSeatService,
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
      res.status(400).json({ error: "Invalid user id" });
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

    console.log("=====MAP OF SEATS====", mapOfSeats);

    if (!mapOfSeats) {
      res.status(404).json({ error: "Booking history not found." });
    }

    res.status(200).json(mapOfSeats);
  } catch (error) {
    res.status(500).json({ error: "Could not get seatmap" });
  }
};

export const bookSeat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { seat_id } = req.body;
  if (!seat_id) {
    res.status(400).json({ error: "Seat ID is required" });
    return;
  }

  try {
    const result = await bookSeatService(seat_id);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
