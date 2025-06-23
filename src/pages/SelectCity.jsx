import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cities = [
  {
    name: 'Casablanca',
    image: 'https://images.pexels.com/photos/2404046/pexels-photo-2404046.jpeg',
    station: true,
    airport: true,
    note: 'Plus grande ville du Maroc'
  },
  {
    name: 'Rabat',
    image: 'https://darrbatia.com/wp-content/webpc-passthru.php?src=https://darrbatia.com/wp-content/uploads/ekpJwbR-1024x790-1024x675.jpg&nocache=1',
    station: true,
    airport: true,
    note: 'Capitale du Maroc'
  },
  {
    name: 'Marrakech',
    image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/05/03/15/marrakech-hero.jpg?quality=75&width=1368&crop=3%3A2%2Csmart&auto=webp',
    station: true,
    airport: true,
    note: 'Ville impériale'
  },
  {
    name: 'Tanger',
    image: 'https://www.virtual-trip.fr/wp-content/uploads/2024/02/grand-socco-1536x866.jpg',
    station: true,
    airport: true,
    note: 'Port méditerranéen'
  },
  {
    name: 'Agadir',
    image: 'https://www.goworldtravel.com/wp-content/uploads/2023/07/Agadir-Morocco.jpg',
    station: true,
    airport: true,
    note: 'Station balnéaire'
  },
  {
    name: 'Settat',
    image: 'https://chantiersdumaroc.ma/wp-content/uploads/2017/11/settat-sans-bidonvilles.jpg',
    station: true,
    airport: false,
    note: 'Ville centrale'
  }
];

const SelectCity = () => {
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    navigate('/date', { state: { city } });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back and Title */}
        <div className="flex items-center gap-3 mb-2 sm:mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="text-xl hover:bg-gray-200 rounded-full p-1 transition-colors touch-manipulation" 
            aria-label="Retour"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <div className="font-semibold text-sm sm:text-base">Nos villes</div>
            <div className="text-gray-400 text-xs sm:text-sm">Sélectionner une ville</div>
          </div>
        </div>
        
        {/* Other Cities Section */}
        <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base font-medium mb-2 sm:mb-4 mt-2">
          <span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="#222" strokeWidth="2" />
            </svg>
          </span>
          <span>Nous sommes présents à</span>
        </div>
        
        <div className="flex flex-col gap-3 sm:gap-4">
          {cities.map((city, idx) => (
            <div 
              key={city.name} 
              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md cursor-pointer group relative h-[100px] sm:h-[110px] touch-manipulation"
              onClick={() => handleCitySelect(city)}
            >
              <img 
                src={city.image} 
                alt={city.name} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute left-3 sm:left-4 lg:left-6 top-3 sm:top-4 lg:top-6 text-white">
                <div className="font-bold text-sm sm:text-base lg:text-lg tracking-wide flex items-center gap-1 sm:gap-2">
                  {city.name} 
                  <span className="text-xs">
                    {city.station && <span title="Station">&#128646;</span>} 
                    {city.airport && <span title="Aéroport">&#9992;&#65039;</span>}
                  </span>
                </div>
                {city.note && <div className="text-xs mt-1">{city.note}</div>}
                {!city.note && <div className="text-xs mt-1">Prise en charge en station</div>}
              </div>
              <div className="absolute right-3 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 text-white text-lg sm:text-xl lg:text-2xl">
                <span>&#8250;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCity; 