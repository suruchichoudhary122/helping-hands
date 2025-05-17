import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Supporting Our Seniors Together</h1>
          <p>Connect with senior living facilities, donate, or volunteer your time to make a difference.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>How You Can Help</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Donate</h3>
            <p>Contribute financially to help senior living facilities provide better care and services.</p>
            <Link to="/register?type=donor" className="btn">Become a Donor</Link>
          </div>
          <div className="feature-card">
            <h3>Volunteer</h3>
            <p>Offer your time and skills to bring joy and support to elderly residents.</p>
            <Link to="/register?type=volunteer" className="btn">Become a Volunteer</Link>
          </div>
          <div className="feature-card">
            <h3>Register Facility</h3>
            <p>Register your senior living facility to connect with donors and volunteers.</p>
            <Link to="/register?type=facility" className="btn">Register Facility</Link>
          </div>
        </div>
      </section>

      <section className="impact">
        <h2>Our Impact</h2>
        <div className="impact-stats">
          <div className="stat">
            <h3>250+</h3>
            <p>Facilities Supported</p>
          </div>
          <div className="stat">
            <h3>1,000+</h3>
            <p>Active Volunteers</p>
          </div>
          <div className="stat">
            <h3>$500K+</h3>
            <p>Funds Raised</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"The volunteers from Helping Hands have brought so much joy to our residents. Their weekly visits are the highlight of our calendar."</p>
            <h4>- Sarah Johnson, Sunset Acres Facility Director</h4>
          </div>
          <div className="testimonial-card">
            <p>"Being able to contribute directly to specific needs at my local senior center makes me feel like I'm truly making a difference."</p>
            <h4>- Michael Thompson, Donor</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;