import React from "react";

interface Ticket {
  type: string;
  quantity: number;
  price: number;
}

interface TicketSummaryCardProps {
  tickets: Ticket[];
}

export const TicketSummaryCard: React.FC<TicketSummaryCardProps> = ({ tickets }) => {
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.quantity * ticket.price,
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Summering</h2>
      <ul className="space-y-2">
        {tickets.map((ticket, index) => (
          <li key={index} className="flex justify-between">
            <span>{ticket.type} (x{ticket.quantity})</span>
            <span>{ticket.price * ticket.quantity} kr</span>
          </li>
        ))}
      </ul>
      <div className="border-t mt-4 pt-4 flex justify-between font-bold">
        <span>Totalt</span>
        <span>{totalAmount} kr</span>
      </div>
    </div>
  );
};