import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log("Conectado ao PostgreSQL"))
    .catch((err: Error) => console.error("Erro ao conectar ao PostgreSQL", err.stack));

export default client;
