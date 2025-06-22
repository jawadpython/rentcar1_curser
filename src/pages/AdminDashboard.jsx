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

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Effacer toutes les réservations
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-teal-600">{totalBookings}</div>
          <div className="text-gray-500 mt-2">Réservations</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-teal-600">{totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
          <div className="text-gray-500 mt-2">Recette totale</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-xl font-bold text-teal-600">{mostPopularCity}</div>
          <div className="text-gray-500 mt-2">Ville la plus populaire</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-xl font-bold text-teal-600">{mostPopularCar}</div>
          <div className="text-gray-500 mt-2">Voiture la plus populaire</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Réservations récentes</h2>
        <ul className="divide-y">
          {recent.length === 0 ? <li className="py-4 text-gray-500">Aucune réservation récente.</li> : recent.map((b, idx) => (
            <li key={idx} className="py-4 flex flex-col md:flex-row md:items-center md:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{b.city?.name || b.city}</span>
                  <span className="text-gray-500">{b.selectedCar?.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {b.startDate} → {b.endDate}
                </div>
                {b.userInfo && (
                  <div className="text-sm text-gray-500 mt-1">
                    {b.userInfo.firstName} {b.userInfo.lastName} • {b.userInfo.phone}
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="text-gray-500 font-semibold">{b.selectedCar?.price} €</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard; 