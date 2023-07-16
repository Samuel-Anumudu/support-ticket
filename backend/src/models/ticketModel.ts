import mongoose, { InferSchemaType, model } from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      //   enum:["iPhone", "Macbook Pro", "iMac", "iPad"]
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

type Ticket = InferSchemaType<typeof ticketSchema>;

export default model<Ticket>("Ticket", ticketSchema);
