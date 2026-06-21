import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Team from '../models/Team.js';

const router = Router();

// GET /api/teams - Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('leaderId').populate('members');
    res.json({
      message: 'Get all teams',
      endpoint: '/api/teams',
      count: teams.length,
      teams,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams', details: (error as Error).message });
  }
});

// POST /api/teams - Create a new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json({
      message: 'Create a new team',
      endpoint: '/api/teams',
      data: newTeam,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team', details: (error as Error).message });
  }
});

// GET /api/teams/:id - Get a specific team
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid team id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const team = await Team.findById(objectId).populate('leaderId').populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Get team ${req.params.id}`,
      endpoint: '/api/teams/:id',
      team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team', details: (error as Error).message });
  }
});

// PUT /api/teams/:id - Update a team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid team id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const team = await Team.findByIdAndUpdate(objectId, req.body, { new: true })
      .populate('leaderId')
      .populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Update team ${req.params.id}`,
      endpoint: '/api/teams/:id',
      team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team', details: (error as Error).message });
  }
});

// DELETE /api/teams/:id - Delete a team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    let id = req.params.id as string | string[] | undefined;
    id = Array.isArray(id) ? id[0] : id;
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid team id' });
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const team = await Team.findByIdAndDelete(objectId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Delete team ${req.params.id}`,
      endpoint: '/api/teams/:id',
      deletedTeam: team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team', details: (error as Error).message });
  }
});

export default router;
