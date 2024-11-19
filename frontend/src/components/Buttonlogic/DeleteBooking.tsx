import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";

interface RemoveBookingButtonProps {
  bookingId: number;
  onDelete?: () => void;
}

const RemoveBookingButton: React.FC<RemoveBookingButtonProps> = ({
  bookingId,
  onDelete,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemoveBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to remove booking");
        return;
      }

      
      if (onDelete) onDelete();
    } catch (error) {
      alert("An error occurred while removing the booking.");
      console.error("Remove booking error:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setShowConfirm(true)}
        variant="outline"
        className="mt-4 bg-[#B71313]"
      >
        Radera bokning
      </Button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card className="w-full max-w-sm bg-[#121D3B] text-white">
            <CardHeader>
              <p>Är du säker på att du vill radera bokningen?</p>
            </CardHeader>
            <div className="flex justify-end gap-2 mt-4 p-4">
              <Button
                variant="outline"
                className="bg-gray-500 text-white"
                onClick={() => setShowConfirm(false)}
              >
                Avbryt
              </Button>
              <Button
                variant="outline"
                className="bg-[#B71313] text-white"
                onClick={handleRemoveBooking}
              >
                Radera
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RemoveBookingButton;
