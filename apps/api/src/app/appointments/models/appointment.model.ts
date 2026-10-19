import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export enum ServiceType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export interface IAppointment {
  petName: string;
  species: string;
  ownerName: string;
  phone: string;
  email?: string;
  serviceType: ServiceType;
  preferredNote?: string;
  status: AppointmentStatus;
  createdAt: Date;
}

export interface IAppointmentDocument extends IAppointment, Document {
  _id: Types.ObjectId;
}

export type IAppointmentModel = Model<IAppointmentDocument>;

const appointmentSchema = new Schema<IAppointmentDocument, IAppointmentModel>(
  {
    petName: { type: String, required: true },
    species: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    serviceType: { type: String, enum: Object.values(ServiceType), required: true },
    preferredNote: { type: String },
    status: { type: String, enum: Object.values(AppointmentStatus), default: AppointmentStatus.PENDING },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Appointment =
  (mongoose.models.Appointment as IAppointmentModel) ||
  mongoose.model<IAppointmentDocument, IAppointmentModel>('Appointment', appointmentSchema);

export default Appointment;
