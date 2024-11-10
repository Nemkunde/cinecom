import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface Props {
  movie: any;
  screening: any;
}

function SearchResult({ movie, screening }: Props) {
  return (
    <div className="flex-col">
      <div className="text-2xl text-[#F8C496] mb-4">
        <span className="capitalize">
          {format(new Date(screening.startTime), "EEEE d LLLL", { locale: sv })}
        </span>
      </div>
      <div className="flex items-center justify-between rounded-md p-6 mb-6 bg-[#F0EBD6]">
        <div className="flex gap-4 items-center ">
          <img src={movie.posterUrl} width={100} height={40} />
          <div className="flex flex-col text-black">
            <span className="text-2xl font-bold">{movie.title}</span>
            <span>{screening.auditoriumName}</span>
            <div className="flex gap-2">
              {movie.genres.map((genre) => (
                <span>{genre}</span>
              ))}
            </div>
            <span>{movie.language}</span>
            <span>{format(new Date(screening.startTime), "HH:mm")}</span>
          </div>
        </div>
        <Link to={`/movies/${movie.movieId}/book`}>
          <Button variant={"destructive"}>Boka Biljett</Button>
        </Link>
        <Link to={`/movies/${movie.movieId}`}>
          <Button variant={"destructive"}>Läs mer</Button>
        </Link>
      </div>
    </div>
  );
}

export default SearchResult;
