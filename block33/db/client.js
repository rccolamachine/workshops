const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:password@localhost:5432/fitness-dev";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;