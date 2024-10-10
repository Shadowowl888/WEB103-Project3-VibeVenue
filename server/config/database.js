import pg from "pg";
import "./dotenv.js";

const config = {
  // user: process.env.PGUSER,
  // password: process.env.PGPASSWORD,
  // host: process.env.PGHOST,
  // port: process.env.PGPORT,
  // database: process.env.PGDATABASE
  connectionString: process.env.CONNECTION_STRING
};

export const pool = new pg.Pool(config);