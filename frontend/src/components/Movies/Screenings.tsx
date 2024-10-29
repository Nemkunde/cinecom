import { useQuery } from "@tanstack/react-query";
import React from "react";
import ScreeningBox from "./ScreeningBox";

interface Props {
  screenings: any[];
  movie: any;
  thumbnail: string;
}

function Screenings({ movie, screenings, thumbnail }: Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-4xl font-bold uppercase text-[#F0EBD6]">
        Visningstider
      </h2>
      {screenings.map((screening) => (
        <ScreeningBox
          auditorium={screening.auditorium}
          movie={screening.movie}
          startTime={screening.startTime}
          thumbnail={thumbnail}
          genres={movie.genres}
          language={movie.language}
        />
      ))}
    </div>
  );
}

export default Screenings;
