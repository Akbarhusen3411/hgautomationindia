/**
 * Service Routes
 * API endpoints for automation services
 */

const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  getServiceSummaries
} = require('../controllers/serviceController');

// GET /api/services/summaries - Get service summaries for cards
router.get('/summaries', getServiceSummaries);

// GET /api/services - Get all services
router.get('/', getAllServices);

// GET /api/services/:id - Get service by ID
router.get('/:id', getServiceById);

module.exports = router;
