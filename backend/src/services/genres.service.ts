import { db } from "../db/drizzle";
import { genresTable } from "../db/schema";

export const getAllGenres = async () => {
  try {
    const genres = await db
      .select({ genre_name: genresTable.genre_name })
      .from(genresTable);

    return genres.map((genre) => ({ name: genre.genre_name }));
  } catch (error) {
    throw new Error("Error fetching genres");
  }
};
