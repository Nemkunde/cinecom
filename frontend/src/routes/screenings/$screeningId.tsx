import { createFileRoute } from "@tanstack/react-router";
import Seatmap from "src/components/Seatmap/Seatmap";

export const Route = createFileRoute("/screenings/$screeningId")({
  component: () => {
    const { screeningId } = Route.useParams();
    return <Seatmap screeningId={+screeningId} />;
  },
});

// function ScreeningComponent() {
//   const { screeningId } = Route.useParams();

//   console.log("SCREENING ID??", screeningId);

//   return <div>HALLÅ?????</div>;
//   // return <Seatmap screeningsId={+screeningId} />;
// }
