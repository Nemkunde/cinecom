import { db } from '../db/drizzle';
import { bookingsTable, seatsTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getAllSeats = async () => {
    try {
        const seats = await db.select().from(seatsTable);
        return seats;
    } catch (error) {
        throw new Error('Error fetching seats');
    }
};

export const getAllSeatsByAuditorium = async (auditoriumId: number) => {
    try {
        const seats = await db
            .select()
            .from(seatsTable)
            .where(eq(seatsTable.auditorium_id, auditoriumId));

        return seats;
    } catch (error) {
        throw new Error('Fail');
    }
};

// export const bookSeat = async ({
//     seatId,
//     screeningId,
//     userId,
// }: {
//     seatId: number;
//     screeningId: number;
//     userId: number;
// }) => {
//     try {
//         const [booking] = await db
//             .insert(bookingsTable)
//             .values({
//                 seat_id: seatId,
//                 screening_id: screeningId,
//                 user_id: userId,
//                 total_price: 300,
//             })
//             .returning();
//         return booking;
//     } catch (error) {
//         throw new Error('Could not book seat');
//     }
// };
