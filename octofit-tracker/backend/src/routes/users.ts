import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = Router();

// GET /api/users - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({
      message: 'Get all users',
      endpoint: '/api/users',
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: (error as Error).message });
  }
});

// POST /api/users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: 'Create a new user',
      endpoint: '/api/users',
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: (error as Error).message });
  }
});

// GET /api/users/:id - Get a specific user
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await User.findById(objectId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `Get user ${req.params.id}`,
      endpoint: '/api/users/:id',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: (error as Error).message });
  }
});

// PUT /api/users/:id - Update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await User.findByIdAndUpdate(objectId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `Update user ${req.params.id}`,
      endpoint: '/api/users/:id',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: (error as Error).message });
  }
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await User.findByIdAndDelete(objectId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `Delete user ${req.params.id}`,
      endpoint: '/api/users/:id',
      deletedUser: user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: (error as Error).message });
  }
});

export default router;
