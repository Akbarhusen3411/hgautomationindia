/**
 * Service Controller
 * Handles business logic for service-related operations
 */

const { services } = require('../data/services');

/**
 * Get all services
 * @route GET /api/services
 */
const getAllServices = (req, res) => {
  // Support optional query params for filtering
  const { featured } = req.query;

  let result = services;

  // If featured param is true, return first 3 services
  if (featured === 'true') {
    result = services.slice(0, 3);
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
};

/**
 * Get service by ID
 * @route GET /api/services/:id
 */
const getServiceById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid service ID format'
    });
  }

  const service = services.find(s => s.id === id);

  if (!service) {
    return res.status(404).json({
      success: false,
      error: 'Service not found'
    });
  }

  res.json({
    success: true,
    data: service
  });
};

/**
 * Get service summaries (for cards)
 * @route GET /api/services/summaries
 */
const getServiceSummaries = (req, res) => {
  const summaries = services.map(({ id, title, shortDescription, icon }) => ({
    id,
    title,
    shortDescription,
    icon
  }));

  res.json({
    success: true,
    count: summaries.length,
    data: summaries
  });
};

module.exports = {
  getAllServices,
  getServiceById,
  getServiceSummaries
};
