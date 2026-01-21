/**
 * Contact Routes
 * API endpoints for contact form handling
 */

const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllSubmissions,
  getSubmissionById
} = require('../controllers/contactController');
const { contactValidationRules, validate } = require('../middleware/validation');

// POST /api/contact - Submit contact form
router.post('/', contactValidationRules, validate, submitContact);

// GET /api/contact - Get all submissions (admin)
router.get('/', getAllSubmissions);

// GET /api/contact/:id - Get submission by ID
router.get('/:id', getSubmissionById);

module.exports = router;
