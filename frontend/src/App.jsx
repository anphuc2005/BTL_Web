import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import ServiceTracking from './pages/ServiceTracking';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/tracking" element={<ServiceTracking />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
