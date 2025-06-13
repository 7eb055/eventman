import React from 'react';
import EventList from '../components/EventList';
import CtaSection from '../components/CtaSection';
import './css/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">Discover Amazing Events Near You</h1>
        <p className="hero-description">
          Join thousands of people attending conferences, workshops, concerts, and more 
          with our Smart Event Management System.
        </p>
      </section>
      
      <div className="content-section">
        <EventList />
        <CtaSection />
      </div>
    </div>
  );
}

export default HomePage;