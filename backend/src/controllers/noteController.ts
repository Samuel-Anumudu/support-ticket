import { RequestHandler, Request } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Ticket from "../models/ticketModel";
import Note from "../models/noteModel";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload | null;
}

//  @desc Get notes for a ticket
//  @route GET /api/tickets/:ticketId/notes
//  @access Private
export const getNotes: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket?.user.toString() !== req.user?.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const notes = await Note.find({ ticket: req.params.ticketId });
    res.status(200).json(notes);
  }
);

//  @desc Create ticket note
//  @route POST /api/tickets/:ticketId/notes
//  @access Private
export const addNote: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket?.user.toString() !== req.user?.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const note = await Note.create({
      text: req.body.text,
      isStaff: false,
      ticket: req.params.ticketId,
      user: req.user?.id,
    });
    res.status(200).json(note);
  }
);
