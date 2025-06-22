import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import AdminBookings from './AdminBookings';

const AdminPanel = () => {
  const { getBookings } = useBooking();
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [bookings, setBookings] = useState(getBookings());

  // Filtered bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.selectedCar.name.toLowerCase().includes(search.toLowerCase());
    const bookingStart = new Date(b.startDate);
    const bookingEnd = new Date(b.endDate);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    const matchesFrom = from ? bookingStart >= from : true;
    const matchesTo = to ? bookingEnd <= to : true;
    return matchesSearch && matchesFrom && matchesTo;
  });

  // Total revenue
  const totalRevenue = filtered.reduce(
    (sum, b) => sum + b.selectedCar.price * (1 + (new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24)),
    0
  );

  // Delete booking
  const handleDelete = (idx) => {
    const updated = bookings.filter((_, i) => i !== idx);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  // Clear all bookings
  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les réservations ?')) {
      setBookings([]);
      localStorage.setItem('bookings', JSON.stringify([]));
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-2 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Gestion des réservations</h1>
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto text-base font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Effacer toutes les réservations
        </button>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end mb-6">
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium mb-1">Recherche (voiture)</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
            placeholder="Rechercher une voiture..."
          />
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium mb-1">Date de début</label>
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
          />
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium mb-1">Date de fin</label>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
          />
        </div>
      </div>
      <div className="mb-4 text-lg font-semibold text-teal-700 text-center md:text-left">Recette totale : {totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
      {/* Card layout for mobile, table for md+ */}
      <div className="block md:hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucune réservation trouvée.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((b, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">{b.selectedCar.name}</span>
                  <button
                    onClick={() => handleDelete(bookings.indexOf(b))}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Supprimer
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <img src={b.selectedCar.image} alt={b.selectedCar.name} className="w-16 h-10 object-cover rounded shadow" />
                  <span className="font-medium">{b.selectedCar.name}</span>
                </div>
                <div>
                  <span className="font-medium">Date: </span>{format(new Date(b.startDate), 'dd/MM/yyyy')}
                </div>
                <div>
                  <span className="font-medium">Période: </span>{format(new Date(b.startDate), 'dd/MM/yyyy')} - {format(new Date(b.endDate), 'dd/MM/yyyy')}
                </div>
                <div>
                  <span className="font-medium">Heures: </span>{b.startTime || '--'} - {b.endTime || '--'}
                </div>
                <div>
                  <span className="font-medium">Prix/jour: </span>{b.selectedCar.price} €
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg shadow hidden md:block">
        <table className="min-w-[700px] w-full bg-white text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Voiture</th>
              <th className="py-3 px-4">Période</th>
              <th className="py-3 px-4">Heures</th>
              <th className="py-3 px-4">Prix/jour</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">Aucune réservation trouvée.</td>
              </tr>
            ) : (
              filtered.map((b, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{format(new Date(b.startDate), 'dd/MM/yyyy')}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img src={b.selectedCar.image} alt={b.selectedCar.name} className="w-16 h-10 object-cover rounded shadow" />
                    <span>{b.selectedCar.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(b.startDate), 'dd/MM/yyyy')}<br />
                    {format(new Date(b.endDate), 'dd/MM/yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    {b.startTime || '--'}<br />
                    {b.endTime || '--'}
                  </td>
                  <td className="py-3 px-4">{b.selectedCar.price} €</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(bookings.indexOf(b))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel; 