const Player = require('../models/Player');

const checkPlayerAccess = async (req, res, next) => {
  try {
    // Allow admin to update any player
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if the player is updating their own profile
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Compare player's user ID with logged-in user's ID
    if (player._id.toString() === req.user.id) {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized to update this player' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = checkPlayerAccess;