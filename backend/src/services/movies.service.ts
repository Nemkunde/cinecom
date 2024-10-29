import { db } from "../db/drizzle";
import {
  actorsTable,
  auditoriumsTable,
  genresTable,
  movieActorsTable,
  movieDirectorsTable,
  movieGenresTable,
  moviesTable,
  screeningsTable,
} from "../db/schema";
import { eq, and, ilike, gte, lt } from "drizzle-orm";
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
    return moviesWithDirectorsActorsGenres[0];
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
        age_limit: movieData.age_limit,
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

interface SearchCriteria {
  title?: string;
  genre?: string;
  actorName?: string;
  date?: string;
  ageLimit?: number;
  language?: string;
}

export const searchMovie = async ({
  title,
  genre,
  actorName,
  date,
  ageLimit,
  language,
}: SearchCriteria) => {
  try {
    let startDate: any;
    let endDate: any;

    if (date) {
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
    }

    const moviesQuery = db
      .select({
        movieId: moviesTable.movie_id,
        title: moviesTable.title,
        description: moviesTable.description,
        duration: moviesTable.duration,
        trailerUrl: moviesTable.trailer_url,
        posterUrl: moviesTable.poster_url,
        genreName: genresTable.genre_name,
        actorName: actorsTable.actor_name,
        ageLimit: moviesTable.age_limit,
        language: moviesTable.language,
      })
      .from(moviesTable)
      .leftJoin(
        movieGenresTable,
        eq(movieGenresTable.movie_id, moviesTable.movie_id)
      )
      .leftJoin(
        genresTable,
        eq(genresTable.genre_id, movieGenresTable.genre_id)
      )
      .leftJoin(
        movieActorsTable,
        eq(movieActorsTable.movie_id, moviesTable.movie_id)
      )
      .leftJoin(
        actorsTable,
        eq(actorsTable.actor_id, movieActorsTable.actor_id)
      )
      .where(
        and(
          title ? ilike(moviesTable.title, `%${title}%`) : undefined,
          genre ? ilike(genresTable.genre_name, `%${genre}%`) : undefined,
          actorName
            ? ilike(actorsTable.actor_name, `%${actorName}%`)
            : undefined,
          ageLimit ? eq(moviesTable.age_limit, ageLimit) : undefined,
          language ? eq(moviesTable.language, language) : undefined
        )
      );

    const moviesMap = new Map<number, any>();

    (await moviesQuery).forEach((row) => {
      if (!moviesMap.has(row.movieId)) {
        moviesMap.set(row.movieId, {
          movieId: row.movieId,
          title: row.title,
          description: row.description,
          duration: row.duration,
          trailerUrl: row.trailerUrl,
          posterUrl: row.posterUrl,
          genres: new Set(),
          actors: new Set(),
          screenings: [],
          ageLimit: row.ageLimit,
          language: row.language,
        });
      }

      const movie = moviesMap.get(row.movieId);
      if (row.genreName) movie.genres.add(row.genreName);
      if (row.actorName) movie.actors.add(row.actorName);
    });

    for (const [movieId, movie] of moviesMap) {
      const screeningsQuery = db
        .select({
          startTime: screeningsTable.start_time,
          auditoriumName: auditoriumsTable.name,
        })
        .from(screeningsTable)
        .leftJoin(
          auditoriumsTable,
          eq(auditoriumsTable.auditorium_id, screeningsTable.auditorium_id)
        )
        .where(
          and(
            eq(screeningsTable.movie_id, movieId),
            date
              ? and(
                  gte(screeningsTable.start_time, startDate),
                  lt(screeningsTable.start_time, endDate)
                )
              : undefined
          )
        );

      const screenings = await screeningsQuery;

      if (screenings.length > 0) {
        movie.screenings = screenings.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
      } else if (date) {
        moviesMap.delete(movie.movieId);
      }
    }

    const movies = Array.from(moviesMap.values()).map((movie) => ({
      ...movie,
      genres: Array.from(movie.genres),
      actors: Array.from(movie.actors),
      screenings: Array.from(movie.screenings).sort(
        (a: any, b: any) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      ),
    }));

    return movies;
  } catch (error) {
    throw new Error("Could not search");
  }
};
