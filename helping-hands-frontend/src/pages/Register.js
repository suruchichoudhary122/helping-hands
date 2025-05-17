import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get('type');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: typeFromQuery || 'donor', // Default or from query param
    agreeToTerms: false
  });

  const [facilityFields, setFacilityFields] = useState({
    facilityName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    website: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFacilityChange = (e) => {
    const { name, value } = e.target;
    setFacilityFields(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form (basic validation)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Combine data if facility
    const submitData = formData.userType === 'facility' 
      ? { ...formData, ...facilityFields } 
      : formData;
    
    // Here you would typically handle the registration logic
    console.log('Registration form submitted:', submitData);
    // TODO: Add API call to register endpoint
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="userType">I want to register as a:</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
              <option value="facility">Facility Administrator</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          {formData.userType === 'facility' && (
            <div className="facility-fields">
              <h3>Facility Information</h3>
              
              <div className="form-group">
                <label htmlFor="facilityName">Facility Name:</label>
                <input
                  type="text"
                  id="facilityName"
                  name="facilityName"
                  value={facilityFields.facilityName}
                  onChange={handleFacilityChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={facilityFields.address}
                  onChange={handleFacilityChange}
                  required
                />
              </div>
              
              <div className="form-group form-row">
                <div>
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={facilityFields.city}
                    onChange={handleFacilityChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={facilityFields.state}
                    onChange={handleFacilityChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="zipCode">Zip Code:</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={facilityFields.zipCode}
                    onChange={handleFacilityChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={facilityFields.phoneNumber}
                  onChange={handleFacilityChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="website">Website (Optional):</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={facilityFields.website}
                  onChange={handleFacilityChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Facility Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={facilityFields.description}
                  onChange={handleFacilityChange}
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
          )}
          
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToTerms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        
        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;