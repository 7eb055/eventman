import axios from 'axios';

// API base URL - update this if your Laravel server runs on a different port
const API_URL = "http://localhost:8000";

// Flag to track if we've already shown the server connection error
let serverErrorShown = false;

// Enable withCredentials by default for all axios requests
axios.defaults.withCredentials = true;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // This is important for Laravel to identify AJAX requests
  },
  // Add timeout to avoid hanging requests
  timeout: 5000
});

// Helper function to check if the server is available
const checkServerAvailable = async () => {
  try {
    await axios.get(`${API_URL}/debug`, { timeout: 2000 });
    return true;
  } catch (error) {
    if (!serverErrorShown) {
      console.error('Laravel API server appears to be down or not accessible:', error.message);
      alert('Cannot connect to the server. Please make sure the Laravel backend is running at http://localhost:8000.');
      serverErrorShown = true;
    }
    return false;
  }
};

// Interceptor to handle common errors
api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    
    // Handle connection errors
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      console.error('Network connection error:', error.message);
      return Promise.reject(new Error('Cannot connect to the server. Please check if the backend server is running.'));
    }
    
    // Handle session expiration
    if (response && response.status === 401) {
      // Redirect to login or refresh token logic can go here
      console.error('Session expired. Please log in again.');
    }
    
    // Log detailed error information for debugging
    if (response) {
      console.error('API Error Response:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
    } else {
      console.error('API Error (No Response):', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Function to get CSRF cookie from Laravel Sanctum
export const getCsrfToken = async () => {
  try {
    // Check if server is available first
    if (!(await checkServerAvailable())) {
      throw new Error('Server not available');
    }
    
    console.log('Getting CSRF token...');
    const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      timeout: 3000
    });
    console.log('CSRF token response:', response);
    return response;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    
    // If it's a network error, provide a more friendly message
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      throw new Error('Cannot connect to authentication service. Please check if the server is running.');
    }
    
    throw error;
  }
};

// Test connection to the backend API
export const testConnection = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    console.error('API Connection Test Error:', error);
    throw error;
  }
};

// Send test data to the backend
export const sendTestData = async (data) => {
  try {
    const response = await api.post('/test', data);
    return response.data;
  } catch (error) {
    console.error('Send Test Data Error:', error);
    throw error;
  }
};

// Authentication API endpoints
export const registerUser = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    
    // Check if server is available
    if (!(await checkServerAvailable())) {
      throw new Error('Server not available');
    }
    
    // Skip CSRF token if server is not available or in development
    let csrfSuccess = false;
    try {
      await getCsrfToken();
      csrfSuccess = true;
    } catch (error) {
      console.warn('CSRF token retrieval failed. Attempting to register without it:', error.message);
      // Continue without CSRF token for development
    }
    
    // Make the registration request
    console.log('Making registration POST request to /register');
    
    // Add additional headers if CSRF failed
    const config = !csrfSuccess ? {
      headers: {
        'X-CSRF-TOKEN': 'development-token',
        'X-Requested-With': 'XMLHttpRequest'
      }
    } : {};
    
    const response = await api.post('/register', userData, config);
    
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration Error Details:', error);
    
    // Handle network connection errors
    if (error.message === 'Server not available' || 
        error.code === 'ERR_NETWORK' || 
        error.code === 'ECONNABORTED') {
      throw new Error(
        'Cannot connect to the registration service. Please ensure the backend server is running at http://localhost:8000'
      );
    }
    
    // Handle validation and other response errors
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
      
      // If Laravel returned validation errors, format them
      if (error.response.data && error.response.data.errors) {
        const formattedErrors = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('; ');
        throw new Error(formattedErrors);
      }
      
      // If Laravel returned a message
      if (error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    }
    
    // Default error message
    throw new Error(error.message || 'Registration failed. Please try again later.');
  }
};

export const loginUser = async (credentials) => {
  try {
    await getCsrfToken(); // Get CSRF token first
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Get Current User Error:', error);
    throw error;
  }
};

// Event API endpoints
export const getEvents = async (params = {}) => {
  try {
    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    console.error('Get Events Error:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Get Event ${id} Error:`, error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    await getCsrfToken(); // Get CSRF token first
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Create Event Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    await getCsrfToken(); // Get CSRF token first
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Update Event Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update event');
  }
};

export const deleteEvent = async (id) => {
  try {
    await getCsrfToken(); // Get CSRF token first
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete Event Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete event');
  }
};

// Additional Event API endpoints
export const getEventsByCategory = async (category) => {
  try {
    const response = await api.get(`/events/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Get Events By Category Error:', error);
    throw error;
  }
};

export const getUpcomingEvents = async () => {
  try {
    const response = await api.get('/events/upcoming');
    return response.data;
  } catch (error) {
    console.error('Get Upcoming Events Error:', error);
    throw error;
  }
};

export const getPastEvents = async () => {
  try {
    const response = await api.get('/events/past');
    return response.data;
  } catch (error) {
    console.error('Get Past Events Error:', error);
    throw error;
  }
};

export const getEventsByOrganizer = async (organizerId) => {
  try {
    const response = await api.get(`/events/organizer/${organizerId}`);
    return response.data;
  } catch (error) {
    console.error('Get Events By Organizer Error:', error);
    throw error;
  }
};

// Export the api instance for more advanced usage
export default api;