import React from 'react';

const ContactUs = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <header className="text-center mb-5">
          <h1 className="fw-bold text-primary">Contact Our Event Experts</h1>
          <p className="lead text-muted">
            Have questions about our ticketing platform? Reach out to our support team 24/7
          </p>
        </header>

        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-md-5">
            <div className="bg-light p-4 rounded-3 h-100">
              <h3 className="mb-4 fw-semibold">Get In Touch</h3>
              
              <div className="d-flex mb-4">
                <div className="bg-primary rounded-circle p-3 me-3">
                  <i className="bi bi-envelope fs-4 text-white"></i>
                </div>
                <div>
                  <h5 className="fw-medium">Email</h5>
                  <a href="mailto:support@eventapp.com" className="text-decoration-none">
                    support@eventapp.com
                  </a>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="bg-primary rounded-circle p-3 me-3">
                  <i className="bi bi-telephone fs-4 text-white"></i>
                </div>
                <div>
                  <h5 className="fw-medium">Phone</h5>
                  <p className="mb-0">(555) 123-4567</p>
                  <small className="text-muted">Mon-Fri, 9am-5pm PST</small>
                </div>
              </div>

              <div className="d-flex">
                <div className="bg-primary rounded-circle p-3 me-3">
                  <i className="bi bi-geo-alt fs-4 text-white"></i>
                </div>
                <div>
                  <h5 className="fw-medium">Headquarters</h5>
                  <address className="mb-0">
                    123 Event Street<br />
                    San Francisco, CA 94105<br />
                    United States
                  </address>
                </div>
              </div>

              <div className="mt-4 pt-3">
                <h5 className="fw-medium mb-3">Follow Us</h5>
                <div className="d-flex gap-3">
                  <a href="#" className="text-primary fs-4">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="text-primary fs-4">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" className="text-primary fs-4">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="#" className="text-primary fs-4">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="mb-4 fw-semibold">Send us a message</h3>
                
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg"
                        id="name" 
                        placeholder="Enter your name"
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control form-control-lg"
                        id="email" 
                        placeholder="your@email.com"
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <select className="form-select form-select-lg" id="subject" required>
                        <option value="">Select an option</option>
                        <option>Technical Support</option>
                        <option>Event Registration Help</option>
                        <option>Billing Inquiry</option>
                        <option>Business Partnership</option>
                        <option>Feedback/Suggestions</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea 
                        className="form-control form-control-lg" 
                        id="message" 
                        rows={5}
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="newsletter" 
                        />
                        <label className="form-check-label small" htmlFor="newsletter">
                          Subscribe to our newsletter for event updates and promotions
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100 py-2 fw-semibold"
                      >
                        <i className="bi bi-send me-2"></i> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-5 rounded-3 overflow-hidden shadow-sm">
          <div className="ratio ratio-16x9 bg-light">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.538259162351!2d-122.39943592416967!3d37.78677621202925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d10af6e51%3A0x1122879c36e6d3aa!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sus!4v1689381887237!5m2!1sen!2sus"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-100 h-100"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;