import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';

const AdminBookings = () => {
  const { getBookings } = useBooking();
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [bookings, setBookings] = useState(getBookings());
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filtered bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      (b.city?.name || b.city || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.selectedCar?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.userInfo?.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.userInfo?.lastName || '').toLowerCase().includes(search.toLowerCase());
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
    (sum, b) => sum + (b.selectedCar?.price || 0) * (1 + (new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24)),
    0
  );

  // Delete booking
  const handleDelete = (idx) => {
    const updated = bookings.filter((_, i) => i !== idx);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  // Show booking details
  const handleShowDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-2 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Gestion des réservations</h1>
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end mb-6">
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-medium mb-1">Recherche (ville, voiture, client)</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
            placeholder="Rechercher..."
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
      <div className="mb-4 text-lg font-semibold text-teal-700 text-center md:text-left">Recette totale : {totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}</div>
      {/* Card layout for mobile, table for md+ */}
      <div className="block md:hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucune réservation trouvée.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((b, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">{b.city?.name || b.city}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShowDetails(b)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      aria-label={`Détails de la réservation de ${b.city?.name || b.city}`}
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => handleDelete(bookings.indexOf(b))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      aria-label={`Supprimer la réservation de ${b.city?.name || b.city}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={b.selectedCar?.image} alt={b.selectedCar?.name} className="w-16 h-10 object-cover rounded shadow" />
                  <span className="font-medium">{b.selectedCar?.name}</span>
                </div>
                <div>
                  <span className="font-medium">Client: </span>
                  {b.userInfo ? (
                    <span>{b.userInfo.firstName} {b.userInfo.lastName} <span className="text-gray-500">({b.userInfo.email})</span></span>
                  ) : (
                    <span className="text-gray-400">Non renseigné</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Contact: </span>
                  {b.userInfo?.phone || <span className="text-gray-400">Non renseigné</span>}
                </div>
                <div>
                  <span className="font-medium">Période: </span>
                  {format(new Date(b.startDate), 'dd/MM/yyyy')} - {format(new Date(b.endDate), 'dd/MM/yyyy')}
                </div>
                <div>
                  <span className="font-medium">Prix/jour: </span>{b.selectedCar?.price} MAD
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
              <th className="py-3 px-4">Ville</th>
              <th className="py-3 px-4">Voiture</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Période</th>
              <th className="py-3 px-4">Prix/jour</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">Aucune réservation trouvée.</td>
              </tr>
            ) : (
              filtered.map((b, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{b.city?.name || b.city}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img src={b.selectedCar?.image} alt={b.selectedCar?.name} className="w-16 h-10 object-cover rounded shadow" />
                    <span>{b.selectedCar?.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    {b.userInfo ? (
                      <div>
                        <div className="font-medium">{b.userInfo.firstName} {b.userInfo.lastName}</div>
                        <div className="text-sm text-gray-500">{b.userInfo.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Non renseigné</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {b.userInfo?.phone || <span className="text-gray-400">Non renseigné</span>}
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(b.startDate), 'dd/MM/yyyy')}<br />
                    {format(new Date(b.endDate), 'dd/MM/yyyy')}
                  </td>
                  <td className="py-3 px-4">{b.selectedCar?.price} MAD</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShowDetails(b)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
                        aria-label={`Détails de la réservation de ${b.city?.name || b.city}`}
                      >
                        Détails
                      </button>
                      <button
                        onClick={() => handleDelete(bookings.indexOf(b))}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                        aria-label={`Supprimer la réservation de ${b.city?.name || b.city}`}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for booking details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Détails de la réservation</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                  aria-label="Fermer le détail de la réservation"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Booking Information */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Informations de réservation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID de réservation</label>
                      <p className="text-gray-900">{selectedBooking.bookingId || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date de réservation</label>
                      <p className="text-gray-900">
                        {selectedBooking.bookingDate ? format(new Date(selectedBooking.bookingDate), 'dd/MM/yyyy HH:mm') : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ville</label>
                      <p className="text-gray-900">{selectedBooking.city?.name || selectedBooking.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Période</label>
                      <p className="text-gray-900">
                        {format(new Date(selectedBooking.startDate), 'dd/MM/yyyy')} - {format(new Date(selectedBooking.endDate), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Véhicule</h3>
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedBooking.selectedCar?.image} 
                      alt={selectedBooking.selectedCar?.name}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedBooking.selectedCar?.name}</h4>
                      <p className="text-gray-600">{selectedBooking.selectedCar?.price} MAD par jour</p>
                      {selectedBooking.selectedCar?.category && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                          {selectedBooking.selectedCar.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Information */}
                {selectedBooking.userInfo && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations client</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                        <p className="text-gray-900">{selectedBooking.userInfo.firstName} {selectedBooking.userInfo.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedBooking.userInfo.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                        <p className="text-gray-900">{selectedBooking.userInfo.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Adresse</label>
                        <p className="text-gray-900">
                          {selectedBooking.userInfo.address}<br />
                          {selectedBooking.userInfo.postalCode} {selectedBooking.userInfo.city}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiration du permis</label>
                        <p className="text-gray-900">
                          {selectedBooking.userInfo.licenseExpiry ? format(new Date(selectedBooking.userInfo.licenseExpiry), 'dd/MM/yyyy') : 'N/A'}
                        </p>
                      </div>
                      {selectedBooking.userInfo.passportNumber && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Numéro de passeport</label>
                          <p className="text-gray-900">{selectedBooking.userInfo.passportNumber}</p>
                        </div>
                      )}
                      {selectedBooking.userInfo.licensePhoto && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Photo du permis de conduire</label>
                          <img 
                            src={selectedBooking.userInfo.licensePhoto} 
                            alt="Permis de conduire"
                            className="w-full max-w-md h-auto rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                      {selectedBooking.userInfo.specialRequests && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Demandes spéciales</label>
                          <p className="text-gray-900">{selectedBooking.userInfo.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Total Price */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Prix total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings; 