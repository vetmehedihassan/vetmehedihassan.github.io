import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export enum ContactSubmissionStatus {
  NEW = 'NEW',
  READ = 'READ',
}

export interface IContactSubmission {
  name: string;
  email: string;
  message: string;
  status: ContactSubmissionStatus;
  createdAt: Date;
}

export interface IContactSubmissionDocument extends IContactSubmission, Document {
  _id: Types.ObjectId;
}

export type IContactSubmissionModel = Model<IContactSubmissionDocument>;

const contactSubmissionSchema = new Schema<IContactSubmissionDocument, IContactSubmissionModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ContactSubmissionStatus),
      default: ContactSubmissionStatus.NEW,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ContactSubmission =
  (mongoose.models.ContactSubmission as IContactSubmissionModel) ||
  mongoose.model<IContactSubmissionDocument, IContactSubmissionModel>('ContactSubmission', contactSubmissionSchema);

export default ContactSubmission;
