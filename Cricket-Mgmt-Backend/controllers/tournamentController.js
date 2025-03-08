// const Tournament = require('../models/Tournament');
// const Player = require('../models/Player');
// const { validationResult } = require('express-validator');

// // Create Tournament
// exports.createTournament = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const tournament = await Tournament.create(req.body);
//     res.status(201).json(tournament);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get All Tournaments
// exports.getTournaments = async (req, res) => {
//   try {
//     const tournaments = await Tournament.find()
//       .select('_id name format startDate endDate location status')
//       .sort({ startDate: 'asc' });
//     res.json(tournaments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Tournament by ID
// exports.getTournamentById = async (req, res) => {
//   try {
//     const tournament = await Tournament.findById(req.params.id);
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }
//     res.json(tournament);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update Tournament
// exports.updateTournament = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const tournament = await Tournament.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }

//     res.json(tournament);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete Tournament
// exports.deleteTournament = async (req, res) => {
//   try {
//     const tournament = await Tournament.findByIdAndDelete(req.params.id);
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }
//     res.json({ message: 'Tournament deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Add these new methods to your existing tournamentController.js

// // Register player for tournament
// exports.registerPlayer = async (req, res) => {
//   try {
//     const tournament = await Tournament.findById(req.params.id);
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }

//     // Find the player associated with the logged-in user
//     const player = await Player.findOne({ userId: req.user.id });
//     if (!player) {
//       return res.status(404).json({ message: 'Player profile not found' });
//     }

//     // Check if tournament is open for registration
//     if (tournament.status !== 'Upcoming') {
//       return res.status(400).json({ message: 'Tournament registration is closed' });
//     }

//     // Check if player is already registered
//     if (tournament.registeredPlayers.includes(player._id)) {
//       return res.status(400).json({ message: 'You are already registered for this tournament' });
//     }

//     // Add player to tournament
//     tournament.registeredPlayers.push(player._id);
//     await tournament.save();

//     res.json({ 
//       success: true,
//       message: 'Successfully registered for tournament',
//       tournamentName: tournament.name
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get registered players for tournament
// exports.getRegisteredPlayers = async (req, res) => {
//   try {
//     const tournament = await Tournament.findById(req.params.id)
//       .populate('registeredPlayers', 'name role stats');
    
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }

//     res.json(tournament.registeredPlayers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Register player and team for tournament
// exports.registerTeam = async (req, res) => {
//   try {
//     const tournament = await Tournament.findById(req.params.id);
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }

//     const { teamName, players } = req.body;

//     // Ensure players is an array
//     if (!Array.isArray(players)) {
//       return res.status(400).json({ message: 'Players must be an array' });
//     }

//     // Validate team size
//     if (players.length < tournament.minPlayersPerTeam || 
//         players.length > tournament.maxPlayersPerTeam) {
//       return res.status(400).json({ 
//         message: `Team must have between ${tournament.minPlayersPerTeam} and ${tournament.maxPlayersPerTeam} players`
//       });
//     }
// // Add team registration validation
// exports.registerTeamValidation = [
//   check('teamName').notEmpty().withMessage('Team name is required'),
//   check('players')
//     .isArray({ min: 11, max: 11 })
//     .withMessage('Exactly 11 players are required'),
//   check('players.*.name').notEmpty().withMessage('Player name is required'),
//   check('players.*.role')
//     .isIn(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'])
//     .withMessage('Invalid player role')
// ];

// // Register team for tournament
// exports.registerTeam = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const tournament = await Tournament.findById(req.params.id);
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }

//     // Check if tournament is open for registration
//     if (tournament.status !== 'Upcoming') {
//       return res.status(400).json({ message: 'Tournament registration is closed' });
//     }

//     const { teamName, players } = req.body;

//     // Check if team name already exists
//     if (tournament.teams.some(team => team.name === teamName)) {
//       return res.status(400).json({ message: 'Team name already exists in this tournament' });
//     }

//     // Create new team with players
//     const newTeam = {
//       name: teamName,
//       players: players.map(player => ({
//         name: player.name,
//         role: player.role,
//         stats: {
//           matches: 0,
//           runs: 0,
//           wickets: 0,
//           average: 0
//         }
//       })),
//       matches: {
//         played: 0,
//         won: 0,
//         lost: 0,
//         draw: 0
//       }
//     };

//     // Add team to tournament
//     tournament.teams.push(newTeam);
//     await tournament.save();

//     res.status(201).json({
//       message: 'Team registered successfully',
//       team: newTeam
//     });

//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
// // Update tournament routes
// exports.getTournaments = async (req, res) => {
//   try {
//     const tournaments = await Tournament.find()
//       .select('_id name format startDate endDate location status teams')
//       .sort({ startDate: 'asc' });
//     res.json(tournaments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Add this new method to your tournament controller
// exports.getTournamentTeams = async (req, res) => {
//   try {
//     const tournament = await Tournament.findById(req.params.id)
//       .populate('teams.players', 'name role stats');
    
//     if (!tournament) {
//       return res.status(404).json({ message: 'Tournament not found' });
//     }

//     res.json(tournament.teams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const Tournament = require('../models/Tournament');
const Player = require('../models/Player');
const { validationResult, check } = require('express-validator');

// Create Tournament (Admin Only)
exports.createTournament = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const tournament = await Tournament.create(req.body);
    res.status(201).json({ message: 'Tournament created successfully', tournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tournaments
exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().select('-__v').sort({ startDate: 'asc' });
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tournament by ID
exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Tournament (Admin Only)
exports.updateTournament = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json({ message: 'Tournament updated successfully', tournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Tournament (Admin Only)
exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Player for Tournament
exports.registerPlayer = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    if (tournament.status !== 'Upcoming') return res.status(400).json({ message: 'Tournament registration is closed' });

    const player = await Player.findOne({ userId: req.user.id });
    if (!player) return res.status(404).json({ message: 'Player profile not found' });
    if (tournament.registeredPlayers.includes(player._id)) return res.status(400).json({ message: 'Already registered' });

    tournament.registeredPlayers.push(player._id);
    await tournament.save();
    res.json({ message: 'Successfully registered for tournament', tournamentName: tournament.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Team for Tournament
exports.registerTeam = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { teamName, players } = req.body;
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    if (tournament.status !== 'Upcoming') return res.status(400).json({ message: 'Tournament registration is closed' });
    if (tournament.teams.some(team => team.name === teamName)) return res.status(400).json({ message: 'Team name already exists' });
    if (players.length < tournament.minPlayersPerTeam || players.length > tournament.maxPlayersPerTeam) {
      return res.status(400).json({ message: `Team must have between ${tournament.minPlayersPerTeam} and ${tournament.maxPlayersPerTeam} players` });
    }

    tournament.teams.push({ name: teamName, players });
    await tournament.save();
    res.status(201).json({ message: 'Team registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Registered Players
exports.getRegisteredPlayers = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate('registeredPlayers', 'name role stats');
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament.registeredPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tournament Teams
exports.getTournamentTeams = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate('teams.players', 'name role stats');
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament.teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
