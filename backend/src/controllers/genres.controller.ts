import { Request, Response } from "express";
import { getAllGenres } from "../services/genres.service";

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await getAllGenres();
    res.json({ genres });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};
