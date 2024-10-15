import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
        return; 
    }

    jwt.verify(token, secret, (err: jwt.JsonWebTokenError | null, user: any) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = user;
        next();
    });
};
export const authorizeRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || req.user.role !== role) {
            res.status(403).json({ message: 'Access denied: Insufficient role' });
            return;
        }   
        next();
    };
};
