import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "src/components/Context/AuthContext";
import Seatmap from "src/components/Seatmap/Seatmap";
import TicketSelection from "src/components/TicketSelection/TicketSelection";
import { Button } from "src/components/ui/button";

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
        window.location.reload();
        console.log("Booking created", data);
      },
      onError: (error) => {
        console.error("Error creating a booking", error);
      },
    });

    const handleSubmit = async () => {
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
        <TicketSelection
          tickets={formValues.tickets}
          setTickets={handleTicketsChange}
        />
        <Seatmap
          screeningsId={screening}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          maxSeats={totalTickets}
        />
        <Button variant="destructive" onClick={handleSubmit}>
          Boka
        </Button>
      </div>
    );
  },
});
