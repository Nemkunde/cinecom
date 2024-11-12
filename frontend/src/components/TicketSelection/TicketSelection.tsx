import React, { useEffect, useState } from "react";

import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";

type TicketType = {
  ticketTypeId: number;
  quantity: number;
};

interface Props {
  tickets: TicketType[];
  setTickets: (tickets: TicketType[]) => void;
}

function TicketSelection({ tickets, setTickets }: Props) {
  const [ticketTypes, setTicketTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTicketTypes = async () => {
      const res = await fetch(`/api/tickets/ticket-types`);
      const data = await res.json();

      // console.log("DATA", data);

      setTicketTypes(data.ticketTypes);
    };
    fetchTicketTypes();
  }, []);

  const handleQuantityChange = (ticketTypeId: number, change: number) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.ticketTypeId === ticketTypeId
        ? { ...ticket, quantity: Math.max(0, ticket.quantity + change) }
        : ticket
    );
    setTickets(updatedTickets);
  };

  const calculateTotalPrice = () => {
    return tickets.reduce((total, ticket) => {
      const ticketType = ticketTypes.find(
        (type) => type.ticket_type_id === ticket.ticketTypeId
      );
      return total + (ticketType.ticket_type_price ?? 0) * ticket.quantity;
    }, 0);
  };

  if (ticketTypes.length === 0) {
    return "Loading...";
  }

  return (
  <div className="p-4 flex flex-col sm:flex-row gap-4">
    <div className="text-[#F0EBD6] p-4 flex-grow">
      {ticketTypes.map((type) => {
        const ticket = tickets.find((t) => t.ticketTypeId === type.ticket_type_id);
        return (
          <div key={ticket?.ticketTypeId} className="mb-2 flex items-center justify-between gap-4">
            <label className="mr-4">{type.ticket_type}</label>
            <div className="flex items-center gap-2">
              <Button
                className="bg-gray-500 hover:bg-gray-400"
                disabled={ticket?.quantity === 0}
                onClick={() => handleQuantityChange(type.ticket_type_id, -1)}
              >
                -
              </Button>
              <Input
                className="w-12 text-center text-sm lg:text-base"
                min="0"
                value={ticket?.quantity ?? 0}
                onChange={(e) => handleQuantityChange(type.id, parseInt(e.target.value, 10))}
              />
              <Button
                className="bg-gray-500 hover:bg-gray-400"
                onClick={() => handleQuantityChange(type.ticket_type_id, 1)}
              >
                +
              </Button>
            </div>
          </div>
        );
      })}
    </div>

    <div className="text-[#F0EBD6] p-4 min-w-[250px] w-full lg:w-[300px]">
      <h3>Valda biljetter</h3>
      <ul>
        {tickets
          .filter((ticket) => ticket.quantity > 0)
          .map((ticket) => {
            const ticketType = ticketTypes.find(
              (type) => type.ticket_type_id === ticket.ticketTypeId
            );
            if (!ticketType) return null;
            const subtotal = ticketType.ticket_type_price * ticket.quantity;
            return (
              <li key={ticket.ticketTypeId} className="flex justify-between">
                <span>
                  {ticketType.ticket_type} x {ticket.quantity}
                </span>
                <span>{subtotal} SEK</span>
              </li>
            );
          })}
      </ul>
      <hr className="my-2" />
      <h3 className="text-lg font-bold">Total: {calculateTotalPrice()} SEK</h3>
    </div>
  </div>
);
}

export default TicketSelection;
