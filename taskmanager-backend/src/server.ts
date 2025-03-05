import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/TaskRoutes";
import authRoutes from "./routes/AuthRoutes";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.SERVER_PORT || 5000;

/**
 * @brief Starts the Express server.
 * @details The server listens on the port defined in the environment variables or defaults to 5000.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
