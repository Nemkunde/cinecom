import { db } from "../db/drizzle";
import {
  movieActorsTable,
  movieDirectorsTable,
  movieGenresTable,
  moviesTable,
} from "../db/schema";
import { eq } from "drizzle-orm";
import { moodifyMovieStructure, movieDbCall, Movies } from "./helpers";

export const getAllMovies = async () => {
  try {
    const movies = await movieDbCall(false);
    const moviesWithDirectorsActorsGenres = Array.from(
      moodifyMovieStructure(movies).values()
    );
    return moviesWithDirectorsActorsGenres;
  } catch (error) {
    throw new Error("Error fetching all movies");
  }
};

export const getMovieById = async (movieId: number) => {
  try {
    const movies = await movieDbCall(true, movieId);
    const moviesWithDirectorsActorsGenres = Array.from(
      moodifyMovieStructure(movies).values()
    );
    return moviesWithDirectorsActorsGenres;
  } catch (error) {
    throw new Error("Error getting movie by id");
  }
};

export const updateMovie = async (
  id: number,
  updates: Partial<typeof moviesTable.$inferInsert>
) => {
  try {
    const result = await db
      .update(moviesTable)
      .set(updates)
      .where(eq(moviesTable.movie_id, id))
      .returning();
    return result[0];
  } catch (error) {
    throw new Error("Could not update movie");
  }
};

export const deleteMovie = async (id: number) => {
  try {
    const result = await db
      .delete(moviesTable)
      .where(eq(moviesTable.movie_id, id))
      .returning();

    return result[0];
  } catch (error) {
    throw new Error("Could not delete movie");
  }
};

export const createMovie = async (movieData: Movies) => {
  return await db.transaction(async (tx) => {
    const [movie] = await tx
      .insert(moviesTable)
      .values({
        title: movieData.title,
        description: movieData.description,
        duration: movieData.duration,
        trailer_url: movieData.trailer_url,
        poster_url: movieData.poster_url,
      })
      .returning();

    if (movieData.director_ids.length > 0) {
      await tx.insert(movieDirectorsTable).values(
        movieData.director_ids.map((director_id) => ({
          movie_id: movie.movie_id,
          director_id,
        }))
      );
    }

    if (movieData.actor_ids.length > 0) {
      await tx.insert(movieActorsTable).values(
        movieData.actor_ids.map((actor_id) => ({
          movie_id: movie.movie_id,
          actor_id,
        }))
      );
    }

    if (movieData.genre_ids.length > 0) {
      await tx.insert(movieGenresTable).values(
        movieData.genre_ids.map((genre_id) => ({
          movie_id: movie.movie_id,
          genre_id,
        }))
      );
    }

    return movie;
  });
};
