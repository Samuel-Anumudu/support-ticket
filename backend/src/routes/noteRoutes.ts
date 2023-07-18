import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getNotes, addNote } from "../controllers/noteController";

const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

export default router;
