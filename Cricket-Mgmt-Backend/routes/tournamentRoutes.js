const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');
const { protect, admin } = require('../middlewares/authMiddleware'); // Updated path
const { tournamentValidation } = require('../middleware/tournamentValidator');

// Public routes
router.get('/', tournamentController.getTournaments);
router.get('/:id', tournamentController.getTournamentById);

// Protected admin routes
router.post(
  '/',
  protect,
  admin,
  tournamentValidation,
  tournamentController.createTournament
);

router.put(
  '/:id',
  protect,
  admin,
  tournamentValidation,
  tournamentController.updateTournament
);

router.delete(
  '/:id',
  protect,
  admin,
  tournamentController.deleteTournament
);

module.exports = router;