import { db } from "../db/drizzle";
import {
  bookingsTable,
  screeningsTable,
  seatsTable,
  ticketsTable,
  ticketTypesTable,
} from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";

export const getAvailableSeats = async (screeningId: number) => {
  try {
    const screening = await db
      .select()
      .from(screeningsTable)
      .where(eq(screeningsTable.screening_id, screeningId))
      .limit(1);

    if (!screening[0]) {
      throw new Error("Screening not found");
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
    throw new Error("Error fetching all seats");
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
    throw new Error("Failed getting booked seats");
  }
};

const generateBookingReference = () => {
  const numbers = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const letters = Array(3)
    .fill(null)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    .join("");
  return `${numbers}${letters}`;
};

// export const bookSeat = async ({
//   seatIds,
//   screeningId,
//   userId,
// }: {
//   seatIds: number[];
//   screeningId: number;
//   userId: number;
// }) => {
//   return await db.transaction(async (tx) => {
//     const screening = await tx
//       .select({ auditorium_id: screeningsTable.auditorium_id })
//       .from(screeningsTable)
//       .where(eq(screeningsTable.screening_id, screeningId))
//       .limit(1);

//     if (!screening.length) {
//       throw new Error("Screening not found");
//     }

//     const auditoriumId = screening[0].auditorium_id;

//     const seatsInAuditorium = await tx
//       .select({ seat_id: seatsTable.seat_id })
//       .from(seatsTable)
//       .where(
//         and(
//           eq(seatsTable.auditorium_id, auditoriumId),
//           inArray(seatsTable.seat_id, seatIds)
//         )
//       );

//     if (seatsInAuditorium.length !== seatIds.length) {
//       throw new Error(
//         "One or more of the selected seats do not belong to the correct auditorium"
//       );
//     }

//     const alreadyBookedSeats = await tx
//       .select({ seat_id: bookingsTable.seat_id })
//       .from(bookingsTable)
//       .where(
//         and(
//           eq(bookingsTable.screening_id, screeningId),
//           inArray(bookingsTable.seat_id, seatIds)
//         )
//       );

//     if (alreadyBookedSeats.length > 0) {
//       const bookedSeatIds = alreadyBookedSeats.map((seat) => seat.seat_id);
//       throw new Error(
//         `The following seats are already booked: ${bookedSeatIds.join(", ")}`
//       );
//     }

//     const bookingValues = seatIds.map((seatId) => ({
//       screening_id: screeningId,
//       user_id: userId,
//       seat_id: seatId,
//       total_price: 0,
//     }));

//     const bookings = await tx
//       .insert(bookingsTable)
//       .values(bookingValues)
//       .returning();

//     if (!bookings.length) {
//       throw new Error("Failed to create booking");
//     }

//     let totalPrice = 0;

//     for (const booking of bookings) {
//       const [ticket] = await tx
//         .insert(ticketsTable)
//         .values({
//           booking_id: booking.booking_id,
//           ticket_price: 1000,
//         })
//         .returning();
//       totalPrice += ticket.ticket_price;
//     }

//     const updatedBookings = await Promise.all(
//       bookings.map((booking) =>
//         tx
//           .update(bookingsTable)
//           .set({
//             total_price: totalPrice,
//             booking_reference: generateBookingReference(),
//           })
//           .where(eq(bookingsTable.booking_id, booking.booking_id))
//           .returning()
//       )
//     );

//     return updatedBookings;
//   });
// };

export const bookSeat = async ({
  seatIds,
  screeningId,
  userId,
  ticketTypeId,
}: {
  seatIds: number[];
  screeningId: number;
  userId: number;
  ticketTypeId: number; 
  
}) => {
  return await db.transaction(async (tx) => {
    const screening = await tx
      .select({ auditorium_id: screeningsTable.auditorium_id })
      .from(screeningsTable)
      .where(eq(screeningsTable.screening_id, screeningId))
      .limit(1);

    if (!screening.length) {
      throw new Error("Screening not found");
    }

    const auditoriumId = screening[0].auditorium_id;
    const seatsInAuditorium = await tx
      .select({ seat_id: seatsTable.seat_id })
      .from(seatsTable)
      .where(
        and(
          eq(seatsTable.auditorium_id, auditoriumId),
          inArray(seatsTable.seat_id, seatIds)
        )
      );

    if (seatsInAuditorium.length !== seatIds.length) {
      throw new Error(
        "One or more of the selected seats do not belong to the correct auditorium"
      );
    }

    const alreadyBookedSeats = await tx
      .select({ seat_id: bookingsTable.seat_id })
      .from(bookingsTable)
      .where(
        and(
          eq(bookingsTable.screening_id, screeningId),
          inArray(bookingsTable.seat_id, seatIds)
        )
      );

    if (alreadyBookedSeats.length > 0) {
      const bookedSeatIds = alreadyBookedSeats.map((seat) => seat.seat_id);
      throw new Error(
        `The following seats are already booked: ${bookedSeatIds.join(", ")}`
      );
    }

    const ticketType = await tx
      .select({ ticket_type_price: ticketTypesTable.ticket_type_price })
      .from(ticketTypesTable)
      .where(eq(ticketTypesTable.ticket_type_id, ticketTypeId))
      .limit(1);

    if (!ticketType.length) {
      throw new Error("Invalid ticket type selected");
    }

    const ticketPrice = ticketType[0].ticket_type_price;
    const bookingValues = seatIds.map((seatId) => ({
      screening_id: screeningId,
      user_id: userId,
      seat_id: seatId,
      total_price: 0,
      ticket_type_id: ticketTypeId, 
      booking_reference: generateBookingReference(),
    }));

    const bookings = await tx
      .insert(bookingsTable)
      .values(bookingValues)
      .returning();

    if (!bookings.length) {
      throw new Error("Failed to create booking");
    }

    let totalPrice = 0;

   
    for (const booking of bookings) {
      const [ticket] = await tx
        .insert(ticketsTable)
        .values({
          booking_id: booking.booking_id,
          ticket_price: ticketPrice, 
        })
        .returning();
      totalPrice += ticket.ticket_price;
    }

    
    const updatedBookings = await Promise.all(
      bookings.map((booking) =>
        tx
          .update(bookingsTable)
          .set({
            total_price: totalPrice,
            booking_reference: generateBookingReference(),
          })
          .where(eq(bookingsTable.booking_id, booking.booking_id))
          .returning()
      )
    );

    return updatedBookings;
  });
};

export const deleteBooking = async (id: number) => {
  try {
    const result = await db
      .delete(bookingsTable)
      .where(eq(bookingsTable.booking_id, id))
      .returning();

    return result[0];
  } catch (error) {
    throw new Error("Could not delete booking");
  }
};
