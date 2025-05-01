import { Schema, Document, models, model } from 'mongoose';

export interface IProject extends Document {
  _id: string; // Added id field for consistency
  title: string;
  category: string;
  deadline: string;
  description: string;
  imgDeleteURL?: string;
  imgDisplayURL?: string;
  startDate: string; // Fixed typo from "starDate" to "startDate"
  visible: boolean;
  status: string;
  budget?: number;
  techStacks: string[];
  clientName?: string;
  clientContact?: string;
  liveURL?: string; // Standardized casing (LiveURL -> liveURL)
  gitHubURL?: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true }, // Fixed field name from "placeholder" to "title"
    category: { type: String, required: true },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    imgDeleteURL: { type: String },
    imgDisplayURL: { type: String},
    startDate: { type: String, required: true }, // Fixed typo from "starDate" to "startDate"
    visible: { type: Boolean, required: true, default: true },
    status: { type: String, required: true, default: 'Pending' },
    budget: { type: Number, },
    techStacks: { type: [String], required: true, default: [] },
    clientName: { type: String, },
    clientContact: { type: String, },
    liveURL: { type: String, }, // Optional field
    gitHubURL: { type: String, }, // Optional field
  },
  { timestamps: true }
);

// Avoid model overwrite issue in Next.js
export const Project = models.Project || model<IProject>('Project', ProjectSchema);