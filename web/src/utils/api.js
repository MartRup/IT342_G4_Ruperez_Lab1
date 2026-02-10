// Utility functions for API calls with JWT authentication

const API_BASE_URL = 'http://localhost:8083/api';

// Function to get the JWT token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Generic API request function that includes the JWT token
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If the response is 401 (Unauthorized), redirect to login
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userFirstName');
    window.location.href = '/login';
    return;
  }

  return response;
};

// Specific API functions
export const authService = {
  login: async (credentials) => {
    return await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },
};

export const userService = {
  getUsers: async () => {
    return await apiRequest('/users');
  },

  getUser: async (id) => {
    return await apiRequest(`/users/${id}`);
  },

  deleteUser: async (id) => {
    return await apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

export default apiRequest;