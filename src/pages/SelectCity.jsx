import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

// Dummy city data
const cities = [
  {
    name: 'CORSE',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    station: false,
    airport: true,
    note: 'Réserver pour un départ à partir du 27 juin 2025',
  },
  {
    name: 'LILLE',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    station: true,
    airport: false,
  },
  {
    name: 'LYON',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=80',
    station: true,
    airport: false,
  },
  {
    name: 'NICE',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    station: true,
    airport: true,
  },
];

const SelectCity = () => {
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();

  const handleCitySelect = (city) => {
    updateBookingData({ city: city.name });
    navigate('/date');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] bg-[#f7f7f7]">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full p-8 flex flex-col gap-4">
        {/* Back and Title */}
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="text-xl hover:bg-gray-200 rounded-full p-1 transition-colors" aria-label="Retour">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <div className="font-semibold text-base">Nos villes</div>
            <div className="text-gray-400 text-sm">Sélectionner une ville</div>
          </div>
        </div>
        {/* Other Cities Section */}
        <div className="flex items-center gap-2 text-gray-700 text-base font-medium mb-2 mt-2">
          <span><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" /></svg></span>
          <span>Nous sommes présents à</span>
        </div>
        <div className="flex flex-col gap-4">
          {cities.map((city, idx) => (
            <div key={city.name} className="rounded-2xl overflow-hidden shadow-md cursor-pointer group relative" style={{height: 110}} onClick={() => handleCitySelect(city)}>
              <img src={city.image} alt={city.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute left-6 top-6 text-white">
                <div className="font-bold text-lg tracking-wide flex items-center gap-2">{city.name} <span className="text-xs">{city.station && <span title="Station">&#128646;</span>} {city.airport && <span title="Aéroport">&#9992;&#65039;</span>}</span></div>
                {city.note && <div className="text-xs mt-1">{city.note}</div>}
                {!city.note && <div className="text-xs mt-1">Prise en charge en station</div>}
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-2xl">
                <span>&#8250;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Panel: Map */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-[#eaf6fb] p-0">
        {/* Static map image with markers (for demo) */}
        <img
          src="https://i.imgur.com/8QfQ2Qp.png"
          alt="Carte de France avec villes"
          className="w-full h-full object-cover rounded-none md:rounded-l-3xl shadow-lg"
          style={{ minHeight: 500, maxHeight: 700, maxWidth: 700 }}
        />
      </div>
    </div>
  );
};

export default SelectCity; 