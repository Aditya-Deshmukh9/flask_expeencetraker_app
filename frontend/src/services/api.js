/**
 * API service for making requests to the backend
 */

// Get the API URL from environment variables or use the default local URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic fetch function with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
async function fetchWithErrorHandling(endpoint, options = {}) {
  try {
    const url = `${API_URL}${endpoint}`;
    
    // Set default headers if not provided
    if (!options.headers) {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }

    const response = await fetch(url, options);
    
    // Parse JSON response
    const data = await response.json();
    
    // Check if response is not OK (status code outside 200-299)
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * API service object with methods for different request types
 */
const apiService = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>} - Response data
   */
  get: (endpoint) => fetchWithErrorHandling(endpoint),
  
  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<any>} - Response data
   */
  post: (endpoint, data) => fetchWithErrorHandling(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<any>} - Response data
   */
  put: (endpoint, data) => fetchWithErrorHandling(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>} - Response data
   */
  delete: (endpoint) => fetchWithErrorHandling(endpoint, {
    method: 'DELETE',
  }),
};

export default apiService;
