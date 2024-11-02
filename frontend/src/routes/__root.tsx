import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";

// import Hero from "src/components/Hero/Hero";
// import Seatmap from "src/components/Seatmap/Seatmap";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col w-full h-full item-center justify-center bg-[#080F1F]">
      <>
        <Header />
        <Outlet />
      </>
      <Footer />
    </div>
  ),
});
