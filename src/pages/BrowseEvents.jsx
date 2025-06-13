import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BrowseEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tech Innovators Conference 2025",
      date: "2025-07-15",
      location: "Accra International Conference Centre",
      description: "Join industry leaders and tech enthusiasts for a day of innovation and networking.",
      image: "https://i.pinimg.com/736x/b6/55/2b/b6552be1a23bf22cd79c36747f384e71.jpg",
      eventType: "Conference",
      price: 150
    },
    {
      id: 2,
      title: "Art & Design Expo",
      date: "2025-08-10",
      location: "National Theatre of Ghana, Accra",
      description: "Explore the latest trends in art and design from renowned artists and creators.",
      image: "https://i.pinimg.com/736x/ae/dc/e5/aedce545eff4ee857d35a0c598fb88fa.jpg",
      eventType: "Trade Show/Exhibition",
      price: 50
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      date: "2025-09-05",
      location: "Kumasi Innovation Hub",
      description: "Watch startups pitch their ideas to investors and a live audience.",
      image: "https://i.pinimg.com/736x/50/2c/4c/502c4cd1a1c096085ff2aa4b1274a9a0.jpg",
      eventType: "Networking Event/Meetup",
      price: 300
    },
    {
      id: 4,
      title: "Health & Wellness Retreat",
      date: "2025-07-22",
      location: "Aqua Safari Resort, Ada",
      description: "A weekend of relaxation, mindfulness, and wellness workshops.",
      image: "https://i.pinimg.com/736x/98/1f/cb/981fcbfe57d17c65a9e4deca13c27550.jpg",
      eventType: "Retreat/Conference Camping",
      price: 800
    }
  ];

  // Format date to "Month Day, Year" format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format price to GHS currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="page container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">Upcoming Events</h1>
        <p className="lead text-muted">Discover exciting events happening near you</p>
      </div>
      
      <div className="row row-cols-1 row-cols-lg-2 g-4">
        {events.map(event => (
          <div key={event.id} className="col">
            <div className="card h-100 overflow-hidden shadow-lg event-card">
              <div className="row g-0">
                <div className="col-md-5">
                  <div className="position-relative h-100">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="img-fluid h-100 object-fit-cover"
                    />
                    <span className="badge bg-primary position-absolute top-0 end-0 m-3">
                      {event.eventType}
                    </span>
                  </div>
                </div>
                
                <div className="col-md-7">
                  <div className="card-body d-flex flex-column h-100 p-4">
                    <div className="mb-3">
                      <h3 className="card-title fw-bold mb-2">{event.title}</h3>
                      <p className="card-text text-truncate-2 mb-3">{event.description}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-calendar-event text-primary fs-5 me-2"></i>
                          <span className="fw-medium">{formatDate(event.date)}</span>
                        </div>
                        
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt text-primary fs-5 me-2"></i>
                          <span className="fw-medium">{event.location}</span>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center border-top pt-3">
                        <h4 className="text-success fw-bold mb-0">{formatPrice(event.price)}</h4>
                        <button className="btn btn-outline-primary d-flex align-items-center" onClick={() => Navigate(`/events/${event.id}`)}>
                          View Details <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseEvents;