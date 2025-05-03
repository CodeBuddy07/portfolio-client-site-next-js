import { Schema, model, models, Document } from "mongoose";

export interface ISkill extends Document {
  _id: string;
  name: string;
  iconURL: string;
  percentage: number; // 0–100
  visible: boolean;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    iconURL: { type: String, required: true },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    visible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Skill = models.Skill || model<ISkill>("Skill", SkillSchema);
