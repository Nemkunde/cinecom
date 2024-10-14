import { Router } from 'express';
import { getScreenings } from '../controllers/screenings.controller';
import {
    allAvailableSeats,
    createBooking,
    getAllBookedSeats,
} from '../controllers/bookings.controller';

const router = Router();

router.get('/available/:id', allAvailableSeats);
router.get('/booked/:id', getAllBookedSeats);
router.post('/create-booking', createBooking);

export default router;
