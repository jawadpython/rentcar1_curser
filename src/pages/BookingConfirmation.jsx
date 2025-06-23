import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();

  const handleSubmit = () => {
    // Create complete booking data with ID and timestamp
    const completeBookingData = {
      ...bookingData,
      bookingDate: new Date().toISOString(),
      bookingId: `BK${Date.now()}`
    };
    
    // Save to localStorage for admin panel
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(completeBookingData);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    alert('Booking confirmed!');
    navigate('/');
  };

  if (!bookingData.selectedCar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
          <div className="text-center">
            <div className="text-gray-400 text-4xl sm:text-5xl mb-4">🚗</div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Aucune voiture sélectionnée</h1>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Veuillez sélectionner un véhicule pour continuer</p>
            <button
              onClick={() => navigate('/cars')}
              className="w-full bg-blue-500 text-white py-3 sm:py-4 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base font-semibold touch-manipulation"
            >
              Sélectionner une voiture
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total days and price
  const startDate = new Date(bookingData.startDate);
  const endDate = new Date(bookingData.endDate);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const totalPrice = totalDays * bookingData.selectedCar.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-green-500 text-4xl sm:text-5xl mb-3 sm:mb-4">✅</div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Confirmation de réservation</h1>
          <p className="text-gray-600 text-sm sm:text-base">Vérifiez les détails de votre réservation</p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* City */}
          <div className="border-b border-gray-100 pb-3 sm:pb-4">
            <h2 className="font-semibold text-sm sm:text-base text-gray-700 mb-1">Ville de prise en charge</h2>
            <p className="text-sm sm:text-base font-medium">{bookingData.city?.name || 'Non spécifiée'}</p>
          </div>

          {/* Dates */}
          <div className="border-b border-gray-100 pb-3 sm:pb-4">
            <h2 className="font-semibold text-sm sm:text-base text-gray-700 mb-2">Période de location</h2>
            <div className="space-y-1">
              <p className="text-sm sm:text-base">
                <span className="text-gray-600">Du :</span> {startDate.toLocaleDateString('fr-FR')} à {bookingData.startTime}
              </p>
              <p className="text-sm sm:text-base">
                <span className="text-gray-600">Au :</span> {endDate.toLocaleDateString('fr-FR')} à {bookingData.endTime}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Durée : {totalDays} jour{totalDays > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Car Details */}
          <div className="border-b border-gray-100 pb-3 sm:pb-4">
            <h2 className="font-semibold text-sm sm:text-base text-gray-700 mb-2">Véhicule sélectionné</h2>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <img 
                  src={bookingData.selectedCar.image} 
                  alt={bookingData.selectedCar.name}
                  className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">{bookingData.selectedCar.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{bookingData.selectedCar.category}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{bookingData.selectedCar.seats} places</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm sm:text-base text-blue-600">{bookingData.selectedCar.price} MAD</p>
                  <p className="text-xs text-gray-500">/jour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-b border-gray-100 pb-3 sm:pb-4">
            <h2 className="font-semibold text-sm sm:text-base text-gray-700 mb-2">Récapitulatif des prix</h2>
            <div className="space-y-1">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Prix par jour</span>
                <span>{bookingData.selectedCar.price} MAD</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Nombre de jours</span>
                <span>{totalDays}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">{totalPrice} MAD</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          {bookingData.userInfo && (
            <div className="border-b border-gray-100 pb-3 sm:pb-4">
              <h2 className="font-semibold text-sm sm:text-base text-gray-700 mb-2">Informations client</h2>
              <div className="space-y-1">
                <p className="text-sm sm:text-base">
                  <span className="text-gray-600">Nom :</span> {bookingData.userInfo.firstName} {bookingData.userInfo.lastName}
                </p>
                <p className="text-sm sm:text-base">
                  <span className="text-gray-600">Téléphone :</span> {bookingData.userInfo.phone}
                </p>
                <p className="text-sm sm:text-base">
                  <span className="text-gray-600">Ville :</span> {bookingData.userInfo.city}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4 pt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-3 sm:py-4 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base font-semibold touch-manipulation"
            >
              Confirmer la réservation
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base font-medium touch-manipulation"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 