import { createFileRoute } from "@tanstack/react-router";
import Seatmap from "src/components/Seatmap/Seatmap";
import { TicketSelectionCard } from "src/components/ui/TicketSelectionCard";

const TicketSelector = () => {
  const { screeningId } = Route.useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-8 text-center">
        <TicketSelectionCard /> 
        <Seatmap screeningsId={+screeningId} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/screenings/$screeningId")({
  component: TicketSelector,
});





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
