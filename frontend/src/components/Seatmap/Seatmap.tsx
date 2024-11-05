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
}: {
  screeningsId: number;
  setSelectedSeats: React.Dispatch<React.SetStateAction<never[]>>;
  selectedSeats: any[];
}) {
  const [seats, setSeats] = useState<any[]>([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const res = await fetch(`/api/seats/seatmap/${screeningsId}`);
      const data = await res.json();
      setSeats(data.seats);
    };
    fetchSeats();
  }, [screeningsId]);

  const handleSelectSeats = (seat: any) => {
    if (seat.status === "available") {
      setSelectedSeats((prev: any) => {
        if (prev.includes(seat.seat_id)) {
          return prev.filter((s: any) => s !== seat.seat_id);
        } else {
          return [...prev, seat.seat_id];
        }
      });
    }
  };

  const renderSeatRow = (row: string, seatsInRow: any[]) => {
    return (
      <div key={row}>
        <div className="flex gap-4 mt-2 justify-center">
          {seatsInRow
            .slice()
            .sort((a, b) => b.seat_number - a.seat_number)
            .map((seat) => (
              <div
                className={`p-2
                ${seat.status === "booked" ? "bg-red-500" : selectedSeats.includes(seat.seat_id) ? "bg-white" : "bg-green-500"} 
                text-white rounded-md w-10 h-10 flex items-center justify-center
                `}
                // className={`p-2 ${seat.status === "booked" ? "bg-red-500" : "bg-green-500"} text-white rounded-md w-10 h-10 flex items-center justify-center`}
                onClick={() => handleSelectSeats(seat)}
              >
                {seat.row_number}
                {seat.seat_number}
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {Object.entries(seats)
        .sort(([rowA], [rowB]) => rowA.localeCompare(rowB))
        .map(([row, seatsInRow]) => renderSeatRow(row, seatsInRow))}
    </div>
  );
}

export default Seatmap;
