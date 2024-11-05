import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Seatmap from "src/components/Seatmap/Seatmap";
import { Button } from "src/components/ui/button";
import { TicketSelectionCard } from "src/components/ui/TicketSelectionCard";
import { TicketSummaryCard } from "src/components/ui/TicketSummaryCard";

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

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [formValues, setFormValues] = useState<FormValues>({
      seatIds: selectedSeats,
      tickets: [
        {
          ticketTypeId: 1,
          quantity: 2,
        },
      ],
      screeningId: screening,
      userId: undefined,
      customerName: "Lars",
      customerEmail: "lasse@aaa.com",
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
      onSuccess: (data) => {
        console.log("Booking created", data);
      },
      onError: (error) => {
        console.error("Error creating a booking", error);
      },
    });

    const handleSubmit = async () => {
      await mutation.mutateAsync();
    };

    return (
      <div>
        <TicketSelectionCard />
        <Seatmap
          screeningsId={screening}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
        <Button variant="destructive" onClick={handleSubmit}>
          Boka
        </Button>
        {/* <TicketSummaryCard tickets={formValues.ticket} /> */}
        {/* <BookTicketButton seatIds={[1, 2]} screeningId={1} userId={41} /> */}
      </div>
    );
  },
});