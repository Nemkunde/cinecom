import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  user: "postgres.asgyheyoxrrncmsjlbqt",
  host: "aws-0-eu-north-1.pooler.supabase.com",
  database: "postgres",
  password: "Cinecom123!",
  port: 6543,
});

export const db = drizzle(pool);
