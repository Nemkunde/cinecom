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
  ticketTypesTable,
} from "../db/schema";
import { eq, and, ilike, gte, lt } from "drizzle-orm";
import { moodifyMovieStructure, movieDbCall, Movies } from "./helpers";

export const getAllTicketTypes = async () => {
  try {
    const ticketTypes = await db.select().from(ticketTypesTable);

    return ticketTypes;
  } catch (error) {
    throw new Error("Error fetching ticketTypes");
  }
};
