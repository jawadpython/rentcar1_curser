import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import SelectCity from './pages/SelectCity';
import SelectDate from './pages/SelectDate';
import AvailableCars from './pages/AvailableCars';
import UserInfo from './pages/UserInfo';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';

function Header() {
  const location = useLocation();
  let currentStep = 0;
  if (location.pathname.startsWith('/date')) currentStep = 2;
  else if (location.pathname.startsWith('/cars')) currentStep = 3;
  else if (location.pathname.startsWith('/user-info')) currentStep = 4;
  else if (location.pathname.startsWith('/confirmation')) currentStep = 5;
  else if (location.pathname.startsWith('/station')) currentStep = 1;
  else currentStep = 1;

  const steps = [
    { name: 'Ville', path: '/' },
    { name: 'Date', path: '/date' },
    { name: 'Voiture', path: '/cars' },
    { name: 'Infos', path: '/user-info' },
    { name: 'Confirmation', path: '/confirmation' }
  ];

  return (
    <header className="bg-[#23262b] text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 h-16 sm:h-20">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold tracking-tight" style={{fontFamily: 'monospace'}}>Ve Location</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {steps.map((step, idx) => (
            <div key={step.name} className="flex items-center gap-2">
              <span className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border-2 ${currentStep === idx+1 ? 'bg-teal-400 border-teal-400 text-black' : 'border-gray-500 text-gray-300 bg-[#23262b]'}`}>{idx+1}</span>
              <span className={`text-sm lg:text-base font-medium ${currentStep === idx+1 ? 'text-teal-400' : 'text-gray-300'}`}>{step.name}</span>
              {idx < 4 && <span className="w-4 lg:w-6 h-0.5 bg-gray-600 mx-1 lg:mx-2 rounded-full" />}
            </div>
          ))}
        </nav>

        {/* Mobile Navigation - Step Indicator */}
        <div className="md:hidden flex items-center gap-1">
          {steps.map((step, idx) => (
            <div key={step.name} className="flex flex-col items-center">
              <span className={`rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 ${currentStep === idx+1 ? 'bg-teal-400 border-teal-400 text-black' : 'border-gray-500 text-gray-300 bg-[#23262b]'}`}>{idx+1}</span>
              {currentStep === idx+1 && (
                <span className="text-xs text-teal-400 font-medium mt-1">{step.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function AdminNav() {
  return (
    <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-8 mt-4 sm:mt-8 justify-center px-4">
      <a href="/admin" className="px-3 sm:px-4 py-2 rounded font-semibold bg-teal-600 text-white hover:bg-teal-700 transition text-center text-sm sm:text-base">Dashboard</a>
      <a href="/admin/bookings" className="px-3 sm:px-4 py-2 rounded font-semibold bg-gray-200 text-gray-800 hover:bg-teal-100 transition text-center text-sm sm:text-base">Réservations</a>
    </nav>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">{children}</div>
    </div>
  );
}

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SelectCity />} />
          <Route path="/date" element={<SelectDate />} />
          <Route path="/cars" element={<AvailableCars />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
          <Route path="/admin/*" element={<Navigate to="/admin" />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App; 