import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';

const router = Router();

// GET /api/activities - Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId').sort({ loggedAt: -1 });
    res.json({
      message: 'Get all activities',
      endpoint: '/api/activities',
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: (error as Error).message });
  }
});

// POST /api/activities - Log a new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const newActivity = await Activity.create(req.body);
    res.status(201).json({
      message: 'Log a new activity',
      endpoint: '/api/activities',
      data: newActivity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity', details: (error as Error).message });
  }
});

// GET /api/activities/:id - Get a specific activity
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid activity id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const activity = await Activity.findById(objectId).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity ${req.params.id}`,
      endpoint: '/api/activities/:id',
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity', details: (error as Error).message });
  }
});

// PUT /api/activities/:id - Update an activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid activity id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const activity = await Activity.findByIdAndUpdate(objectId, req.body, { new: true }).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Update activity ${req.params.id}`,
      endpoint: '/api/activities/:id',
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity', details: (error as Error).message });
  }
});

// DELETE /api/activities/:id - Delete an activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid activity id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const activity = await Activity.findByIdAndDelete(objectId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Delete activity ${req.params.id}`,
      endpoint: '/api/activities/:id',
      deletedActivity: activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity', details: (error as Error).message });
  }
});

export default router;
