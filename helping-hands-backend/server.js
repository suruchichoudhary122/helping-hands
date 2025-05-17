const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's address
  credentials: true
}));

// Security middleware
app.use(helmet());

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'Helping Hands API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Frontend should be running on http://localhost:3000`);
  console.log('----------------------------------');
  console.log('Available endpoints:');
  console.log('GET / - Test endpoint');
});

module.exports = app;