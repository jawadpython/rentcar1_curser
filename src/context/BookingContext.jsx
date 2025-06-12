import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    city: '',
    startDate: '',
    endDate: '',
    selectedCar: null,
  });

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const saveBooking = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  };

  const getBookings = () => {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, saveBooking, getBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 