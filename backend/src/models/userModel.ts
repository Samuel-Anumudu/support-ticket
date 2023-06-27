import mongoose, { InferSchemaType, model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add an password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
