import express from "express";
import "./config/dotenv.js";
import { pool } from "./config/database.js";
import apiRouter from "./routes/api.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "party.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "party.png")));
  app.use(express.static("public"));
};

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) =>
    res.sendFile(path.resolve("public", "index.html"))
  )
};

app.get("/", (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Event Scheduling API</h1>');
});

app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("⚠️ Error fetching data", err);
    res.status(500).send("⚠️ Error fetching data");
  };
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
});