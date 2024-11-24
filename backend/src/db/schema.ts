import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
  numeric,
  pgEnum,
  customType,
} from "drizzle-orm/pg-core";

export const bookingStatus = pgEnum("status", ["Confirmed", "Cancelled"]);
export const ticketStatus = pgEnum("ticket_status", [
  "Active",
  "Cancalled",
  "Refunded",
]);

export const bookingReferenceType = customType<{ data: string }>({
  dataType() {
    return "char(6)";
  },
});

export const usersTable = pgTable("users", {
  user_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password_hash: varchar({ length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  phone: numeric().notNull(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
});

export const auditoriumsTable = pgTable("auditoriums", {
  auditorium_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
});

export const seatsTable = pgTable("seats", {
  seat_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  auditorium_id: integer("auditorium_id")
    .notNull()
    .references(() => auditoriumsTable.auditorium_id),
  seat_number: varchar().notNull(),
  row_number: varchar().notNull(),
  status: varchar("status", { length: 20 }).notNull().default("available"),
});

// export const bookingsTable = pgTable("bookings", {
//   booking_id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   user_id: integer("user_id")
//     .notNull()
//     .references(() => usersTable.user_id),
//   screening_id: integer("screening_id")
//     .notNull()
//     .references(() => screeningsTable.screening_id),
//   seat_id: integer("seat_id")
//     .notNull()
//     .references(() => seatsTable.seat_id),
//   total_price: integer(),
//   booking_date: timestamp("booking_date"),
//   status: bookingStatus("status").default("Confirmed"),
//   customer_name: varchar(),
//   customer_email: varchar(),
//   booking_reference: bookingReferenceType("booking_reference").unique(),
// });

export const bookingsTable = pgTable("bookings", {
  booking_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  screening_id: integer("screening_id")
    .notNull()
    .references(() => screeningsTable.screening_id),
  user_id: integer("user_id").references(() => usersTable.user_id),
  // seat_id: integer("seat_id")
  //   .notNull()
  //   .references(() => seatsTable.seat_id),
  // ticket_type_id: integer("ticket_type_id")
  //   .notNull()
  //   .references(() => ticketTypesTable.ticket_type_id),
  customer_name: varchar(),
  customer_email: varchar(),
  total_price: integer("total_price").notNull(),
  booking_reference: varchar("booking_reference", { length: 255 }).notNull(),
  status: varchar("status").notNull().default("Active"),
  booking_date: timestamp("booking_date").notNull().defaultNow(),
});

export const bookingTicketsTable = pgTable("bookingtickets", {
  booking_ticket_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  booking_id: integer("booking_id")
    .notNull()
    .references(() => bookingsTable.booking_id),
  seat_id: integer("seat_id")
    .notNull()
    .references(() => seatsTable.seat_id),
  ticket_type_id: integer("ticket_type_id")
    .notNull()
    .references(() => ticketTypesTable.ticket_type_id),
  quantity: integer().notNull().default(1),
});

export const moviesTable = pgTable("movies", {
  movie_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: text().notNull(),
  duration: integer().notNull(),
  trailer_url: varchar().notNull(),
  poster_url: text().notNull(),
  age_limit: integer(),
  language: text(),
});

export const genresTable = pgTable("genres", {
  genre_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  genre_name: varchar().notNull(),
});

export const movieGenresTable = pgTable("movie_genres", {
  movie_id: integer("movie_id")
    .notNull()
    .references(() => moviesTable.movie_id),
  genre_id: integer("genre_id")
    .notNull()
    .references(() => genresTable.genre_id),
});

export const movieActorsTable = pgTable("movie_actors", {
  movie_id: integer("movie_id")
    .notNull()
    .references(() => moviesTable.movie_id),
  actor_id: integer("actor_id")
    .notNull()
    .references(() => actorsTable.actor_id),
});

export const actorsTable = pgTable("actors", {
  actor_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  actor_name: varchar().notNull(),
});

export const movieDirectorsTable = pgTable("movie_directors", {
  movie_id: integer("movie_id")
    .notNull()
    .references(() => moviesTable.movie_id),
  director_id: integer("director_id")
    .notNull()
    .references(() => directorsTable.director_id),
});

export const directorsTable = pgTable("directors", {
  director_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  director_name: varchar().notNull(),
});

export const screeningsTable = pgTable("screenings", {
  screening_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  movie_id: integer("movie_id")
    .notNull()
    .references(() => moviesTable.movie_id),
  auditorium_id: integer("auditorium_id")
    .notNull()
    .references(() => auditoriumsTable.auditorium_id),
  start_time: timestamp("start_time").notNull().defaultNow(),
});

export const ticketsTable = pgTable("tickets", {
  ticket_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  booking_id: integer("booking_id")
    .notNull()
    .references(() => bookingsTable.booking_id),
  ticket_price: integer().notNull(),
  ticket_status: ticketStatus("ticket_status").notNull().default("Active"),
});

export const ticketTypesTable = pgTable("ticket_types", {
  ticket_type_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ticket_type: varchar({ length: 255 }).notNull(),
  ticket_type_price: integer().notNull(),
});

export const bookingHistoryTable = pgTable("bookinghistory", {
  history_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  booking_id: integer("booking_id")
    .notNull()
    .references(() => bookingsTable.booking_id),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.user_id),
  action: varchar(),
  status: varchar(),
  action_timestamp: timestamp("action_timestamp"),
});
