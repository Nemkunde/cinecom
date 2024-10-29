
import React, { useState } from "react";

interface TicketCounterProps {
  label: string;
}

export const TicketCounter: React.FC<TicketCounterProps> = ({ label }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(Math.max(0, count - 1));

  return (
    <div className="flex items-center gap-4 p-2">
      <button
        onClick={handleDecrement}
        className="px-2 py-1 text-xl font-semibold text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        -
      </button>
      <span className="text-lg font-medium">{count}</span>
      <button
        onClick={handleIncrement}
        className="px-2 py-1 text-xl font-semibold text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        +
      </button>
      <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
  );
};
