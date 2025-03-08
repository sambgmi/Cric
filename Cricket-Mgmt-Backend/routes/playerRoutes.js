const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkPlayerAccess = require('../middleware/checkPlayerAccess');
const Player = require('../models/Player');
const playerController = require('../controllers/playerController');
const { playerValidation } = require('../middleware/playerValidator');

// Get all players
router.get('/', auth, async (req, res) => {
  try {
    const players = await Player.find().select('name role stats');
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update player
router.put('/:id', 
  auth, 
  playerValidation, 
  checkPlayerAccess, 
  playerController.updatePlayer
);

// Get player by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;