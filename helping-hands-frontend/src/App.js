import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/Homepage.js';
import DonorDashboard from './pages/DonorDashboard';
import FacilityDashboard from './pages/FacilityDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import ApiTest from './components/ApiTest'; // Import the API test component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          {/* Include the API test component at the top of the main content */}
          <ApiTest />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/facility-dashboard" element={<FacilityDashboard />} />
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;