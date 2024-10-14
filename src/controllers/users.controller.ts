import { Request, Response } from 'express';
import { createUser, getAllUsers, getSingleUser } from '../services/users.service';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid user id' });
        }

        const user = await getSingleUser(id);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the user ' });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        await createUser();
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};