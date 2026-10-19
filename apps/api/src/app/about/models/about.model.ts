import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAbout {
  summary: string;
  currentRole: string;
  clinicName: string;
  petsServedStat: string;
  yearsExperienceStat: string;
  bvcRegistrationNumber: string;
  updatedAt: Date;
}

export interface IAboutDocument extends IAbout, Document {}

export type IAboutModel = Model<IAboutDocument>;

const aboutSchema = new Schema<IAboutDocument, IAboutModel>(
  {
    summary: { type: String, required: true },
    currentRole: { type: String, required: true },
    clinicName: { type: String, required: true },
    petsServedStat: { type: String, required: true },
    yearsExperienceStat: { type: String, required: true },
    bvcRegistrationNumber: { type: String, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

const About =
  (mongoose.models.About as IAboutModel) || mongoose.model<IAboutDocument, IAboutModel>('About', aboutSchema);

export default About;
