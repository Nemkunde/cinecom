// src/ui/TicketSelectionCard.tsx
import React, { useState } from "react";
import { TicketCounter } from "src/components/ui/TicketCounter";
import { bookTicket } from "src/api";

export const TicketSelectionCard: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Välj antal biljetter</h2>
      <TicketCounter label="Vuxen" />
      <TicketCounter label="Barn" />
      <TicketCounter label="Pensionär" />
    </div>
  );
};

export const TicketSummaryCard: React.FC = () => {
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      const result = await bookTicket({
        seatIds: [1, 2], 
        screeningId: 1, 
        userId: 1, 
        ticketTypeId: 1, 
      });
      console.log("Booking confirmed:", result);
    } catch (error) {
      console.error("Error during booking:", error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div>
      <button onClick={handleBooking} disabled={isBooking}>
        {isBooking ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
};