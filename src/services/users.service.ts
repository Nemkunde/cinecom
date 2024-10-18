import { db } from "../db/drizzle";
import { usersTable } from "../db/schema";
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

export const getSingleUser = async (id: number): Promise<string | null> => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.user_id, id))
      .limit(1);

    if (user.length === 0) {
      return null;
    }

    return user[0].email;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

export const createUser = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  phone: string,
  role: string
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
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (user.length === 0) {
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(password, user[0].password_hash);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user[0].user_id, user[0].role);

    return { user: user[0], token };
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, secret, { expiresIn: "1h" });
};
