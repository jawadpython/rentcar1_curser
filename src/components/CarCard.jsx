import React from 'react';

const FeatureIcon = ({ name, className }) => {
  const iconMap = {
    Automatique: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0v5.5m0 0l-2-2m2 2l2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14" />
      </svg>
    ),
    Passagers: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-3 4a4 4 0 100 8 4 4 0 000-8zm6-1a1 1 0 11-2 0 1 1 0 012 0zM13 8a3 3 0 11-6 0 3 3 0 016 0zm-3 4a4 4 0 100 8 4 4 0 000-8zm6-3a1 1 0 100-2h-1a1 1 0 100 2h1z" />
      </svg>
    ),
    GPS: (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    'Car Play': (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    'Toit ouvrant': (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  };
  return iconMap[name] || null;
};

const CarCard = ({ car, duration, onSelect }) => {
  const totalPrice = car.price * duration;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-xl">
      {/* Card Header */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800 text-lg">{car.name}</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        {car.availability > 0 && (
            <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full mt-2 inline-block font-medium">
            {car.availability} voiture disponible
            </span>
        )}
      </div>

      {/* Car Image */}
      <img src={car.image} alt={car.name} className="w-full h-48 object-cover px-4"/>

      {/* Features */}
      <div className="p-4 mt-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
                <FeatureIcon name="Automatique" className="w-5 h-5 text-gray-500" />
                <span>Automatique</span>
            </div>
            <div className="flex items-center gap-2">
                <FeatureIcon name="Passagers" className="w-5 h-5 text-gray-500" />
                <span>{car.seats} passagers</span>
            </div>
          {car.features.slice(1).map(feature => (
            <div key={feature} className="flex items-center gap-2">
              <FeatureIcon name={feature} className="w-5 h-5 text-gray-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Price/Action Bar */}
      <div
        onClick={() => onSelect(car)}
        className="bg-black text-white p-4 flex justify-between items-center cursor-pointer mt-auto"
      >
        <div className="flex flex-col">
          <span className="font-bold text-lg" style={{color: '#65d35a'}}>{car.price} MAD/jour</span>
          <span className="text-sm text-gray-400">({totalPrice.toLocaleString('fr-FR')} MAD)</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default CarCard; 