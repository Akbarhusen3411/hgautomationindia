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
 * OTP API calls
 */
export const otpApi = {
  // Send email OTP
  sendEmailOTP: (email) => {
    return fetchApi('/otp/send-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify email OTP
  verifyEmailOTP: (email, otp) => {
    return fetchApi('/otp/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  // Send phone OTP
  sendPhoneOTP: (phone, dialCode) => {
    return fetchApi('/otp/send-phone', {
      method: 'POST',
      body: JSON.stringify({ phone, dialCode }),
    });
  },

  // Verify phone OTP
  verifyPhoneOTP: (phone, dialCode, otp) => {
    return fetchApi('/otp/verify-phone', {
      method: 'POST',
      body: JSON.stringify({ phone, dialCode, otp }),
    });
  },
};

/**
 * Health check
 */
export const healthCheck = () => {
  return fetchApi('/health');
};
