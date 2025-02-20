import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err: Error) => console.error("Error connecting to PostgreSQL", err.stack));

export default client;
