import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import './css/EventCard.css';

function EventCard({ event }) {
  const eventType = event.eventType || 'Conference';
  const bannerUrl = event.image || `https://via.placeholder.com/600x300?text=${encodeURIComponent(event.title)}`;
  
  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Generate CSS class from eventType
  const getCategoryClass = () => {
    return eventType
      .split('/')[0]  // Take only the first part before "/"
      .replace(/\s+/g, '-')  // Replace spaces with hyphens
      .toLowerCase();
  };

  return (
    <div className="event-card">
      <div className="card-banner">
        <img src={bannerUrl} alt={event.title} className="banner-image" />
        <div className={`category-tag ${getCategoryClass()}`}>
          {eventType.split('/')[0]}  {/* Display only primary category */}
        </div>
      </div>
      
      <div className="card-content">
        <div className="event-meta">
          <div className="meta-item">
            <i className="fas fa-calendar-alt"></i>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{event.location}</span>
          </div>
        </div>
        
        <h3 className="event-title">{event.title}</h3>
        
        <p className="event-description">{event.description}</p>
        
        <div className="card-footer">
          <div className="price-tag">
            {formatPrice(event.price)}
          </div>
          <Link to={`/events/${event.id}`} className="view-details-btn">
            View Details
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;