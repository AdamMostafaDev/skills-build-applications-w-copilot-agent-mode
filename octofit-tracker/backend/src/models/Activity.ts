import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
  calories: number;
  distance?: number; // in kilometers
  description?: string;
  loggedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking', 'sports', 'other'],
    },
    duration: {
      type: Number,
      required: true,
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    calories: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
    },
    description: {
      type: String,
    },
    loggedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
