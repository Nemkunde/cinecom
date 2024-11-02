import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";

type Booking = {
  screening: number;
};

interface FormValues {
  seatIds: number[];
  screeningId: number;
  customerName?: string;
  customerEmail?: string;
  userId?: number;
  ticketTypeId: number;
}

export const Route = createFileRoute("/movies/$movieId/$book")({
  validateSearch: (search: Record<string, unknown>): Booking => {
    return {
      screening: Number(search?.screening ?? 1),
    };
  },
  component: () => {
    const [formValues, setFormValues] = useState<FormValues>({
      seatIds: [],
      screeningId: 0,
      customerName: "",
      customerEmail: "",
      userId: 0,
      ticketTypeId: 0,
    });

    const { screening } = useSearch({ from: "/movies/$movieId/$book" });

    console.log("askfhasjkfhasjkfas", screening);

    return <div className="w-72 h-72 bg-sky-500">HALLÅÅÅÅ</div>;
  },
});
