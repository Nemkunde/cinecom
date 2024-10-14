import { db } from '../db/drizzle';
import {
    bookingsTable,
    movieActorsTable,
    movieDirectorsTable,
    movieGenresTable,
    moviesTable,
    screeningsTable,
    seatsTable,
    ticketsTable,
} from '../db/schema';
import { eq } from 'drizzle-orm';
import { moodifyMovieStructure, movieDbCall, Movies } from './helpers';

export const getAvailableSeats = async (screeningId: number) => {
    try {
        const screening = await db
            .select()
            .from(screeningsTable)
            .where(eq(screeningsTable.screening_id, screeningId))
            .limit(1);

        if (!screening[0]) {
            throw new Error('Screening not found');
        }

        const allSeats = await db
            .select()
            .from(seatsTable)
            .where(eq(seatsTable.auditorium_id, screening[0].auditorium_id));
        const bookedSeats = await db
            .select({ seat_id: bookingsTable.seat_id })
            .from(bookingsTable)
            .where(eq(bookingsTable.screening_id, screeningId));

        const bookedSeatIds = new Set(bookedSeats.map((s) => s.seat_id));

        return allSeats.filter((seat) => !bookedSeatIds.has(seat.seat_id));
    } catch (error) {
        throw new Error('Error fetching all movies');
    }
};

export const getBookedSeats = async (screeningId: number) => {
    try {
        const bookedSeats = await db
            .select({
                seat_id: bookingsTable.seat_id,
                seat_number: seatsTable.seat_number,
                row_number: seatsTable.row_number,
            })
            .from(bookingsTable)
            .innerJoin(seatsTable, eq(seatsTable.seat_id, bookingsTable.seat_id))
            .where(eq(bookingsTable.screening_id, screeningId));

        return bookedSeats;
    } catch (error) {
        throw new Error('Failed getting booked seats');
    }
};

export const getMovieById = async (movieId: number) => {
    try {
        const movies = await movieDbCall(true, movieId);
        const moviesWithDirectorsActorsGenres = Array.from(moodifyMovieStructure(movies).values());
        return moviesWithDirectorsActorsGenres;
    } catch (error) {
        throw new Error('Error getting movie by id');
    }
};

export const bookSeat = async ({
    seatIds,
    screeningId,
    userId,
}: {
    seatIds: number[];
    screeningId: number;
    userId: number;
}) => {
    // try {
    return await db.transaction(async (tx) => {
        const [booking] = await tx
            .insert(bookingsTable)
            .values({
                screening_id: screeningId,
                user_id: userId,
                seat_id: seatIds[0],
                status: 'Confirmed',
                total_price: 0,
            })
            .returning();

        console.log('booking', booking);

        let totalPrice = 0;
        for (const seatId of seatIds) {
            const [ticket] = await tx
                .insert(ticketsTable)
                .values({
                    booking_id: booking.booking_id,
                    price: 1000,
                })
                .returning();
            totalPrice += ticket.price;
        }

        const [updatedBooking] = await tx
            .update(bookingsTable)
            .set({ total_price: totalPrice })
            .where(eq(bookingsTable.booking_id, booking.booking_id))
            .returning();

        return updatedBooking;
    });
    // } catch (error) {
    //     throw new Error('Could not book seat');
    // }
    // try {
    //     const [booking] = await db
    //         .insert(bookingsTable)
    //         .values({
    //             seat_id: seatId,
    //             screening_id: screeningId,
    //             user_id: userId,
    //             total_price: 300,
    //         })
    //         .returning();
    //     return booking;
    // } catch (error) {
    //     throw new Error('Could not book seat');
    // }
};