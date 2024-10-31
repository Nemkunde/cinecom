type Seat = {
  seat_id: number;
  seat_number: number;
  row_number: string;
  status: "available" | "booked";
};

export const generateSeatingArrangement = (salong: "stor" | "liten"): Seat[] => {
  const seatingArrangement: Seat[] = [];
  let seatId = 1;

  const addRow = (row: string, seatCount: number) => {
    for (let i = 1; i <= seatCount; i++) {
      seatingArrangement.push({
        seat_id: seatId++,
        seat_number: i,
        row_number: row,
        status: "available",
      });
    }
  };

  if (salong === "stor") {
    addRow("A", 8);
    addRow("B", 9);
    addRow("C", 10);
    addRow("D", 10);
    addRow("E", 10);
    addRow("F", 10);
    addRow("G", 12);
    addRow("H", 12);
  } else if (salong === "liten") {
    addRow("A", 6);
    addRow("B", 8);
    addRow("C", 9);
    addRow("D", 9);
    addRow("E", 10);
    addRow("F", 10);
    addRow("G", 12);
  }

  return seatingArrangement;
};