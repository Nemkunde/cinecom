import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// import Header from "src/components/Header/Header";
// import Hero from "src/components/Hero/Hero";
// import Seatmap from "src/components/Seatmap/Seatmap";

export const Route = createRootRoute({
  component: () => (
    <div className="relative flex flex-col w-full h-full bg-gray-800">
      {/* <Header /> */}
      {/* <Hero /> */}
      {/* <Seatmap screeningsId={3} /> */}
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
