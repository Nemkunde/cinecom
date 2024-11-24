import { db } from "../db/drizzle";
import {
  auditoriumsTable,
  bookingsTable,
  bookingTicketsTable,
  screeningsTable,
  seatsTable,
  ticketTypesTable,
} from "../db/schema";
import { and, eq, sql } from "drizzle-orm";

export const getAllSeats = async () => {
  try {
    const seats = await db.select().from(seatsTable);
    return seats;
  } catch (error) {
    throw new Error("Error fetching seats");
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
    throw new Error("Fail");
  }
};

export const seatMap = async (screeningsId: number) => {
  try {
    const screening = await db
      .select({
        screening_id: screeningsTable.screening_id,
        auditorium_id: auditoriumsTable.auditorium_id,
      })
      .from(screeningsTable)
      .innerJoin(
        auditoriumsTable,
        eq(screeningsTable.auditorium_id, auditoriumsTable.auditorium_id)
      )
      .where(eq(screeningsTable.screening_id, screeningsId))
      .limit(1);

    if (!screening.length) {
      throw new Error("Screening not found");
    }

    const seatMap = await db
      .select({
        seat_id: seatsTable.seat_id,
        seat_number: seatsTable.seat_number,
        row_number: seatsTable.row_number,
        status: sql`
          CASE
            WHEN ${bookingTicketsTable.seat_id} IS NOT NULL
            AND ${bookingsTable.screening_id} = ${screeningsId}
            THEN 'booked'
            ELSE 'available'
          END
        `,
        booking_id: bookingsTable.booking_id,
        ticket_type_id: ticketTypesTable.ticket_type_id,
      })
      .from(seatsTable)
      .where(eq(seatsTable.auditorium_id, screening[0].auditorium_id))
      .leftJoin(
        bookingTicketsTable,
        eq(bookingTicketsTable.seat_id, seatsTable.seat_id)
      )
      .leftJoin(
        bookingsTable,
        and(
          eq(bookingsTable.booking_id, bookingTicketsTable.booking_id),
          eq(bookingsTable.screening_id, screeningsId)
        )
      )
      .leftJoin(
        ticketTypesTable,
        eq(ticketTypesTable.ticket_type_id, bookingTicketsTable.ticket_type_id)
      );

    const seatsByRow = seatMap.reduce<Record<string, typeof seatMap>>(
      (acc, seat) => {
        if (!acc[seat.row_number]) {
          acc[seat.row_number] = [];
        }
        acc[seat.row_number].push(seat);
        return acc;
      },
      {}
    );

    Object.values(seatsByRow).forEach((rowSeats) => {
      rowSeats.sort((a, b) =>
        a.seat_number.localeCompare(b.seat_number, undefined, { numeric: true })
      );
    });

    const stats = seatMap.reduce(
      (acc, seat) => ({
        total: acc.total + 1,
        booked: acc.booked + (seat.status === "booked" ? 1 : 0),
        available: acc.available + (seat.status === "available" ? 1 : 0),
      }),
      { total: 0, booked: 0, available: 0 }
    );

    return {
      screening_id: screeningsId,
      auditorium_id: screening[0].auditorium_id,
      statistics: stats,
      seats: seatsByRow,
    };
  } catch (error) {
    throw new Error("Could not get seatmap");
  }
};

export const bookSeatService = async (seat_id: number) => {
  try {
    
    const existingSeat = await db
      .select()
      .from(seatsTable)
      .where(eq(seatsTable.seat_id, seat_id))
      .limit(1);

    if (existingSeat.length === 0) {
      throw new Error("Seat not found");
    }

    if (existingSeat[0].status === "booked") {
      throw new Error("Seat is already booked");
    }

    const updatedSeats = await db
      .update(seatsTable)
      .set({ status: "booked" })
      .where(eq(seatsTable.seat_id, seat_id))
      .returning();

    return {
      message: "Seat booked successfully",
      seat: updatedSeats[0],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while booking the seat.";
    throw new Error("Error booking seat: " + errorMessage);
  }
  };
