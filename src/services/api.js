/**
 * API Service
 * Handles all HTTP requests to the backend
 */

const API_BASE_URL = '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        ...data,
      };
    }

    return data;
  } catch (error) {
    // Network error or JSON parse error
    if (!error.status) {
      throw {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }
    throw error;
  }
}

/**
 * Service API calls
 */
export const serviceApi = {
  // Get all services
  getAll: (featured = false) => {
    const query = featured ? '?featured=true' : '';
    return fetchApi(`/services${query}`);
  },

  // Get service by ID
  getById: (id) => {
    return fetchApi(`/services/${id}`);
  },

  // Get service summaries
  getSummaries: () => {
    return fetchApi('/services/summaries');
  },
};

/**
 * Contact API calls
 */
export const contactApi = {
  // Submit contact form
  submit: (formData) => {
    return fetchApi('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};

/**
 * Health check
 */
export const healthCheck = () => {
  return fetchApi('/health');
};
