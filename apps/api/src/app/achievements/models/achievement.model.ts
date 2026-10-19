import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { ContentStatus } from '../../shared/constants/content-status';

export interface IAchievement {
  title: string;
  issuingOrg: string;
  order: number;
  status: ContentStatus;
  deletedAt: Date | null;
}

export interface IAchievementDocument extends IAchievement, Document {
  _id: Types.ObjectId;
}

export type IAchievementModel = Model<IAchievementDocument>;

const achievementSchema = new Schema<IAchievementDocument, IAchievementModel>(
  {
    title: { type: String, required: true },
    issuingOrg: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.DRAFT },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

const Achievement =
  (mongoose.models.Achievement as IAchievementModel) ||
  mongoose.model<IAchievementDocument, IAchievementModel>('Achievement', achievementSchema);

export default Achievement;
