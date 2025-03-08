const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');
const { tournamentValidation, registerTeamValidation } = require('../middleware/tournamentValidator');
const mongoose = require('mongoose');

// Middleware to validate MongoDB ID
const validateMongoId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid tournament ID format' });
  }
  next();
};

// Public routes
router.get('/', tournamentController.getTournaments);
router.get('/:id', validateMongoId, tournamentController.getTournamentById);
router.get('/:id/teams', validateMongoId, tournamentController.getTournamentTeams);

// Protected routes
router.post('/', auth, tournamentValidation, tournamentController.createTournament);
router.put('/:id', auth, validateMongoId, tournamentValidation, tournamentController.updateTournament);
router.delete('/:id', auth, validateMongoId, tournamentController.deleteTournament);

// Team registration routes
router.post(
  '/:id/register-team',
  auth,
  validateMongoId,
  registerTeamValidation,
  tournamentController.registerTeam
);

// Player management routes
router.get('/:id/players', auth, validateMongoId, tournamentController.getRegisteredPlayers);
router.post('/:id/register', auth, validateMongoId, tournamentController.registerPlayer);

// Team registration routes
router.post('/:id/register-team', auth, teamController.registerTeam);
router.get('/:id/teams', teamController.getTournamentTeams);
router.get('/:tournamentId/teams/:teamId', teamController.getTeamDetails);
router.put('/:tournamentId/teams/:teamId/stats', auth, teamController.updateTeamStats);

module.exports = router;