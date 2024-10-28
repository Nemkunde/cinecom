import { Request, Response } from "express";
import {
  getAllScreenings,
  getScreeningsByMovieId,
} from "../services/screenings.service";

export const getScreenings = async (req: Request, res: Response) => {
  try {
    const screenings = await getAllScreenings();
    res.json(screenings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

export const getScreeningsForMovie = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid movie id" });
  }

  try {
    const screenings = await getScreeningsByMovieId(id);
    res.json(screenings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};
