import { db } from "../db/drizzle";
import {
  auditoriumsTable,
  bookingsTable,
  bookingTicketsTable,
  moviesTable,
  screeningsTable,
  seatsTable,
  usersTable,
} from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_jwt_secret";

export const getAllUsers = async () => {
  try {
    const users = await db.select().from(usersTable);
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const getSingleUser = async (
  id: number
): Promise<{
  userId: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
} | null> => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.user_id, id))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    return {
      userId: user[0].user_id,
      email: user[0].email,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      role: user[0].role,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
};

export const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  phone: string,
  role: string = "user"
) => {
  const passwordValidationRegex =
    /^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,}$/;

  if (!passwordValidationRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain a letter, and either a number or a special character."
    );
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  try {
    const user = await db.insert(usersTable).values({
      email,
      firstname,
      lastname,
      password_hash: passwordHash,
      phone,
      role,
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};
export const signInUser = async (email: string, password: string) => {
  try {
    // Fetch user by email
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token with user details
    const token = generateToken(
      user.user_id,
      user.role,
      user.email,
      user.firstname,
      user.lastname
    );

    // Optionally, include other user fields if you need them
    return {
      user: {
        userId: user.user_id,
        email: user.email,
        firstname: user.firstname, // Add first name
        lastname: user.lastname, // Add last name
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error("Failed to login");
  }
};

export const getUserBookingHistory = async (id: number) => {
  try {
    const bookingHistory = await db
      .select({
        user_id: usersTable.user_id,
        booking_id: bookingsTable.booking_id,
        total_price: bookingsTable.total_price,
        status: bookingsTable.status,
        booking_date: bookingsTable.booking_date,
        seat_number: seatsTable.seat_number,
        row_number: seatsTable.row_number,
        auditorium_name: auditoriumsTable.name,
        movie_title: moviesTable.title,
        screening_start_time: screeningsTable.start_time,
      })
      .from(bookingsTable)
      .innerJoin(usersTable, eq(usersTable.user_id, bookingsTable.user_id))
      .innerJoin(
        seatsTable,
        eq(seatsTable.seat_id, bookingTicketsTable.seat_id)
      )
      .innerJoin(
        auditoriumsTable,
        eq(auditoriumsTable.auditorium_id, seatsTable.auditorium_id)
      )
      .innerJoin(
        screeningsTable,
        eq(screeningsTable.screening_id, bookingsTable.screening_id)
      )
      .innerJoin(
        moviesTable,
        eq(moviesTable.movie_id, screeningsTable.movie_id)
      )
      .where(eq(usersTable.user_id, id));

    if (bookingHistory.length === 0) {
      return null;
    }

    return bookingHistory;
  } catch (error) {
    throw new Error("Could not get booking history");
  }
};

export const generateToken = (
  userId: number,
  role: string,
  email?: string,
  firstname?: string,
  lastname?: string
) => {
  const payload = {
    userId,
    role,
    email,
    firstname,
    lastname,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
