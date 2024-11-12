import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "src/components/Context/AuthContext";
import Seatmap from "src/components/Seatmap/Seatmap";
import TicketSelection from "src/components/TicketSelection/TicketSelection";
import { Button } from "src/components/ui/button";
import { Card } from "src/components/ui/card";

type Booking = {
  screening: number;
};

interface FormValues {
  seatIds: number[];
  screeningId: number;
  customerName?: string;
  customerEmail?: string;
  userId?: number;
  tickets: {
    ticketTypeId: number;
    quantity: number;
  }[];
}

export const Route = createFileRoute("/movies/$movieId/$book")({
  validateSearch: (search: Record<string, unknown>): Booking => {
    return {
      screening: Number(search?.screening ?? 1),
    };
  },
  component: () => {
    const { screening } = useSearch({ from: "/movies/$movieId/$book" });
    const { user } = useAuth();

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [formValues, setFormValues] = useState<FormValues>({
      seatIds: selectedSeats,
      tickets: [
        { ticketTypeId: 1, quantity: 0 },
        { ticketTypeId: 2, quantity: 0 },
        { ticketTypeId: 3, quantity: 0 },
      ],
      screeningId: screening,
      userId: user?.userId ?? undefined,
      customerName: user?.firstname ?? "Guest",
      customerEmail: user?.email ?? "guest@example.com",
    });
    
    const [bookingMessage, setBookingMessage] = useState<string | null>(null); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 
    useEffect(() => {
      setFormValues((prev) => ({
        ...prev,
        seatIds: selectedSeats,
      }));
    }, [selectedSeats]);

    const mutation = useMutation({
      mutationFn: async () => {
        const response = await fetch(`/api/bookings/create-booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) {
          throw new Error("Failed to create booking");
        }

        return await response.json();
      },
      onSuccess: async (data) => {
        setBookingMessage("Bokningen lyckades!");
        setErrorMessage(null);
        console.log("Booking created", data);
        
      },
      onError: (error) => {
        setBookingMessage(null); 
        setErrorMessage("Bokningen misslyckades. Vänligen försök igen.");
        console.error("Error creating a booking", error);
      },
    });

    const handleSubmit = async () => {
      if (selectedSeats.length === 0) {
        setErrorMessage("Du måste välja platser innan du bokar.");
        return; 
      }

      setErrorMessage(null); 
      await mutation.mutateAsync();
    };

    const handleTicketsChange = (
      tickets: { ticketTypeId: number; quantity: number }[]
    ) => {
      setFormValues((prev) => ({
        ...prev,
        tickets,
      }));
    };

    const totalTickets = formValues.tickets.reduce(
      (sum, ticket) => sum + ticket.quantity,
      0
    );

    return (
  <div className="flex flex-col gap-4 items-center justify-center">
    <Card className="bg-[#121D3B] w-full max-w-[700px] mx-auto">
      <TicketSelection
        tickets={formValues.tickets}
        setTickets={handleTicketsChange}
      />
    </Card>
    <Card className="bg-[#121D3B] p-4 flex flex-col w-full max-w-[700px] mx-auto">
      <Seatmap
        screeningsId={screening}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        maxSeats={totalTickets}
      />
    </Card>
    
    <Button
      className="bg-red-700 mt-2 mb-2 justify-center w-[200px]"
      variant="destructive"
      onClick={handleSubmit}
    >
      Boka
    </Button>
    
    {errorMessage && (
      <p className="text-center text-red-500 mt-2">
        {errorMessage}
      </p>
    )}

    {bookingMessage && (
      <p className="text-center text-white mt-2">
        {bookingMessage}
      </p>
    )}
  </div>
);

  },
});
