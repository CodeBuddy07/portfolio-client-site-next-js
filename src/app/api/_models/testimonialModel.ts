import mongoose, { Schema, Document, models, model } from 'mongoose';

/**
 * Interface for the Testimonial document
 * @interface ITestimonial
 * @extends Document
 */
export interface ITestimonial extends Document {
  _id: string;
  name: string;
  position?: string;
  company: string;
  starCount: number;
  testimonial: string;
  imgDeleteURL?: string;
  imgDisplayURL?: string;
  projectID?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
  isActive: boolean;
}

/**
 * Schema definition for the Testimonial model
 */
const TestimonialSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    position: {
      type: String,
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters']
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    starCount: {
      type: Number,
      required: [true, 'Star rating is required'],
      min: [1, 'Rating must be at least 1 star'],
      max: [5, 'Rating cannot exceed 5 stars'],
      default: 5
    },
    testimonial: {
      type: String,
      required: [true, 'Testimonial content is required'],
      trim: true,
      minlength: [10, 'Testimonial must be at least 10 characters long'],
      maxlength: [1000, 'Testimonial cannot exceed 1000 characters']
    },
    imgDeleteURL: {
      type: String,
      trim: true
    },
    imgDisplayURL: {
      type: String,
      trim: true
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);



// Create or retrieve the model
export const Testimonial = models.Testimonial || model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;