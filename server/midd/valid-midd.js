const { body, validationResult } = require('express-validator');

const validateEnrollment = [
  body('course.id').notEmpty().withMessage('Course ID is required'),
  body('course.name').notEmpty().withMessage('Course name is required'),
  body('personalInfo.firstName').notEmpty().withMessage('First name is required'),
  body('personalInfo.lastName').notEmpty().withMessage('Last name is required'),
  body('personalInfo.email').isEmail().withMessage('Valid email is required'),
  body('payment.method').isIn(['credit-card', 'paypal', 'apple-pay']).withMessage('Invalid payment method'),
  body('termsAgreed').equals(true).withMessage('You must agree to the terms'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateEnrollment
};