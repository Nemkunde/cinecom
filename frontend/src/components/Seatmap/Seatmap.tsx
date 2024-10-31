import { useEffect, useState } from "react";

type Seat = {
  seat_id: number;
  seat_number: number;
  row_number: string;
  status: "available" | "booked";
};

function Seatmap({ screeningId }: { screeningId: number }) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Saves chosen seats

  useEffect(() => {
    // Kontrollera att screeningId är korrekt
    console.log("Current screeningId:", screeningId);

    if (!screeningId) {
      console.error("Invalid screeningId provided:", screeningId);
      return; // Avbryt om screeningId är ogiltigt
    }

    // API-anrop för att hämta sittplatser för den specifika visningen
    const fetchSeats = async () => {
      try {
        const res = await fetch(`/api/seats/seatmap/${screeningId}`);
        const data = await res.json();

        console.log("Fetched seats:", data); // Loggar de hämtade sittplatserna

        if (Array.isArray(data)) {
          setSeats(data);
        } else {
          console.error("Expected an array but got:", data);
          setSeats([]);
        }
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [screeningId]);

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
        body: JSON.stringify({ screeningId, seatsIds: selectedSeats, userId: 1 }), // Inkluderar `screeningId` i bokningen
      });
      const result = await response.json();
      if (response.ok) {
        alert("Platser bokade framgångsrikt!");
        setSelectedSeats([]);
        // Hämta uppdaterade sittplatser efter bokning
        const updatedSeats = await fetch(`/api/seats/seatmap/${screeningId}`);
        setSeats(await updatedSeats.json());
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