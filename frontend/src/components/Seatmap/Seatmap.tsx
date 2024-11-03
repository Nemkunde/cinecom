import { useEffect, useState } from "react";

type Seat = {
  seat_id: number;
  seat_number: number;
  row_number: string;
  status: "available" | "booked";
};

function Seatmap({ screeningsId }: { screeningsId: number }) {
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    const fetchSeatMap = async () => {
      try {
        const response = await fetch(`/api/seats/seatmap/${screeningsId}`);
        const data = await response.json();
        if (data.success) {
          setSeats(data);
        }
        console.log("DATA", data);
      } catch (error) {
        console.error("Failed to fetch seatmap", error);
      }
    };

    fetchSeatMap();
  }, [screeningsId]);

  if (!seats.length) {
    return <h1>LOADING BITCH</h1>;
  }

  console.log(seats);

  return <div>hej</div>;

  // useEffect(() => {
  //   const fetchSeats = async () => {
  //     const res = await fetch(`/api/seats/seatmap/${screeningsId}`);
  //     const data = await res.json();
  //     setSeats(data);
  //   };
  //   fetchSeats();
  // }, [screeningsId]);

  // console.log("seats", seats);

  // const groupSeatsByRow = (seats: Seat[]) => {
  //   const grouped = seats.reduce((acc: Record<string, Seat[]>, seat) => {
  //     if (!acc[seat.row_number]) {
  //       acc[seat.row_number] = [];
  //     }
  //     acc[seat.row_number].push(seat);
  //     return acc;
  //   }, {});

  //   Object.values(grouped).forEach((rowSeats) => {
  //     rowSeats.sort((a, b) => b.seat_number - a.seat_number);
  //   });

  //   return grouped;
  // };

  // const seatsByRow = groupSeatsByRow(seats);

  // const renderSeatRow = (row: string, seatsInRow: Seat[]) => {
  //   return (
  //     <div key={row}>
  //       {/* <span className="font-bold">{row}:</span> */}
  //       <div className="flex gap-4 mt-2 justify-center">
  //         {seatsInRow.map((seat) => (
  //           <div
  //             key={seat.seat_id}
  //             className={`p-2 ${seat.status === "booked" ? "bg-red-500" : "bg-green-500"} text-white rounded-md w-10 h-10 flex items-center justify-center`}
  //           >
  //             {row}
  //             {seat.seat_number}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // //   const renderSeat = (seat: Seat) => {
  // //     const isBooked = seat.status === "booked";
  // //     return (
  // //       <div
  // //         className={`p-2 m-1 ${isBooked ? "bg-red-500" : "bg-green-500"} text-white rounded-md`}
  // //       >
  // //         {seat.seat_number}-{seat.row_number}
  // //       </div>
  // //     );
  // //   };

  // return (
  //   <div>
  //     {Object.entries(seatsByRow)
  //       .sort(([rowA], [rowB]) => rowA.localeCompare(rowB))
  //       .map(([row, seatsInRow]) => renderSeatRow(row, seatsInRow))}
  //   </div>
  // );
}

export default Seatmap;
