import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { ContentStatus } from '../../shared/constants/content-status';

export interface IExpertise {
  title: string;
  description: string;
  order: number;
  status: ContentStatus;
  deletedAt: Date | null;
}

export interface IExpertiseDocument extends IExpertise, Document {
  _id: Types.ObjectId;
}

export type IExpertiseModel = Model<IExpertiseDocument>;

const expertiseSchema = new Schema<IExpertiseDocument, IExpertiseModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.DRAFT },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

const Expertise =
  (mongoose.models.Expertise as IExpertiseModel) ||
  mongoose.model<IExpertiseDocument, IExpertiseModel>('Expertise', expertiseSchema);

export default Expertise;
