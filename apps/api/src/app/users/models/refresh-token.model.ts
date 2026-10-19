import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IRefreshToken {
  user: Types.ObjectId;
  token: string;
  expiresAt: Date;
  isRevoked: boolean;
  userAgent?: string;
  ipAddress?: string;
  createdAt: Date;
}

export interface IRefreshTokenDocument extends IRefreshToken, Document {
  _id: Types.ObjectId;
}

export interface IRefreshTokenModel extends Model<IRefreshTokenDocument> {
  findValidToken(token: string): Promise<IRefreshTokenDocument | null>;
  revokeAllForUser(userId: string): Promise<number>;
}

const refreshTokenSchema = new Schema<IRefreshTokenDocument, IRefreshTokenModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isRevoked: { type: Boolean, default: false },
    userAgent: String,
    ipAddress: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

refreshTokenSchema.statics.findValidToken = function (token: string) {
  return this.findOne({ token, isRevoked: false, expiresAt: { $gt: new Date() } });
};

refreshTokenSchema.statics.revokeAllForUser = async function (userId: string) {
  const result = await this.updateMany({ user: userId, isRevoked: false }, { isRevoked: true });
  return result.modifiedCount;
};

const RefreshToken =
  (mongoose.models.RefreshToken as IRefreshTokenModel) ||
  mongoose.model<IRefreshTokenDocument, IRefreshTokenModel>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
