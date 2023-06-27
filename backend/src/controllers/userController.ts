import { RequestHandler, Request } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload | null;
}

export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Bad credentials! Please include all fields.");
  }

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as any),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password!))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as any),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// Private/Protected route
export const getCurrentUser: RequestHandler = asyncHandler(
  async (req: CustomRequest, res) => {
    if (req.user) {
      const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
      };
      res.status(200).json(user);
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);
