import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cities = [
  {
    name: 'Casablanca',
    image: 'https://images.unsplash.com/photo-1504064860048-974c8788c612?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    station: true,
    airport: true,
    note: 'Plus grande ville du Maroc'
  },
  {
    name: 'Rabat',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    station: true,
    airport: true,
    note: 'Capitale du Maroc'
  },
  {
    name: 'Marrakech',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    station: true,
    airport: true,
    note: 'Ville impériale'
  },
  {
    name: 'Tanger',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    station: true,
    airport: true,
    note: 'Port méditerranéen'
  },
  {
    name: 'Agadir',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    station: true,
    airport: true,
    note: 'Station balnéaire'
  },
  {
    name: 'Settat',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    station: true,
    airport: false,
    note: 'Ville centrale'
  }
];

const SelectCity = () => {
  const navigate = useNavigate();
  const [hoveredCity, setHoveredCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    // On mobile, we'll show the full image first, then navigate on second click
    if (window.innerWidth >= 768) {
      navigate('/date', { state: { city } });
    }
  };

  const handleFullImageClick = () => {
    if (selectedCity) {
      navigate('/date', { state: { city: selectedCity } });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh] bg-[#f7f7f7]">
      {/* Left Panel */}
      <div className="md:w-1/2 w-full p-4 md:p-8 flex flex-col gap-4">
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
            <div 
              key={city.name} 
              className="rounded-2xl overflow-hidden shadow-md cursor-pointer group relative" 
              style={{height: 110}} 
              onClick={() => handleCitySelect(city)}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
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
      {/* Right Panel: Full City Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-[#eaf6fb] p-0">
        {(hoveredCity || selectedCity) ? (
          <div 
            className="w-full h-full relative cursor-pointer"
            onClick={handleFullImageClick}
          >
            <img
              src={(hoveredCity || selectedCity).image}
              alt={`${(hoveredCity || selectedCity).name} - Vue complète`}
              className="w-full h-full object-cover rounded-none md:rounded-l-3xl shadow-lg transition-opacity duration-300"
              style={{ minHeight: '50vh', maxHeight: '100vh', maxWidth: '100%' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{(hoveredCity || selectedCity).name}</h2>
              <p className="text-sm opacity-90">{(hoveredCity || selectedCity).note}</p>
              {window.innerWidth < 768 && (
                <p className="text-sm mt-2">Cliquez pour continuer</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center p-8">
            <p className="text-lg">Survolez une ville pour voir sa vue complète</p>
            {window.innerWidth < 768 && (
              <p className="text-sm mt-2">Cliquez sur une ville pour voir sa vue complète</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCity; 