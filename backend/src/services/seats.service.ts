import { db } from "../db/drizzle";
import {
  auditoriumsTable,
  bookingsTable,
  screeningsTable,
  seatsTable,
} from "../db/schema";
import { and, eq, sql } from "drizzle-orm";

type Seat = {
  seat_id: number;
  seat_number: number;
  row_number: string;
  status: "available" | "booked";
};

export const seatMap = async (screeningsId: number) => {
  try {
    console.log("Received screeningsId in seatMap:", screeningsId); // Loggar screeningsId för verifiering
    const seatMapData = await db
      .select({
        seat_id: seatsTable.seat_id,
        seat_number: seatsTable.seat_number,
        row_number: seatsTable.row_number,
        status: sql`CASE WHEN ${bookingsTable.seat_id} IS NULL THEN 'available' ELSE 'booked' END`.as<string>(),
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

    console.log("seatMapData", seatMapData);

    return seatMapData;
  } catch (error) {
    throw new Error("Could not get seatmap");
  }
};

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

export const bookSeatsForScreening = async (screeningId: number, seatIds: number[], userId: number) => {
  try {
    const bookedSeats = [];
    const failedSeats = [];

    for (const seatId of seatIds) {
      const existingBooking = await db.select().from(bookingsTable)
        .where(and(eq(bookingsTable.seat_id, seatId), eq(bookingsTable.screening_id, screeningId)));
      
      if (existingBooking.length === 0) {
        await db.insert(bookingsTable).values({
          seat_id: seatId,
          screening_id: screeningId,
          user_id: userId,
          status: "Confirmed",
        });
        bookedSeats.push(seatId);
      } else {
        failedSeats.push(seatId);
      }
    }

    return { success: failedSeats.length === 0, bookedSeats, failedSeats };
  } catch (error) {
    throw new Error("Error booking seats");
  }
};
