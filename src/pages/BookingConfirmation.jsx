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
      <div className="max-w-md mx-auto mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Aucune voiture sélectionnée</h1>
        <button
          onClick={() => navigate('/cars')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-base font-semibold"
        >
          Sélectionner une voiture
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Confirmation de réservation</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-base sm:text-lg">Ville :</h2>
          <p className="text-sm sm:text-base">{bookingData.city}</p>
        </div>
        <div>
          <h2 className="font-semibold text-base sm:text-lg">Période de location :</h2>
          <p className="text-sm sm:text-base">Du : {new Date(bookingData.startDate).toLocaleDateString()}</p>
          <p className="text-sm sm:text-base">Au : {new Date(bookingData.endDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h2 className="font-semibold text-base sm:text-lg">Voiture sélectionnée :</h2>
          <p className="text-sm sm:text-base">{bookingData.selectedCar.name}</p>
          <p className="text-sm sm:text-base">Prix : {bookingData.selectedCar.price} €/jour</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-base font-semibold"
          >
            Confirmer la réservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 