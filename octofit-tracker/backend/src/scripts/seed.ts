/**
 * Seed the octofit_db database with test data
 *
 * Usage: npm run seed
 * This script clears existing data and populates the database with sample data
 * for testing and development purposes.
 */

import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding octofit_db database...');
    console.log(`📡 Connecting to MongoDB at ${MONGODB_URI}`);

    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create users
    console.log('👥 Creating users...');
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        displayName: 'Alex Johnson',
        bio: 'Marathon enthusiast and fitness coach',
        fitnessLevel: 'advanced',
        totalActivityMinutes: 1250,
        totalWorkouts: 45,
      },
      {
        username: 'jessica_yoga',
        email: 'jessica@example.com',
        displayName: 'Jessica Chen',
        bio: 'Yoga instructor and wellness advocate',
        fitnessLevel: 'advanced',
        totalActivityMinutes: 980,
        totalWorkouts: 52,
      },
      {
        username: 'mike_gym',
        email: 'mike@example.com',
        displayName: 'Mike Rodriguez',
        bio: 'Bodybuilder and fitness influencer',
        fitnessLevel: 'advanced',
        totalActivityMinutes: 1520,
        totalWorkouts: 68,
      },
      {
        username: 'sarah_beginner',
        email: 'sarah@example.com',
        displayName: 'Sarah Williams',
        bio: 'Just started my fitness journey',
        fitnessLevel: 'beginner',
        totalActivityMinutes: 180,
        totalWorkouts: 12,
      },
      {
        username: 'david_cyclist',
        email: 'david@example.com',
        displayName: 'David Lee',
        bio: 'Road cyclist and adventure seeker',
        fitnessLevel: 'intermediate',
        totalActivityMinutes: 650,
        totalWorkouts: 28,
      },
      {
        username: 'emma_swimmer',
        email: 'emma@example.com',
        displayName: 'Emma Brown',
        bio: 'Competitive swimmer',
        fitnessLevel: 'advanced',
        totalActivityMinutes: 890,
        totalWorkouts: 38,
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create teams
    console.log('👫 Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Thunder Runners',
        description: 'Elite running club for marathon training',
        leaderId: users[0]!._id,
        members: [users[0]!._id, users[3]!._id],
        totalActivityMinutes: 1430,
      },
      {
        name: 'Zen Fitness',
        description: 'Yoga and mindfulness focused group',
        leaderId: users[1]!._id,
        members: [users[1]!._id, users[4]!._id],
        totalActivityMinutes: 1630,
      },
      {
        name: 'Iron Warriors',
        description: 'Strength training and bodybuilding',
        leaderId: users[2]!._id,
        members: [users[2]!._id, users[5]!._id],
        totalActivityMinutes: 2410,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Update users with team assignments
    await User.updateOne({ _id: users[3]!._id }, { teamId: teams[0]!._id });
    await User.updateOne({ _id: users[4]!._id }, { teamId: teams[1]!._id });
    await User.updateOne({ _id: users[5]!._id }, { teamId: teams[2]!._id });

    // Create activities
    console.log('🏃 Creating activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]!._id,
        type: 'running',
        duration: 45,
        intensity: 'high',
        calories: 580,
        distance: 8.5,
        description: 'Morning marathon prep run',
        loggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]!._id,
        type: 'gym',
        duration: 60,
        intensity: 'medium',
        calories: 420,
        description: 'Strength training session',
        loggedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]!._id,
        type: 'yoga',
        duration: 90,
        intensity: 'low',
        calories: 280,
        description: 'Vinyasa flow class',
        loggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]!._id,
        type: 'gym',
        duration: 120,
        intensity: 'high',
        calories: 950,
        description: 'Chest and triceps workout',
        loggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]!._id,
        type: 'walking',
        duration: 30,
        intensity: 'low',
        calories: 150,
        distance: 2.5,
        description: 'Evening neighborhood walk',
        loggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]!._id,
        type: 'cycling',
        duration: 75,
        intensity: 'high',
        calories: 680,
        distance: 35,
        description: 'Road bike 35km ride',
        loggedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[5]!._id,
        type: 'swimming',
        duration: 60,
        intensity: 'high',
        calories: 520,
        distance: 2.0,
        description: 'Competitive lap swimming',
        loggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]!._id,
        type: 'sports',
        duration: 90,
        intensity: 'high',
        calories: 780,
        description: 'Basketball game',
        loggedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create workouts (personalized workout plans)
    console.log('💪 Creating workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[0]!._id,
        name: 'Marathon Training - Week 1',
        description: 'Intensive marathon preparation program',
        exercises: [
          { name: 'Long distance run', sets: 1, reps: 1, weight: 0 },
          { name: 'Interval sprints', sets: 8, reps: 400, weight: 0 },
          { name: 'Core strengthening', sets: 3, reps: 20, weight: 0 },
        ],
        duration: 90,
        difficulty: 'advanced',
        targetMuscleGroups: ['legs', 'core', 'full-body'],
      },
      {
        userId: users[1]!._id,
        name: 'Morning Yoga Flow',
        description: 'Relaxing morning routine for flexibility',
        exercises: [
          { name: 'Sun salutation', sets: 5, reps: 1, weight: 0 },
          { name: 'Warrior poses', sets: 1, reps: 60, weight: 0 },
          { name: 'Pigeon pose', sets: 2, reps: 30, weight: 0 },
        ],
        duration: 60,
        difficulty: 'intermediate',
        targetMuscleGroups: ['full-body'],
      },
      {
        userId: users[2]!._id,
        name: 'Chest Day Power',
        description: 'Heavy chest and triceps focus',
        exercises: [
          { name: 'Barbell bench press', sets: 4, reps: 8, weight: 100 },
          { name: 'Incline dumbbell press', sets: 3, reps: 10, weight: 35 },
          { name: 'Tricep dips', sets: 3, reps: 12, weight: 0 },
          { name: 'Cable fly', sets: 3, reps: 15, weight: 20 },
        ],
        duration: 90,
        difficulty: 'advanced',
        targetMuscleGroups: ['chest', 'arms'],
      },
      {
        userId: users[3]!._id,
        name: 'Beginner Full Body',
        description: 'Starter workout for fitness beginners',
        exercises: [
          { name: 'Bodyweight squats', sets: 3, reps: 15, weight: 0 },
          { name: 'Push-ups', sets: 3, reps: 8, weight: 0 },
          { name: 'Walking lunges', sets: 2, reps: 10, weight: 0 },
        ],
        duration: 30,
        difficulty: 'beginner',
        targetMuscleGroups: ['full-body'],
      },
      {
        userId: users[4]!._id,
        name: 'Cyclist Leg Strength',
        description: 'Build cycling-specific leg power',
        exercises: [
          { name: 'Barbell squats', sets: 4, reps: 10, weight: 80 },
          { name: 'Leg press', sets: 3, reps: 12, weight: 150 },
          { name: 'Calf raises', sets: 3, reps: 20, weight: 50 },
        ],
        duration: 60,
        difficulty: 'intermediate',
        targetMuscleGroups: ['legs'],
      },
      {
        userId: users[5]!._id,
        name: 'Swimming Conditioning',
        description: 'Upper body conditioning for swimmers',
        exercises: [
          { name: 'Shoulder press', sets: 3, reps: 12, weight: 30 },
          { name: 'Lat pulldown', sets: 3, reps: 12, weight: 60 },
          { name: 'Resistance band rows', sets: 3, reps: 15, weight: 0 },
        ],
        duration: 45,
        difficulty: 'intermediate',
        targetMuscleGroups: ['shoulders', 'back', 'arms'],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    // Create leaderboard entries
    console.log('📊 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]!._id,
        teamId: teams[0]!._id,
        totalScore: 2850,
        rank: 1,
        totalActivityMinutes: 1250,
        workoutCount: 45,
      },
      {
        userId: users[2]!._id,
        teamId: teams[2]!._id,
        totalScore: 2720,
        rank: 2,
        totalActivityMinutes: 1520,
        workoutCount: 68,
      },
      {
        userId: users[1]!._id,
        teamId: teams[1]!._id,
        totalScore: 2480,
        rank: 3,
        totalActivityMinutes: 980,
        workoutCount: 52,
      },
      {
        userId: users[5]!._id,
        teamId: teams[2]!._id,
        totalScore: 2150,
        rank: 4,
        totalActivityMinutes: 890,
        workoutCount: 38,
      },
      {
        userId: users[4]!._id,
        teamId: teams[1]!._id,
        totalScore: 1890,
        rank: 5,
        totalActivityMinutes: 650,
        workoutCount: 28,
      },
      {
        userId: users[3]!._id,
        teamId: teams[0]!._id,
        totalScore: 1420,
        rank: 6,
        totalActivityMinutes: 180,
        workoutCount: 12,
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('📊 Seed Statistics:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Teams: ${teams.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Workouts: ${workouts.length}`);
    console.log(`   - Leaderboard entries: ${leaderboardEntries.length}`);
    console.log('\n');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
