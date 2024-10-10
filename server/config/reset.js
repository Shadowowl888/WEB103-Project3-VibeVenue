import { pool } from "./database.js";
import "./dotenv.js";
import locationData from "../data/locations.js";
import eventData from "../data/events.js";

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations;
  
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(2) NOT NULL,
      zip VARCHAR(5) NOT NULL,
      image VARCHAR(255) NOT NULL
    )
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 locations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating locations table", err);
  };
};

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      location INTEGER NOT NULL,
      image VARCHAR(255) NOT NULL,
      remaining JSONB NOT NULL
    )
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  };
};

const seedLocationsTable = async () => {
  await createLocationsTable();

  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)"
    };

    const values = [
      location.name,
      location.address,
      location.city,
      location.state,
      location.zip,
      location.image
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location", err);
        return
      };
      console.log(`✅ ${location.name} added successfully`);
    });
  })
};

const seedEventsTable = async () => {
  await createEventsTable();
  
  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (title, date, time, location, image, remaining) VALUES ($1, $2, $3, $4, $5, $6)"
    };

    const values = [
      event.title,
      event.date,
      event.time,
      event.location,
      event.image,
      event.remaining
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return
      };
      console.log(`✅ ${event.title} added successfully`);
    });
  });
};

seedLocationsTable();
seedEventsTable();