import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscleGroups: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
        },
      },
    ],
    duration: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    targetMuscleGroups: [
      {
        type: String,
        enum: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full-body'],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
