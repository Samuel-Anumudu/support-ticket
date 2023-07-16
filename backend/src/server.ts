import express from "express";
import colors from "colors";
import "dotenv/config";
import { connectDB } from "./config/db";
import env from "./utils/validateEnv";

import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

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
  res.send("Hello, Welcome to Support Ticket by Samuel!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
