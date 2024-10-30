import React from "react";
import { Button } from "../ui/button";

interface RemoveBookingButtonProps {
  bookingId: number;
}

const RemoveBookingButton: React.FC<RemoveBookingButtonProps> = ({ bookingId }) => {
  const handleRemoveBooking = async () => {
    const confirmDelete = window.confirm("Are you sure you want to remove this booking?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to remove booking");
        return;
      }

      alert("Booking removed successfully!");
      console.log("Booking removed:", bookingId);
    } catch (error) {
      alert("An error occurred while removing the booking.");
      console.error("Remove booking error:", error);
    }
  };

  return (
    <Button onClick={handleRemoveBooking} variant="outline" className="mt-4 bg-[#B71313]">
      Radera bokning
    </Button>
  );
};

export default RemoveBookingButton;
