import { Router, Request, Response } from 'express';
import { signUp, signIn } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/protected', authenticateToken, (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Protected content' });
});

export default router;
