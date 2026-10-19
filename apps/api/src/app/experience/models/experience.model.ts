import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { ContentStatus } from '../../shared/constants/content-status';

export enum ExperienceType {
  ROLE = 'ROLE',
  TRAINING = 'TRAINING',
}

export interface IExperience {
  type: ExperienceType;
  title: string;
  organization: string;
  location?: string;
  startDate: Date;
  endDate?: Date | null;
  isCurrent: boolean;
  bullets: string[];
  order: number;
  status: ContentStatus;
  deletedAt: Date | null;
}

export interface IExperienceDocument extends IExperience, Document {
  _id: Types.ObjectId;
}

export type IExperienceModel = Model<IExperienceDocument>;

const experienceSchema = new Schema<IExperienceDocument, IExperienceModel>(
  {
    type: { type: String, enum: Object.values(ExperienceType), required: true },
    title: { type: String, required: true },
    organization: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.DRAFT },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

const Experience =
  (mongoose.models.Experience as IExperienceModel) ||
  mongoose.model<IExperienceDocument, IExperienceModel>('Experience', experienceSchema);

export default Experience;
