import { useEffect, useState } from "react";
import { generateSeatingArrangement } from "src/utils/seatingUtils";

type Seat = {
  seat_id: number;
  seat_number: number;
  row_number: string;
  status: "available" | "booked";
};

function Seatmap({ salong }: { salong: "stor" | "liten" }) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Saves chosen seats

  useEffect(() => {
    console.log("Salong i Seatmap", salong);
    const arrangement = generateSeatingArrangement(salong);
    setSeats(arrangement);
    console.log(arrangement);
  }, [salong]);

  const groupSeatsByRow = (seats: Seat[]) => {
    const grouped = seats.reduce((acc: Record<string, Seat[]>, seat) => {
      if (!acc[seat.row_number]) {
        acc[seat.row_number] = [];
      }
      acc[seat.row_number].push(seat);
      return acc;
    }, {});

    Object.values(grouped).forEach((rowSeats) => {
      rowSeats.sort((a, b) => a.seat_number - b.seat_number);
    });

    return grouped;
  };

  const toggleSeatSelection = (seatId: number) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Välj minst en plats för att boka.");
      return;
    }

    try {
      const response = await fetch("/api/seats/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seatsIds: selectedSeats, userId: 1 }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Platser bokade framgångsrikt!");
        setSelectedSeats([]);
        setSeats(generateSeatingArrangement(salong));
      } else {
        alert(result.error || "Vissa platser är redan bokade.");
      }
    } catch (error) {
      console.error("Kunde inte boka platser:", error);
      alert("Fel vid bokning. Försök igen.");
    }
  };
  
  const seatsByRow = groupSeatsByRow(seats);

  const renderSeatRow = (row: string, seatsInRow: Seat[]) => {
    return (
      <div key={row}>
        <div className="flex gap-4 mt-2 justify-center">
          {seatsInRow.map((seat) => (
            <div
              key={seat.seat_id}
              onClick={() => seat.status === "available" && toggleSeatSelection(seat.seat_id)}
              className={`p-2 cursor-pointer ${seat.status === "booked" ? "bg-red-500" : selectedSeats.includes(seat.seat_id) ? "bg-blue-500" : "bg-green-500"
                } text-white rounded-md w-10 h-10 flex items-center justify-center`}
            >
              {row}
              {seat.seat_number}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Välj dina platser</h2>
      {Object.entries(seatsByRow)
        .sort(([rowA], [rowB]) => rowA.localeCompare(rowB))
        .map(([row, seatsInRow]) => renderSeatRow(row, seatsInRow))}
      <button
        onClick={handleBooking}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >Boka Biljett</button>
    </div>
  );
}

export default Seatmap;