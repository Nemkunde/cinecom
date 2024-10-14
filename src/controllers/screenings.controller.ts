import { Request, Response } from 'express';
import { getAllScreenings } from '../services/screenings.service';

export const getScreenings = async (req: Request, res: Response) => {
    try {
        const screenings = await getAllScreenings();
        res.json(screenings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
};
