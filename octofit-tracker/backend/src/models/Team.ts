import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  leaderId: mongoose.Types.ObjectId;
  totalActivityMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    leaderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalActivityMinutes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITeam>('Team', TeamSchema);
