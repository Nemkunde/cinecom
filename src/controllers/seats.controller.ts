import { Request, Response } from "express";
import {
  getAllSeats,
  getAllSeatsByAuditorium,
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
