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

// Get all players list
router.get('/list', async (req, res) => {
  try {
    const players = await Player.find()
      .populate('teamId', 'name')
      .populate('userId', 'name email')
      .select('name role stats teamId userId');
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getplayers", async (req, res) => {
  try {
    const players = await Player.find({ role: "player" }); // Fetch only players

    if (!players || players.length === 0) {
      return res.status(404).json({ message: "Players not found" });
    }

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);

    // Check for CastError (invalid ObjectId)
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;