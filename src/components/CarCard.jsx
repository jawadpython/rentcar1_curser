import React from 'react';

const CarCard = ({ car, onSelect }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img 
        src={car.image} 
        alt={car.name} 
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
      <p className="text-gray-600 mb-2">Price: ${car.price}/day</p>
      <button
        onClick={() => onSelect(car)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Select
      </button>
    </div>
  );
};

export default CarCard; 