import { db } from "../db/drizzle";
import {
  auditoriumsTable,
  bookingsTable,
  screeningsTable,
  seatsTable,
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
    const seatMap = await db
      .select({
        seat_id: seatsTable.seat_id,
        auditorium_id: seatsTable.auditorium_id,
        seat_number: seatsTable.seat_number,
        row_number: seatsTable.row_number,
        status: sql`CASE WHEN ${bookingsTable.seat_id} IS NULL THEN 'available' ELSE 'booked' END`,
      })
      .from(seatsTable)
      .innerJoin(
        screeningsTable,
        eq(seatsTable.auditorium_id, screeningsTable.auditorium_id)
      )
      .leftJoin(
        bookingsTable,
        and(
          eq(bookingsTable.seat_id, seatsTable.seat_id),
          eq(bookingsTable.screening_id, screeningsTable.screening_id)
        )
      )
      .where(eq(screeningsTable.screening_id, screeningsId));

    return seatMap;
  } catch (error) {
    throw new Error("Could not get seatmap");
  }
};
