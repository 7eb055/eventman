import './css/CtaSection.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';



const CtaSection = ({
  title = 'Are You an Event Organizer?',
  description = 'Create and manage your events with our powerful platform. Get access to attendee management, ticketing, and analytics tools.',
  actions = [
    { label: 'Create an Event', to: '/create-event', variant: 'primary' },
    { label: 'Learn More', to: '/learn-more', variant: 'secondary' },
  ],
  className = ''
}) => {
  return (
    <section className={`cta-section ${className}`.trim()}>
      <div className="cta-content">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-description">{description}</p>
        <div className="cta-buttons">
          {actions.map((action, index) => {
            const btnClass = `cta-button ${action.variant || 'primary'}`;
            return action.to ? (
              <Link key={index} to={action.to} className="cta-link-wrapper">
                <button className={btnClass}>{action.label}</button>
              </Link>
            ) : (
              <button key={index} className={btnClass} onClick={action.onClick}>
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="cta-decor cta-decor-1" />
      <div className="cta-decor cta-decor-2" />
    </section>
  );
};

export default CtaSection;
