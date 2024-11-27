import { useEffect, useState } from "react";

type Seat = {
  seat_id: number;
  seat_number: number;
  row_number: string;
  status: "available" | "booked";
};

function Seatmap({
  screeningsId,
  setSelectedSeats,
  selectedSeats,
  maxSeats,
}: {
  screeningsId: number;
  setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>;
  selectedSeats: number[];
  maxSeats: number;
}) {
  const [seats, setSeats] = useState<Record<string, Seat[]>>({});

  useEffect(() => {
    const fetchSeats = async () => {
      try {
      const res = await fetch(`/api/seats/seatmap/${screeningsId}`);
      const data = await res.json();
        setSeats(data.seats);
      } catch (error) {
        console.error("Gick inte att hämta säten:", error);
      }
    };
    fetchSeats();
  }, [screeningsId]);

  const handleSelectSeats = (seat: Seat) => {
    if (seat.status === "booked") return; // Ignorera om sätet är bokat

    if (seat.status === "available") {
      setSelectedSeats((prev) => {
        if (prev.includes(seat.seat_id)) {
          return prev.filter((s) => s !== seat.seat_id);
        } else if (prev.length < maxSeats) {
          return [...prev, seat.seat_id];
        }
        return prev;
      });
    }
  };

const renderSeatRow = (row: string, seatsInRow: Seat[]) => {
  return (
    <div key={row} className="flex gap-1 justify-center mt-2 sm:gap-2">
      {seatsInRow
        .slice()
        .sort((a, b) => b.seat_number - a.seat_number)
        .map((seat) => (
          <div
            key={`${seat.seat_id}-${seat.row_number}-${seat.seat_number}`}
            className={`p-1
              ${seat.status === "booked" ? "bg-green-900 opacity-60" : selectedSeats.includes(seat.seat_id)
              ? "bg-gray-400 cursor-not-allowed"
              : selectedSeats.includes(seat.seat_id)
              ? "bg-green-700 brightness-200"
              : "bg-green-700 hover:cursor-pointer hover:bg-[#B7B7B7]"}
              text-white rounded-md 
              w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center
              text-xs sm:text-sm md:text-base
            `}
            onClick={() => handleSelectSeats(seat)}
            style={seat.status === "booked" ? { pointerEvents: "none" } : {}}
          >
            {seat.row_number}
            {seat.seat_number}
          </div>
        ))}
    </div>
  );
};


return (
  <div className="p-2 sm:p-4">
    {Object.entries(seats)
      .sort(([rowA], [rowB]) => rowA.localeCompare(rowB))
      .map(([row, seatsInRow]) => renderSeatRow(row, seatsInRow))}
  </div>
);



}

export default Seatmap;
