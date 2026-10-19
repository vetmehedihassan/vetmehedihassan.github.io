import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { ContentStatus } from '../../shared/constants/content-status';

export interface IEducation {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
  order: number;
  status: ContentStatus;
  deletedAt: Date | null;
}

export interface IEducationDocument extends IEducation, Document {
  _id: Types.ObjectId;
}

export type IEducationModel = Model<IEducationDocument>;

const educationSchema = new Schema<IEducationDocument, IEducationModel>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startYear: { type: Number, required: true },
    endYear: { type: Number, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.DRAFT },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

const Education =
  (mongoose.models.Education as IEducationModel) ||
  mongoose.model<IEducationDocument, IEducationModel>('Education', educationSchema);

export default Education;
