import { RequestHandler, Request } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Ticket from "../models/ticketModel";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload | null;
}

//  @desc Get User Tickets
//  @route GET /api/tickets
//  @access Private
export const getTickets: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const tickets = await Ticket.find({ user: req.user?.id });
    res.status(200).json(tickets);
  }
);

//  @desc Get User Ticket
//  @route GET /api/tickets/:id
//  @access Private
export const getTicket: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user?.id) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    res.status(200).json(ticket);
  }
);

//  @desc Create new ticket
//  @route POST /api/tickets
//  @access Private
export const createTicket: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
      res.status(400);
      throw new Error("Please add a product and description");
    }

    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: req.user?.id,
      status: "new",
    });

    res.status(201).json(ticket);
  }
);

//  @desc Delete Ticket
//  @route DELETE /api/tickets/:id
//  @access Private
export const deleteTicket: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user?.id) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    await ticket.deleteOne();

    res.status(200).json({ success: true });
  }
);

//  @desc Update Ticket
//  @route PUT /api/tickets/:id
//  @access Private
export const updateTicket: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    // Get user using id in the JWT
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
    }

    if (ticket.user.toString() !== req.user?.id) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTicket);
  }
);
