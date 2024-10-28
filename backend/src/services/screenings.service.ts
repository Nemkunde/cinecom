import { db } from "../db/drizzle";
import { screeningsTable, moviesTable, auditoriumsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllScreenings = async () => {
  try {
    const screenings = await db
      .select({
        movie: moviesTable.title,
        auditorium: auditoriumsTable.name,
        startTime: screeningsTable.start_time,
      })
      .from(screeningsTable)
      .leftJoin(moviesTable, eq(screeningsTable.movie_id, moviesTable.movie_id))
      .leftJoin(
        auditoriumsTable,
        eq(screeningsTable.auditorium_id, auditoriumsTable.auditorium_id)
      );
    return screenings;
  } catch (error) {
    throw new Error("Error fetching seats");
  }
};

export const getScreeningsByMovieId = async (movieId: number) => {
  try {
    const screenings = await db
      .select({
        movie: moviesTable.title,
        auditorium: auditoriumsTable.name,
        startTime: screeningsTable.start_time,
      })
      .from(screeningsTable)
      .leftJoin(moviesTable, eq(screeningsTable.movie_id, moviesTable.movie_id))
      .leftJoin(
        auditoriumsTable,
        eq(screeningsTable.auditorium_id, auditoriumsTable.auditorium_id)
      )
      .where(eq(screeningsTable.movie_id, movieId));

    return screenings;
  } catch (error) {
    throw new Error("Error fetching screening");
  }
};
