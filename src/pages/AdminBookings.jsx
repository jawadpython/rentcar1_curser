import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const AdminBookings = () => {
  const { getBookings } = useBooking();
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [bookings, setBookings] = useState(getBookings());

  // Filtered bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.city.toLowerCase().includes(search.toLowerCase()) ||
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

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des réservations</h1>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Recherche (ville ou voiture)</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Rechercher..."
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Date de début</label>
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Date de fin</label>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>
      <div className="mb-4 text-lg font-semibold text-teal-700">Recette totale : {totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-4">Ville</th>
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
                  <td className="py-3 px-4 font-semibold">{b.city}</td>
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

export default AdminBookings; 