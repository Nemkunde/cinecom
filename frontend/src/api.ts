// src/api.ts
const baseUrl = "http://localhost:3000"; 


export async function bookTicket({
  seatIds,
  screeningId,
  userId,
  ticketTypeId,
}: {
  seatIds: number[];
  screeningId: number;
  userId: number;
  ticketTypeId: number;
}) {
  const response = await fetch(`${baseUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seatIds, screeningId, userId, ticketTypeId }),
  });

  if (!response.ok) {
    throw new Error("Booking failed");
  }
  
  return response.json();
}
