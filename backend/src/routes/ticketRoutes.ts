import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getTickets, createTicket } from "../controllers/ticketController";

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

export default router;
