// src/ui/TicketSelectionCard.tsx
import React from "react";
import { TicketCounter } from "src/components/ui/TicketCounter";

export const TicketSelectionCard: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4">Välj antal biljetter</h2>
      <TicketCounter label="Vuxen" />
      <TicketCounter label="Barn" />
      <TicketCounter label="Senior" />
    </div>
  );
};
