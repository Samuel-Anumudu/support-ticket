import express from "express";
import { protect } from "../middleware/authMiddleware";
import noteRouter from "../routes/noteRoutes";
import {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
} from "../controllers/ticketController";

const router = express.Router();

// Re-route into note router
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

export default router;
