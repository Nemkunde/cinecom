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

  const generateSeatingArrangement = (salong: "stor" | "liten") => {
  const seatingArrangement: Seat[] = [];
  let seatId = 1;

  const addRow = (row: string, seatCount: number) => {
    for (let i = 1; i <= seatCount; i++) {
      seatingArrangement.push({
        seat_id: seatId++,
        seat_number: i,
        row_number: row,
        status: "available",
      });
    }
  };
    
    console.log("Salong", salong);

    if (salong === "stor") {
    console.log("Generating seats for 'stor' salong");
    addRow("A", 8);
    addRow("B", 9);
    addRow("C", 10); 
    addRow("D", 10);
    addRow("E", 10); 
    addRow("F", 10);
    addRow("G", 12); 
    addRow("H", 12);
  }

    else if (salong === "liten") {
    addRow("A", 6); 
    addRow("B", 8); 
    addRow("C", 9); 
    addRow("D", 9);
    addRow("E", 10); 
    addRow("F", 10); 
    addRow("G", 12); 
    } else {
      console.log("unknown salong type:", salong);
    }

    console.log("generate seating arrangement:", seatingArrangement);
  return seatingArrangement;
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
