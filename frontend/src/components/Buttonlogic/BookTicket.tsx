import React from "react";
import { Button } from "../ui/button";

interface BookTicketButtonProps {
  seatIds: number[];
  screeningId: number;
  userId: number;
}

const BookTicketButton: React.FC<BookTicketButtonProps> = ({ seatIds, screeningId, userId }) => {
  const handleBookTickets = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seatIds, screeningId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to book tickets");
        return;
      }

      const data = await response.json();
      alert("Tickets booked successfully!");
      console.log(data);
    } catch (error) {
      alert("An error occurred while booking tickets.");
      console.error("Booking error:", error);
    }
  };

  return (
    <Button onClick={handleBookTickets} variant="outline" className="mt-4 text-white bg-[#B71313]">
      Boka biljett
    </Button>
  );
};

export default BookTicketButton;
