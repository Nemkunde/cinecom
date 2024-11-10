import { Request, Response } from "express";
import { getAllTicketTypes } from "../services/tickets.service";

export const getTicketTypes = async (req: Request, res: Response) => {
  try {
    const ticketTypes = await getAllTicketTypes();
    res.json({ ticketTypes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};
