const Match = require("../models/matchSchema");

// Function to create a new match
exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to update match score in real time
exports.updateMatchScore = async (req, res) => {
  try {
    const { matchId } = req.params;
    const updatedMatch = await Match.findByIdAndUpdate(matchId, req.body, { new: true });

    if (!updatedMatch) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }

    // Emit live score update using Socket.io
    req.io.emit("scoreUpdate", updatedMatch);

    res.json({ success: true, match: updatedMatch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get match details
exports.getMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }
    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};