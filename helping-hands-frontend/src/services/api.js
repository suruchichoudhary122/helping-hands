const API_URL = 'http://localhost:5000'; // Change this to match your backend port

// Generic API request function with error handling
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_URL}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add authorization header here when you implement authentication
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    credentials: 'include', // Important for cookies/sessions if used
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// API service object with methods for different entities
const apiService = {
  // Test endpoint
  testConnection: () => apiRequest('/'),
  
  // User-related endpoints
  users: {
    register: (userData) => apiRequest('/api/users/register', 'POST', userData),
    login: (credentials) => apiRequest('/api/users/login', 'POST', credentials),
    getProfile: () => apiRequest('/api/users/profile'),
  },
  
  // Facility-related endpoints
  facilities: {
    getAll: () => apiRequest('/api/facilities'),
    getById: (id) => apiRequest(`/api/facilities/${id}`),
    create: (facilityData) => apiRequest('/api/facilities', 'POST', facilityData),
    update: (id, facilityData) => apiRequest(`/api/facilities/${id}`, 'PUT', facilityData),
  },
  
  // Add more endpoints as needed
};

export default apiService;
