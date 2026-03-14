import { Schema, model, models, Document } from "mongoose";

export interface ISkill extends Document {
  _id: string;
  name: string;
  iconURL: string;
  color: string;    // hex brand color e.g. "#61dafb" — drives glow in TechStack
  order: number;    // display order in honeycomb (ascending, lower = first)
  visible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const SkillSchema = new Schema<ISkill>(
  {
    name:     { type: String,  required: true },
    iconURL:  { type: String,  required: true },
    color:    { type: String,  required: true, default: "#dc2626" },
    order:    { type: Number,  required: true, default: 0 },
    visible:  { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Skill = models.Skill || model<ISkill>("Skill", SkillSchema);