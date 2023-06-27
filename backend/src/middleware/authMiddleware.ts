import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import env from "../utils/validateEnv";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: JwtPayload | null;
}

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];
        // Verify token
        const decodedTkn: JwtPayload = jwt.verify(
          token,
          env.JWT_SECRET
        ) as JwtPayload;
        // Get user from token
        req.user = await User.findById(decodedTkn.id).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);
