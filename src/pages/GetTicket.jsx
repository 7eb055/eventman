import { useState } from 'react';

const GetTicket = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState('general');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  
  const event = {
    title: "Tech Innovators Conference 2025",
    date: "July 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Accra International Conference Centre",
    description: "Join industry leaders and tech enthusiasts for a day of innovation and networking. This conference will feature keynote speakers, workshops, and networking opportunities.",
    image: "https://i.pinimg.com/736x/b6/55/2b/b6552be1a23bf22cd79c36747f384e71.jpg",
    organizer: "Tech Ghana Association"
  };
  
  const ticketTypes = [
    { id: 'general', name: 'General Admission', price: 150, benefits: ['Event Access', 'Lunch Included', 'Swag Bag'] },
    { id: 'vip', name: 'VIP Experience', price: 350, benefits: ['Priority Seating', 'Backstage Access', 'Meet & Greet', 'Premium Gift'] },
    { id: 'student', name: 'Student Pass', price: 80, benefits: ['Event Access', 'Student Networking Session'] }
  ];
  
  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
  const subtotal = selectedTicket ? selectedTicket.price * ticketCount : 0;
  const serviceFee = 5;
  const total = subtotal + serviceFee;
  
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };
  
  const handlePurchase = (e) => {
    e.preventDefault();
    alert(`Thank you for your purchase! ${ticketCount} ticket(s) for ${event.title} have been reserved.`);
  };

  return (
    <div className="page bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Get Your Tickets</h1>
          <p className="lead text-muted">Secure your spot for an unforgettable experience</p>
        </div>
        
        <div className="row g-4">
          {/* Event Details */}
          <div className="col-lg-7">
            <div className="card shadow-lg rounded-4 overflow-hidden border-0">
              <div className="row g-0">
                <div className="col-md-5 position-relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="img-fluid h-100 object-fit-cover"
                  />
                  <div className="position-absolute top-0 start-0 bg-primary text-white p-2 px-3 rounded-bottom-end">
                    <span className="fw-bold">ON SALE</span>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="card-body p-4">
                    <h2 className="card-title fw-bold">{event.title}</h2>
                    <div className="d-flex flex-wrap gap-3 my-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-calendar-event text-primary fs-5 me-2"></i>
                        <span className="fw-medium">{event.date}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-clock text-primary fs-5 me-2"></i>
                        <span className="fw-medium">{event.time}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt text-primary fs-5 me-2"></i>
                        <span className="fw-medium">{event.location}</span>
                      </div>
                    </div>
                    <p className="card-text text-muted">{event.description}</p>
                    <div className="mt-3">
                      <p className="mb-0">
                        <span className="fw-medium">Organizer:</span> {event.organizer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ticket Selection */}
            <div className="card shadow-lg mt-4 rounded-4 border-0">
              <div className="card-header bg-white py-3">
                <h3 className="mb-0 fw-bold">Select Your Ticket</h3>
              </div>
              <div className="card-body p-4">
                <div className="d-flex flex-wrap gap-3 mb-4">
                  {ticketTypes.map(ticket => (
                    <div 
                      key={ticket.id}
                      className={`ticket-option card flex-grow-1 border rounded-3 p-3 cursor-pointer transition-all duration-300 ${
                        selectedTicketType === ticket.id 
                          ? 'border-primary border-2 bg-primary-light' 
                          : 'border-light'
                      }`}
                      onClick={() => setSelectedTicketType(ticket.id)}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="fw-bold mb-1">{ticket.name}</h5>
                          <h4 className="text-primary fw-bold">GHS {ticket.price}</h4>
                        </div>
                        {selectedTicketType === ticket.id && (
                          <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                        )}
                      </div>
                      <ul className="mt-2 mb-0 ps-3">
                        {ticket.benefits.map((benefit, idx) => (
                          <li key={idx} className="small">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div>
                    <label className="fw-medium me-2">Quantity:</label>
                    <div className="btn-group">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <button className="btn btn-light disabled">
                        {ticketCount}
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setTicketCount(prev => prev + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-end">
                    <h4 className="mb-0">GHS {subtotal.toFixed(2)}</h4>
                    <p className="small text-muted mb-0">Before fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary & Payment */}
          <div className="col-lg-5">
            <div className="card shadow-lg rounded-4 border-0 sticky-top" style={{top: '20px'}}>
              <div className="card-header bg-white py-3">
                <h3 className="mb-0 fw-bold">Order Summary</h3>
              </div>
              <div className="card-body p-4">
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>{ticketCount} x {selectedTicket?.name}</span>
                    <span>GHS {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Service Fee</span>
                    <span>GHS {serviceFee.toFixed(2)}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total</span>
                    <span className="text-primary">GHS {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Payment Method</h5>
                  <div className="d-flex gap-2 mb-3">
                    <button 
                      className={`btn ${paymentMethod === 'card' ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <i className="bi bi-credit-card me-2"></i> Card
                    </button>
                    <button 
                      className={`btn ${paymentMethod === 'mobile' ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <i className="bi bi-phone me-2"></i> Mobile Money
                    </button>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="bg-light p-3 rounded-3">
                      <div className="mb-3">
                        <label className="form-label fw-medium">Card Number</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="1234 5678 9012 3456" 
                          name="number"
                          value={cardDetails.number}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Name on Card</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="John Doe" 
                          name="name"
                          value={cardDetails.name}
                          onChange={handleCardChange}
                        />
                      </div>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-medium">Expiry Date</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="MM/YY" 
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-medium">CVV</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="123" 
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'mobile' && (
                    <div className="bg-light p-3 rounded-3">
                      <div className="mb-3">
                        <label className="form-label fw-medium">Mobile Network</label>
                        <select className="form-select">
                          <option>MTN Mobile Money</option>
                          <option>Vodafone Cash</option>
                          <option>AirtelTigo Money</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          placeholder="055 123 4567" 
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="form-check mb-4">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="termsCheck" 
                  />
                  <label className="form-check-label small" htmlFor="termsCheck">
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Refund Policy</a>. 
                    Tickets are non-refundable except in the case of event cancellation.
                  </label>
                </div>
                
                <button 
                  className="btn btn-primary w-100 py-3 fw-bold fs-5"
                  onClick={handlePurchase}
                >
                  Purchase Tickets - GHS {total.toFixed(2)}
                </button>
                
                <div className="text-center mt-3">
                  <p className="small text-muted mb-0">
                    <i className="bi bi-lock-fill me-1"></i> Your payment is securely encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tailwind-powered styles */}
      <style jsx>{`
        .ticket-option {
          transition: all 0.3s ease;
          min-width: 200px;
        }
        .ticket-option:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .bg-primary-light {
          background-color: rgba(13, 110, 253, 0.1);
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .transition-all {
          transition-property: all;
        }
        .duration-300 {
          transition-duration: 300ms;
        }
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default GetTicket;