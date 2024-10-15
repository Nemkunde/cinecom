
import { Request, Response } from 'express';
import { signInUser, generateToken, createUser } from '../services/users.service';



export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { email, password, firstname, lastname, phone } = req.body;
    
    if (!email || !password || !firstname || !lastname || !phone) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const user = await createUser(email, password, firstname, lastname, phone);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await signInUser(email, password);

        const token = generateToken(user.user_id);

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
