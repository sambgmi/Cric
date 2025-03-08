const { check } = require('express-validator');

// Tournament creation/update validation
const tournamentValidation = [
  check('name')
    .notEmpty()
    .withMessage('Tournament name is required')
    .trim(),

  check('format')
    .notEmpty()
    .withMessage('Tournament format is required')
    .isIn(['Knockout', 'League', 'Round-Robin'])
    .withMessage('Invalid tournament format'),

  check('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Invalid start date format'),

  check('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('Invalid end date format')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  check('location')
    .notEmpty()
    .withMessage('Location is required')
    .trim()
];

// Team registration validation
const registerTeamValidation = [
  check('teamName')
    .notEmpty()
    .withMessage('Team name is required'),
  
  check('players')
    .isArray({ min: 11, max: 11 })
    .withMessage('Exactly 11 players are required'),
  
  check('players.*.name')
    .notEmpty()
    .withMessage('Player name is required'),
  
  check('players.*.role')
    .isIn(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'])
    .withMessage('Invalid player role')
];

module.exports = {
  tournamentValidation,
  registerTeamValidation
};