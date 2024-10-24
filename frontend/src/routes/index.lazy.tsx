import { Button } from "src/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        setMovies(data);
      });
  }, []);

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      {/* {movies.map((movie) => {
        const actors = movie.actors.map((actor) => actor);
        return (
          <p>
            Actors in {movie.title} - {actors.join(", ")}
          </p>
        );
      })} */}
    </div>
  );
}
