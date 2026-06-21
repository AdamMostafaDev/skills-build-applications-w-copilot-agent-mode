import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  totalScore: number;
  rank: number;
  totalActivityMinutes: number;
  workoutCount: number;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    totalActivityMinutes: {
      type: Number,
      default: 0,
    },
    workoutCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: false }
);

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
