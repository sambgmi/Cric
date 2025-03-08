const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  tournament: String,
  teams: {
    teamA: String,
    teamB: String
  },
  score: {
    teamA: { runs: Number, wickets: Number, overs: Number },
    teamB: { runs: Number, wickets: Number, overs: Number }
  },
  currentInning: { type: Number, default: 1 }, // 1 for first inning, 2 for second
  status: { type: String, default: "ongoing" }, // ongoing, completed
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);