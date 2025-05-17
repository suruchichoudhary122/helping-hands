// src/components/ApiTest.js

import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await apiService.testConnection();
        setApiStatus('Connected to API successfully! Response: ' + JSON.stringify(response));
      } catch (err) {
        setError('Failed to connect to API: ' + err.message);
        setApiStatus('Error');
      }
    };

    testBackendConnection();
  }, []);

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd' }}>
      <h2>API Connection Test</h2>
      <div>
        <strong>Status:</strong> {apiStatus}
      </div>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <p>
          If you're seeing a connection error, make sure your backend server is running at 
          the correct URL (check the API_URL in src/services/api.js).
        </p>
      </div>
    </div>
  );
};

export default ApiTest;