import React from 'react';

const CarCard = ({ car, onSelect }) => {
  const getCategoryColor = (category) => {
    const colors = {
      sedan: 'bg-blue-100 text-blue-800',
      suv: 'bg-green-100 text-green-800',
      luxury: 'bg-purple-100 text-purple-800',
      electric: 'bg-teal-100 text-teal-800',
      sport: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryName = (category) => {
    const names = {
      sedan: 'Berline',
      suv: 'SUV',
      luxury: 'Luxe',
      electric: 'Électrique',
      sport: 'Sport'
    };
    return names[category] || category;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(car.category)}`}>
            {getCategoryName(car.category)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs font-medium">
            {car.seats} places
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {car.name}
          </h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{car.price}€</p>
            <p className="text-sm text-gray-500">par jour</p>
          </div>
        </div>

        {/* Car Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            {car.fuel}
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {car.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {feature}
              </span>
            ))}
            {car.features.length > 2 && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                +{car.features.length - 2} autres
              </span>
            )}
          </div>
        </div>

        {/* Select Button */}
        <button
          onClick={() => onSelect(car)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
        >
          Sélectionner ce véhicule
        </button>
      </div>
    </div>
  );
};

export default CarCard; 