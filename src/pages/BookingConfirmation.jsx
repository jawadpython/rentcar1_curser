import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingData, saveBooking } = useBooking();

  const handleSubmit = () => {
    saveBooking();
    alert('Booking confirmed!');
    navigate('/');
  };

  if (!bookingData.selectedCar) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">No Car Selected</h1>
        <button
          onClick={() => navigate('/cars')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Select a Car
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Booking Confirmation</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">City:</h2>
          <p>{bookingData.city}</p>
        </div>

        <div>
          <h2 className="font-semibold">Rental Period:</h2>
          <p>From: {new Date(bookingData.startDate).toLocaleDateString()}</p>
          <p>To: {new Date(bookingData.endDate).toLocaleDateString()}</p>
        </div>

        <div>
          <h2 className="font-semibold">Selected Car:</h2>
          <p>{bookingData.selectedCar.name}</p>
          <p>Price: ${bookingData.selectedCar.price}/day</p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 