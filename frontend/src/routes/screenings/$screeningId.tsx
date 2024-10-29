import { createFileRoute } from "@tanstack/react-router";
import BookTicketButton from "src/components/Buttonlogic/BookTicket";
import Seatmap from "src/components/Seatmap/Seatmap";
import { TicketSelectionCard } from "src/components/ui/TicketSelectionCard";
import { TicketSummaryCard } from "src/components/ui/TicketSummaryCard";


const tickets = [
  { type: "Vuxen", quantity: 1, price: 140 },
  { type: "Barn", quantity: 0, price: 80 },
  { type: "Pensionär", quantity: 0, price: 120 },
];


const TicketSelector = () => {
  const { screeningId } = Route.useParams();

  return (
    <div className="flex items-center justify-center">
      <div className="space-y-8 text-center">
        <TicketSelectionCard />
        <Seatmap screeningsId={+screeningId} />
        <TicketSummaryCard tickets={tickets} />
        <BookTicketButton seatIds={[1, 2]} screeningId={1} userId={41}/>
      </div>
    </div>
  );
};


export const Route = createFileRoute("/screenings/$screeningId")({
  component: TicketSelector,
});




// import { createFileRoute } from "@tanstack/react-router";
// import Seatmap from "src/components/Seatmap/Seatmap";
// import { TicketSelectionCard } from "src/components/ui/TicketSelectionCard";
// import {TicketSummaryCard} from "src/components/ui/TicketSummaryCard";



// const tickets = [
//   { type: "Vuxen", quantity: 2, price: 120 },
//   { type: "Barn", quantity: 1, price: 80 },
//   { type: "Student", quantity: 1, price: 100 },
// ];

// const TicketSummary = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <TicketSummaryCard tickets={tickets} />
//     </div>
//   );
// };

// 
// export const Routetickets = createFileRoute("/screenings/$screeningId")({
//   component: TicketSummary,
// });

// const TicketSelector = () => {
//   const { screeningId } = Route.useParams();

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="space-y-8 text-center">
//         <TicketSelectionCard /> 
//         <Seatmap screeningsId={+screeningId} />
//       </div>
//     </div>
//   );
// };

// export const Route = createFileRoute("/screenings/$screeningId")({
//   component: TicketSelector,
// });





/*export const Route = createFileRoute("/screenings/$screeningId")({
  component: () => {
    const { screeningId } = Route.useParams();
    return <Seatmap screeningsId={+screeningId} />;
  },
});*/


// function ScreeningComponent() {
//   const { screeningId } = Route.useParams();

//   console.log("SCREENING ID??", screeningId);

//   return <div>HALLÅ?????</div>;
//   // return <Seatmap screeningsId={+screeningId} />;
// }
