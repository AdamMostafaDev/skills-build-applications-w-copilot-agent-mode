import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  displayName: string;
  profilePicture?: string;
  bio?: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  joinedAt: Date;
  totalActivityMinutes: number;
  totalWorkouts: number;
  teamId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    totalActivityMinutes: {
      type: Number,
      default: 0,
    },
    totalWorkouts: {
      type: Number,
      default: 0,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
