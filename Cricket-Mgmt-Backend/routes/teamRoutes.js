const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Team = require('../models/Team');

// Register new team
router.post('/register', auth, async (req, res) => {
  try {
    const { teamName, players } = req.body;

    // Validate user ID from token
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!teamName || !players) {
      return res.status(400).json({ message: 'Team name and players are required' });
    }

    // Validate team size
    if (players.length !== 11) {
      return res.status(400).json({ message: 'Team must have exactly 11 players' });
    }

    // Validate player data
    if (players.some(player => !player.name || !player.role)) {
      return res.status(400).json({ message: 'All players must have name and role' });
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team name already exists' });
    }

    const team = new Team({
      name: teamName,
      players: players.map(player => ({
        name: player.name,
        role: player.role,
        stats: {
          matches: 0,
          runs: 0,
          wickets: 0,
          average: 0
        }
      }))
    });

    const savedTeam = await team.save();
    res.status(201).json({ 
      message: 'Team registered successfully', 
      team: savedTeam 
    });
  } catch (error) {
    console.error('Team registration error:', error);
    res.status(500).json({ message: 'Failed to register team' });
  }
});

// Register new team (temporarily without auth)
router.post('/register', async (req, res) => {
  try {
    const { teamName, players } = req.body;

    if (!teamName || !players) {
      return res.status(400).json({ message: 'Team name and players are required' });
    }

    // Validate team size
    if (players.length !== 11) {
      return res.status(400).json({ message: 'Team must have exactly 11 players' });
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team name already exists' });
    }

    const team = new Team({
      name: teamName,
      players: players.map(player => ({
        name: player.name,
        role: player.role,
        stats: {
          matches: 0,
          runs: 0,
          wickets: 0,
          average: 0
        }
      }))
    });

    const savedTeam = await team.save();
    res.status(201).json({ 
      message: 'Team registered successfully', 
      team: savedTeam 
    });
  } catch (error) {
    console.error('Team registration error:', error);
    res.status(500).json({ message: 'Failed to register team' });
  }
});

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().select('name players');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;