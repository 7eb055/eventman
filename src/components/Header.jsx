import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-main">
          <div className="logo-container">
            <Link to="/" className="logo">
              <span className="logo-icon">🎯</span>
              <span className="logo-text">Event<span>Smart</span></span>
            </Link>
            <button 
              className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className={`search-container ${isMenuOpen ? 'open' : ''}`}>
            <form onSubmit={handleSearch} className="search-form">
              <div className="input-group">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="search-input"
                />
              </div>
              <div className="input-group">
                <i className="fas fa-map-marker-alt location-icon"></i>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="location-input"
                />
              </div>
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
                <span>Search</span>
              </button>
            </form>
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/browse-events" className="nav-link">Browse Events</Link></li>
              <li><Link to="/create-event" className="nav-link">Create Event</Link></li>
              <li><Link to="/help" className="nav-link">Help</Link></li>
              <li className="divider"></li>
              <li><Link to="/sign-in" className="nav-link sign-in">Sign In</Link></li>
              <li><Link to="/sign-up" className="nav-link sign-up">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;