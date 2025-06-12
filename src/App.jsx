import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import SelectCity from './pages/SelectCity';
import SelectDate from './pages/SelectDate';
import AvailableCars from './pages/AvailableCars';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';

function Header() {
  const location = useLocation();
  let currentStep = 0;
  if (location.pathname.startsWith('/date')) currentStep = 2;
  else if (location.pathname.startsWith('/cars') || location.pathname.startsWith('/confirmation')) currentStep = 3;
  else if (location.pathname.startsWith('/station')) currentStep = 1;
  else currentStep = 1;

  return (
    <header className="bg-[#23262b] text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight" style={{fontFamily: 'monospace'}}>T🟢sla</span>
        </div>
        <nav className="flex items-center gap-8">
          {['Ville', 'Date', 'cars'].map((step, idx) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border-2 ${currentStep === idx+1 ? 'bg-teal-400 border-teal-400 text-black' : 'border-gray-500 text-gray-300 bg-[#23262b]'}`}>{idx+1}</span>
              <span className={`text-base font-medium ${currentStep === idx+1 ? 'text-teal-400' : 'text-gray-300'}`}>{step}</span>
              {idx < 2 && <span className="w-6 h-0.5 bg-gray-600 mx-2 rounded-full" />}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

function AdminNav() {
  return (
    <nav className="flex gap-4 mb-8 mt-8 justify-center">
      <a href="/admin" className="px-4 py-2 rounded font-semibold bg-teal-600 text-white hover:bg-teal-700 transition">Dashboard</a>
      <a href="/admin/bookings" className="px-4 py-2 rounded font-semibold bg-gray-200 text-gray-800 hover:bg-teal-100 transition">Réservations</a>
    </nav>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="max-w-6xl mx-auto">{children}</div>
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