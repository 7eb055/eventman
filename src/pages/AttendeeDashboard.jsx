import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const AttendeeDashboard = () => {
  // User data
  const user = {
    name: "Kwame Mensah",
    email: "kwame.mensah@example.com",
    joinDate: "January 2023",
    ticketsPurchased: 12,
    eventsAttended: 8
  };

  // Upcoming events
  const [upcomingEvents] = useState([
    { 
      id: 1, 
      name: "Tech Innovators Conference", 
      date: "2025-07-15",
      time: "9:00 AM - 5:00 PM",
      location: "Accra International Conference Centre",
      ticketType: "VIP Pass",
      status: "Confirmed",
      image: "https://i.pinimg.com/736x/b6/55/2b/b6552be1a23bf22cd79c36747f384e71.jpg"
    },
    { 
      id: 2, 
      name: "Art & Design Expo", 
      date: "2025-08-10",
      time: "10:00 AM - 6:00 PM",
      location: "National Theatre of Ghana",
      ticketType: "General Admission",
      status: "Confirmed",
      image: "https://i.pinimg.com/736x/ae/dc/e5/aedce545eff4ee857d35a0c598fb88fa.jpg"
    }
  ]);

  // Past events
  const [pastEvents] = useState([
    { 
      id: 3, 
      name: "Startup Pitch Night", 
      date: "2024-11-05",
      location: "Kumasi Innovation Hub",
      rating: 4,
      review: "Amazing event with great networking opportunities."
    },
    { 
      id: 4, 
      name: "Health & Wellness Retreat", 
      date: "2024-09-22",
      location: "Aqua Safari Resort",
      rating: 5,
      review: "Perfect weekend getaway! Highly recommend."
    }
  ]);

  // Recommended events
  const [recommendedEvents] = useState([
    { 
      id: 5, 
      name: "Ghana Food Festival", 
      date: "2025-09-18",
      location: "Independence Square, Accra",
      price: 50
    },
    { 
      id: 6, 
      name: "Afrobeat Dance Workshop", 
      date: "2025-08-30",
      location: "National Dance Studio",
      price: 30
    }
  ]);

  // Format date to "Month Day, Year" format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page bg-light">
      <div className="container py-5">
        {/* Dashboard Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-bold text-primary mb-1">Dashboard</h1>
            <p className="text-muted">Welcome back, {user.name}</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                <button className="btn btn-primary rounded-circle p-0" style={{ width: '45px', height: '45px' }} onClick={() => Navigate('/profile')}>
                <span className="text-white fw-bold fs-5">{user.name.charAt(0)}</span>
                </button>
              </div>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-2 border-white rounded-circle">
                <span className="visually-hidden">Online</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="bi bi-ticket-perforated fs-3 text-primary"></i>
                  </div>
                  <div>
                    <h5 className="text-muted mb-1">Tickets Purchased</h5>
                    <h2 className="mb-0 fw-bold">{user.ticketsPurchased}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="bi bi-calendar-check fs-3 text-success"></i>
                  </div>
                  <div>
                    <h5 className="text-muted mb-1">Events Attended</h5>
                    <h2 className="mb-0 fw-bold">{user.eventsAttended}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="bi bi-calendar-event fs-3 text-warning"></i>
                  </div>
                  <div>
                    <h5 className="text-muted mb-1">Upcoming Events</h5>
                    <h2 className="mb-0 fw-bold">{upcomingEvents.length}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-header bg-white border-0 py-3">
            <h2 className="mb-0 fw-bold d-flex align-items-center">
              <i className="bi bi-calendar2-check me-2 text-primary"></i> 
              Upcoming Events
            </h2>
          </div>
          <div className="card-body p-4">
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="col">
                  <div className="card border-0 shadow-sm rounded-4 h-100 event-card">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img 
                          src={event.image} 
                          alt={event.name} 
                          className="img-fluid h-100 rounded-start-4 object-fit-cover"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body d-flex flex-column h-100 p-4">
                          <div className="mb-3">
                            <span className="badge bg-primary mb-2">{event.status}</span>
                            <h5 className="card-title fw-bold">{event.name}</h5>
                            <div className="d-flex flex-wrap gap-3 small">
                              <div className="d-flex align-items-center">
                                <i className="bi bi-calendar-event text-primary me-2"></i>
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <i className="bi bi-clock text-primary me-2"></i>
                                <span>{event.time}</span>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-2">
                              <i className="bi bi-geo-alt text-primary me-2"></i>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-ticket-perforated me-2"></i>
                              {event.ticketType}
                            </span>
                            <button className="btn btn-sm btn-outline-primary d-flex align-items-center">
                              View Details <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <div className="card border-0 shadow-sm rounded-4 mb-5">
          <div className="card-header bg-white border-0 py-3">
            <h2 className="mb-0 fw-bold d-flex align-items-center">
              <i className="bi bi-clock-history me-2 text-secondary"></i> 
              Past Events
            </h2>
          </div>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-borderless table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">Event</th>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {pastEvents.map(event => (
                    <tr key={event.id} className="border-bottom">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle p-2 me-3">
                            <i className="bi bi-calendar-event text-primary"></i>
                          </div>
                          <span className="fw-medium">{event.name}</span>
                        </div>
                      </td>
                      <td>{formatDate(event.date)}</td>
                      <td>{event.location}</td>
                      <td>
                        <div className="d-flex text-warning">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`bi ${i < event.rating ? 'bi-star-fill' : 'bi-star'} me-1`}
                            ></i>
                          ))}
                        </div>
                      </td>
                      <td className="text-truncate" style={{maxWidth: '200px'}}>{event.review}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recommended Events */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-header bg-white border-0 py-3">
            <h2 className="mb-0 fw-bold d-flex align-items-center">
              <i className="bi bi-lightning me-2 text-warning"></i> 
              Recommended For You
            </h2>
          </div>
          <div className="card-body p-4">
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {recommendedEvents.map(event => (
                <div key={event.id} className="col">
                  <div className="card border-0 shadow-sm rounded-4 h-100 event-card">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="card-title fw-bold">{event.name}</h5>
                          <div className="d-flex align-items-center text-muted small">
                            <i className="bi bi-calendar-event me-2"></i>
                            <span>{formatDate(event.date)}</span>
                          </div>
                        </div>
                        <span className="badge bg-warning text-dark">New</span>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-geo-alt me-2 text-muted"></i>
                        <span className="text-muted small">{event.location}</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <h4 className="mb-0 text-success fw-bold">GHS {event.price}</h4>
                        <button className="btn btn-sm btn-primary">
                          Get Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind-powered styles */}
      <style jsx>{`
        .event-card {
          transition: all 0.3s ease;
        }
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
        }
        .object-fit-cover {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .card-header {
          border-radius: 1rem !important;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(13, 110, 253, 0.05);
        }
      `}</style>
    </div>
  );
};

export default AttendeeDashboard;