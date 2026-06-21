import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Workout from '../models/Workout.js';

const router = Router();

// GET /api/workouts - Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({
      message: 'Get all workouts',
      endpoint: '/api/workouts',
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: (error as Error).message });
  }
});

// POST /api/workouts - Create a new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json({
      message: 'Create a new workout',
      endpoint: '/api/workouts',
      data: newWorkout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout', details: (error as Error).message });
  }
});

// GET /api/workouts/:id - Get a specific workout
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const workout = await Workout.findById(objectId).populate('userId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${req.params.id}`,
      endpoint: '/api/workouts/:id',
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout', details: (error as Error).message });
  }
});

// PUT /api/workouts/:id - Update a workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const workout = await Workout.findByIdAndUpdate(objectId, req.body, { new: true }).populate('userId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Update workout ${req.params.id}`,
      endpoint: '/api/workouts/:id',
      workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout', details: (error as Error).message });
  }
});

// DELETE /api/workouts/:id - Delete a workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const workout = await Workout.findByIdAndDelete(objectId);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Delete workout ${req.params.id}`,
      endpoint: '/api/workouts/:id',
      deletedWorkout: workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout', details: (error as Error).message });
  }
});

// POST /api/workouts/:userId/suggest - Get personalized workout suggestions
router.post('/:userId/suggest', async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId as string | string[] | undefined;
    userId = Array.isArray(userId) ? userId[0] : userId;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const userWorkouts = await Workout.find({ userId: userObjectId }).populate('userId');
    res.json({
      message: `Get personalized workout suggestions for user ${req.params.userId}`,
      endpoint: '/api/workouts/:userId/suggest',
      userId: req.params.userId,
      recentWorkoutCount: userWorkouts.length,
      suggestions: [
        'Try increasing intensity in your next session',
        'Consider adding variety with different exercise types',
        'Schedule a rest day for recovery',
        'Focus on core strengthening exercises',
      ],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate suggestions', details: (error as Error).message });
  }
});

export default router;
