import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import formatDate from '../utils/formatDate';

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ticketType: 'Standard Ticket - $299',
    numTickets: 1,
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/events/${id}`);
        if (!response.ok) throw new Error('Event not found');
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTicketChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      numTickets: Math.max(1, prev.numTickets + delta)
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          ticketType: formData.ticketType,
          numTickets: formData.numTickets,
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          amount: 299 * formData.numTickets + 9.99
        })
      });
      if (!response.ok) throw new Error('Registration failed');
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        ticketType: 'Standard Ticket - $299',
        numTickets: 1,
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!event) return <div className="text-center mt-10">Loading...</div>;

  const daysLeft = Math.ceil((new Date(event.start_date) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 text-white p-4 mb-4 rounded-t-lg">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-sm">{formatDate(event.start_date)} | {event.venue}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">About the Event</h2>
            <p>{event.description}</p>
            <p className="mt-2">Organized by: TechEvents Inc.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Event Schedule</h2>
            <p>Day 1: {formatDate(event.start_date)}</p>
            <p>9:00 AM Registration & Welcome Coffee</p>
            <p>10:00 AM Opening Keynote: The Future of Tech</p>
            <p>12:00 PM Networking Lunch</p>
            <p>Day 2-3: {formatDate(new Date(event.start_date).setDate(new Date(event.start_date).getDate() + 1))} - {formatDate(new Date(event.start_date).setDate(new Date(event.start_date).getDate() + 2))}</p>
            <p>Workshops, panel discussions, and more keynotes. Detailed schedule to be announced.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
            <p><strong>What’s included in the ticket price?</strong> Your ticket includes access to all keynote, workshops, networking events, and meals during the conference. Accommodation is not included.</p>
            <p><strong>Is there a dress code?</strong> Business casual is recommended.</p>
            <p><strong>Can I get a refund if I can’t attend?</strong> Yes, refunds are available up to 14 days before the event.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Venue</h2>
            <div className="bg-gray-200 h-32 flex items-center justify-center mb-2">
              <p className="text-gray-500">Interactive Map of Tech Convention Center</p>
            </div>
            <p><strong>Tech Convention Center</strong></p>
            <p>123 Innovation Street, San Francisco, CA 94103</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Register Now</h2>
          <p className="text-gray-500 mb-2">{daysLeft} days left</p>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>Standard Ticket - $299</option>
            </select>
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleTicketChange(-1)} disabled={formData.numTickets <= 1}>-</Button>
              <span>{formData.numTickets}</span>
              <Button onClick={() => handleTicketChange(1)}>+</Button>
            </div>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
            <p>Subtotal: ${299 * formData.numTickets}.00</p>
            <p>Processing Fee: $9.99</p>
            <p>Total: ${(299 * formData.numTickets + 9.99).toFixed(2)}</p>
            <Button type="submit" disabled={success}>Register Now</Button>
            {success && <p className="text-green-500">Registration successful!</p>}
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-sm text-gray-500">By registering, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
          </form>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold mb-2">Share This Event</h3>
        <div className="flex justify-center space-x-4">
          <span>facebook</span> <span>twitter</span> <span>linkedin</span> <span>email</span>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
