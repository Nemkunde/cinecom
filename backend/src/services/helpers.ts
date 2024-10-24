import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import {
  actorsTable,
  directorsTable,
  genresTable,
  movieActorsTable,
  movieDirectorsTable,
  movieGenresTable,
  moviesTable,
} from "../db/schema";

export interface Movies {
  movie_id?: number;
  title: string;
  description: string;
  duration: number;
  trailer_url: string;
  poster_url: string;
  actor_ids: number[];
  director_ids: number[];
  genre_ids: number[];
}

interface ExtendedMovies {
  movieId: number;
  title: string;
  description: string;
  duration: number;
  trailer_url: string;
  poster_url: string;
  director: string | null;
  genre: string | null;
  actors: string | null;
}

export const movieDbCall = (single: boolean, movieId?: number) => {
  const baseQuery = db
    .select({
      movieId: moviesTable.movie_id,
      title: moviesTable.title,
      description: moviesTable.description,
      duration: moviesTable.duration,
      trailer_url: moviesTable.trailer_url,
      poster_url: moviesTable.poster_url,
      director: directorsTable.director_name,
      genre: genresTable.genre_name,
      actors: actorsTable.actor_name,
    })
    .from(moviesTable)
    .leftJoin(
      movieGenresTable,
      eq(movieGenresTable.movie_id, moviesTable.movie_id)
    )
    .leftJoin(genresTable, eq(genresTable.genre_id, movieGenresTable.genre_id))
    .leftJoin(
      movieActorsTable,
      eq(movieActorsTable.movie_id, moviesTable.movie_id)
    )
    .leftJoin(actorsTable, eq(actorsTable.actor_id, movieActorsTable.actor_id))
    .leftJoin(
      movieDirectorsTable,
      eq(movieDirectorsTable.movie_id, moviesTable.movie_id)
    )
    .leftJoin(
      directorsTable,
      eq(directorsTable.director_id, movieDirectorsTable.director_id)
    );

  if (single && movieId !== undefined) {
    return baseQuery.where(eq(moviesTable.movie_id, movieId));
  }

  return baseQuery;
};

export function moodifyMovieStructure(movies: ExtendedMovies[]) {
  const moviesMap = new Map();
  movies.forEach(
    ({
      movieId,
      title,
      description,
      duration,
      trailer_url,
      poster_url,
      genre,
      actors,
      director,
    }) => {
      if (!moviesMap.has(movieId)) {
        moviesMap.set(movieId, {
          title,
          description,
          duration,
          trailer_url,
          poster_url,
          director: [],
          genres: [],
          actors: [],
        });
      }

      if (genre && !moviesMap.get(movieId).genres.includes(genre)) {
        moviesMap.get(movieId).genres.push(genre);
      }

      if (actors && !moviesMap.get(movieId).actors.includes(actors)) {
        moviesMap.get(movieId).actors.push(actors);
      }

      if (director && !moviesMap.get(movieId).director.includes(director)) {
        moviesMap.get(movieId).director.push(director);
      }
    }
  );

  return moviesMap;
}
