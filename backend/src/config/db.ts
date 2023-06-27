import mongoose from "mongoose";
import env from "../utils/validateEnv";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${(error as any).message}`);
    process.exit(1);
  }
};
