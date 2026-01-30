/**
 * Contact Routes
 * API endpoints for contact form handling
 */

const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const { contactValidationRules, validate } = require('../middleware/validation');

// POST /api/contact - Submit contact form
router.post('/', contactValidationRules, validate, submitContact);

module.exports = router;
