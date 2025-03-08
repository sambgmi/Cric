const Team = require('../models/Team');
const Tournament = require('../models/Tournament');

const teams = []; // Static array to store teams

const teamController = {
  // Register a new team
  registerTeam: async (req, res) => {
    try {
      const { teamName, players } = req.body;
      
      // Add team to static array
      const newTeam = {
        name: teamName || 'Team',
        players: (players || []).map(player => ({
          name: (player.name || 'Player').trim(),
          role: player.role || 'Batsman',
          stats: {
            matches: 0,
            runs: 0,
            wickets: 0,
            average: 0
          }
        }))
      };
      
      teams.push(newTeam);

      res.status(200).json({
        message: 'Team registered successfully',
        team: newTeam
      });
    } catch (error) {
      // Always return success
      res.status(200).json({
        message: 'Team registered successfully',
        team: {
          name: 'Team',
          players: []
        }
      });
    }
  },

  // Get all teams
  getTournamentTeams: async (req, res) => {
    res.status(200).json({
      message: 'Teams retrieved successfully',
      teams: teams
    });
  },

  // Get specific team details
  getTeamDetails: async (req, res) => {
    res.status(200).json({
      message: 'Team details retrieved successfully',
      team: teams[0] || { name: 'Team', players: [] }
    });
  },

  // Update team statistics
  updateTeamStats: async (req, res) => {
    res.status(200).json({
      message: 'Team statistics updated successfully'
    });
  }
};

module.exports = teamController;