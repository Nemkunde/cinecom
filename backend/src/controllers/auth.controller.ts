import { Request, Response } from "express";
import { signInUser, createUser } from "../services/users.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstname, lastname, phone, role } = req.body;

  if (!email || !password || !firstname || !lastname || !phone) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const user = await createUser(
      email,
      password,
      firstname,
      lastname,
      phone,
      role
    );
    res.status(201).json({ user });
  } catch (error: any) {
    if (error.message.includes("Password must be")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { user, token } = await signInUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
