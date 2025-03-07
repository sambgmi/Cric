const { check } = require('express-validator');

exports.tournamentValidation = [
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
    .trim(),

  check('status')
    .optional()
    .isIn(['Upcoming', 'Ongoing', 'Completed'])
    .withMessage('Invalid status')
];