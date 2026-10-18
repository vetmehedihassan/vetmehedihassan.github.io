import mongoose from 'mongoose';
import { env } from './env';

let isConnected = false;

export async function connectToDatabase(): Promise<void> {
  if (isConnected) return;

  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongodbUri);
  isConnected = true;
}
