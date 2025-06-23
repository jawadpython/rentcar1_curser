import React from 'react';
import { useBooking } from '../context/BookingContext';

const AdminDashboard = () => {
  const { getBookings } = useBooking();
  const bookings = getBookings();

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.selectedCar.price * (1 + (new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24)),
    0
  );
  const totalBookings = bookings.length;
  const cityCount = {};
  const carCount = {};
  bookings.forEach(b => {
    cityCount[b.city] = (cityCount[b.city] || 0) + 1;
    carCount[b.selectedCar.name] = (carCount[b.selectedCar.name] || 0) + 1;
  });
  const mostPopularCity = Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';
  const mostPopularCar = Object.entries(carCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '--';
  const recent = bookings.slice(-5).reverse();

  // Clear all bookings
  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les réservations ?')) {
      localStorage.setItem('bookings', JSON.stringify([]));
      window.location.reload();
    }
  };

  // Clean duplicate bookings (remove this function after testing)
  const handleCleanDuplicates = () => {
    if (window.confirm('Nettoyer les réservations en double ?')) {
      const bookings = getBookings();
      const uniqueBookings = bookings.filter((booking, index, self) => 
        index === self.findIndex(b => b.bookingId === booking.bookingId)
      );
      localStorage.setItem('bookings', JSON.stringify(uniqueBookings));
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-center sm:text-left">Tableau de bord</h1>
            <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left mt-1">Vue d'ensemble des réservations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleCleanDuplicates}
              className="bg-yellow-600 text-white px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto text-sm sm:text-base font-semibold touch-manipulation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Nettoyer les doublons</span>
              <span className="sm:hidden">Nettoyer</span>
            </button>
            <button
              onClick={handleClearAll}
              className="bg-red-600 text-white px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto text-sm sm:text-base font-semibold touch-manipulation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Effacer toutes les réservations</span>
              <span className="sm:hidden">Effacer tout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-teal-600">{totalBookings}</div>
            <div className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">Réservations</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-teal-600">
              {totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
            </div>
            <div className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">Recette totale</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-teal-600 truncate">{mostPopularCity}</div>
            <div className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">Ville populaire</div>
          </div>
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6 text-center">
            <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-teal-600 truncate">{mostPopularCar}</div>
            <div className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">Voiture populaire</div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 lg:p-6">
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">Réservations récentes</h2>
          <div className="divide-y divide-gray-100">
            {recent.length === 0 ? (
              <div className="py-6 sm:py-8 text-center">
                <div className="text-gray-400 text-3xl sm:text-4xl mb-2">📋</div>
                <p className="text-gray-500 text-sm sm:text-base">Aucune réservation récente.</p>
              </div>
            ) : (
              recent.map((b, idx) => (
                <div key={idx} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <span className="font-semibold text-sm sm:text-base truncate">{b.city?.name || b.city}</span>
                      <span className="text-gray-500 text-xs sm:text-sm truncate">{b.selectedCar?.name}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {new Date(b.startDate).toLocaleDateString('fr-FR')} → {new Date(b.endDate).toLocaleDateString('fr-FR')}
                    </div>
                    {b.userInfo && (
                      <div className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                        {b.userInfo.firstName} {b.userInfo.lastName} • {b.userInfo.phone}
                      </div>
                    )}
                  </div>
                  <div className="text-right mt-2 sm:mt-0 flex-shrink-0">
                    <span className="text-gray-700 font-semibold text-sm sm:text-base">{b.selectedCar?.price} MAD</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 