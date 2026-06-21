import { Router } from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

// GET /api/leaderboard - Get leaderboard standings
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().populate('userId').populate('teamId').sort({ rank: 1 });
    res.json({
      message: 'Get leaderboard standings',
      endpoint: '/api/leaderboard',
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: (error as Error).message });
  }
});

// GET /api/leaderboard/global - Get global leaderboard
router.get('/global', async (req: Request, res: Response) => {
  try {
    const standings = await Leaderboard.find()
      .populate('userId')
      .sort({ totalScore: -1 })
      .limit(50);
    res.json({
      message: 'Get global leaderboard',
      endpoint: '/api/leaderboard/global',
      count: standings.length,
      standings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch global leaderboard', details: (error as Error).message });
  }
});

// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teamStandings = await Leaderboard.aggregate([
      { $group: { _id: '$teamId', totalScore: { $sum: '$totalScore' }, memberCount: { $sum: 1 } } },
      { $sort: { totalScore: -1 } },
      { $lookup: { from: 'teams', localField: '_id', foreignField: '_id', as: 'teamInfo' } },
    ]);
    res.json({
      message: 'Get team leaderboard',
      endpoint: '/api/leaderboard/teams',
      count: teamStandings.length,
      teamStandings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard', details: (error as Error).message });
  }
});

// GET /api/leaderboard/:userId - Get user rank and stats
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId as string | string[] | undefined;
    userId = Array.isArray(userId) ? userId[0] : userId;
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const stats = await Leaderboard.findOne({ userId: userObjectId }).populate('userId').populate('teamId');
    if (!stats) {
      return res.status(404).json({ error: 'User leaderboard stats not found' });
    }
    res.json({
      message: `Get leaderboard stats for user ${req.params.userId}`,
      endpoint: '/api/leaderboard/:userId',
      stats,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats', details: (error as Error).message });
  }
});

export default router;
