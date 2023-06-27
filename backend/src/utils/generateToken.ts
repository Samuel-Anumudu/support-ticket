import jwt from "jsonwebtoken";
import env from "./validateEnv";
export const generateToken = (id: string | any) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "365d" });
};
