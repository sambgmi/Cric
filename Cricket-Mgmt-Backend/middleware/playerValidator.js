const { check } = require('express-validator');

exports.playerValidation = [
  check('name')
    .notEmpty()
    .withMessage('Player name is required')
    .trim(),

  check('role')
    .notEmpty()
    .withMessage('Player role is required')
    .isIn(['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'])
    .withMessage('Invalid player role'),

  check('teamId')
    .optional()
    .isMongoId()
    .withMessage('Invalid team ID'),

  check('stats.matchesPlayed')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Matches played must be a positive number'),

  check('stats.runs')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Runs must be a positive number'),

  check('stats.wickets')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Wickets must be a positive number'),

  check('stats.strikeRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Strike rate must be a positive number'),

  check('stats.economyRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Economy rate must be a positive number')
];