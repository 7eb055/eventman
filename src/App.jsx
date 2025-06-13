import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TestApi from './components/TestApi';
import ApiConnectionTest from './components/ApiConnectionTest';
import ApiTestPage from './pages/ApiTestPage';
import BrowseEvents from './pages/BrowseEvents';
import CreateEvent from './pages/CreateEvents';
import GetTicket from './pages/GetTicket';
import AttendeeDashboard from './pages/AttendeeDashboard';
import Profile from './pages/Profile';
import OrganizerDashboard from './pages/OrganizerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AboutUs from './pages/CompanyAboutUs';
import ContactUs from './pages/CompanyContactUs';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/create-event" element={< CreateEvent />} />
            <Route path="/learn-more" element={<div>Learn More Page (To be implemented)</div>} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/browse-events" element={<BrowseEvents />} />
            <Route path="/get-ticket" element={<GetTicket />} />
            <Route path="/help" element={<div>Help Page (To be implemented)</div>} />
            <Route path="/test-api" element={<TestApi />} />
            <Route path="/api-test" element={<ApiConnectionTest />} />
            <Route path="/api-diagnostics" element={<ApiTestPage />} />
            <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
            <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
            <Route path="/organizer-dashboard/events" element={<OrganizerDashboard />} />
            <Route path="/organizer-dashboard/reviews" element={<OrganizerDashboard />} />
            <Route path="/organizer-dashboard/pricing" element={<OrganizerDashboard />} />
            <Route path="/company-dashboard" element={<CompanyDashboard />} />
            <Route path="/company-dashboard/events" element={<CompanyDashboard />} />
            <Route path="/company-dashboard/analytics" element={<CompanyDashboard />} />
            <Route path="/company-dashboard/settings" element={<CompanyDashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;