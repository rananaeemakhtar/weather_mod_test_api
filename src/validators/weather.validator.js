const { body } = require('express-validator');

const weatherRequest = [
    body('city')
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 2 })
        .withMessage('City must be at least 2 characters'),
];

module.exports = {
    weatherRequest
};