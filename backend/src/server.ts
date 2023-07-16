import express from "express";
import colors from "colors";
import "dotenv/config";

import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";

import env from "./utils/validateEnv";
import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketRoutes";

// Connect to database
connectDB();

const app = express();
const PORT = env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Support Ticket App!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
