import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IResume {
  driveUrl: string;
  updatedAt: Date;
}

export interface IResumeDocument extends IResume, Document {}

export type IResumeModel = Model<IResumeDocument>;

const resumeSchema = new Schema<IResumeDocument, IResumeModel>(
  {
    driveUrl: { type: String, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

const Resume =
  (mongoose.models.Resume as IResumeModel) || mongoose.model<IResumeDocument, IResumeModel>('Resume', resumeSchema);

export default Resume;
