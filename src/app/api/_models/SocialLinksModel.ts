
import { Schema, Document, model, models } from "mongoose";

export interface ISocialLink extends Document {
  _id: string;
  platform: string;      
  url: string;           
  visible: boolean;      
}

const SocialLinkSchema = new Schema<ISocialLink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    visible: { type: Boolean, default: true },

  },
  { timestamps: true }
);


export const SocialLink = models.SocialLink || model<ISocialLink>("SocialLink", SocialLinkSchema);
