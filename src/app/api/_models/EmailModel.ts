import mongoose, { Document, Schema } from "mongoose";

export interface IEmail extends Document {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const emailSchema = new Schema<IEmail>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const EmailModel =
  mongoose.models.Email || mongoose.model<IEmail>("Email", emailSchema);