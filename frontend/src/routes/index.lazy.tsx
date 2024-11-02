import { Button } from "src/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Hero from "src/components/Hero/Hero";
import DayBooker from "src/components/DayBooker/DayBooker";
// import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center bg-inherit w-full h-full">
      <Hero />
      <DayBooker />
    </div>
  );
}
