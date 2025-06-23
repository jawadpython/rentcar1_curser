import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import CarCard from '../components/CarCard';

const AvailableCars = () => {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced car data with more details
  const cars = [
    {
      id: 1,
      name: 'Peugeot 2008 GT Line',
      price: 550,
      category: 'suv',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Automatique', 'GPS', 'Car Play', 'Toit ouvrant'],
      seats: 5,
      fuel: 'Essence',
      availability: 1
    },
    {
      id: 2,
      name: 'Mini Cooper Countryman',
      price: 450,
      category: 'suv',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      features: ['Automatique', 'Climatisation', 'Bluetooth'],
      seats: 5,
      fuel: 'Essence',
      availability: 1
    },
    {
      id: 3,
      name: 'Tesla Model 3',
      price: 800,
      category: 'electric',
      image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      features: ['Automatique', 'Autopilot', 'Superchargeur'],
      seats: 5,
      fuel: 'Électrique',
      availability: 1
    },
    {
      id: 4,
      name: 'BMW 3 Series',
      price: 700,
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      features: ['Automatique', 'Sièges cuir', 'GPS'],
      seats: 5,
      fuel: 'Essence',
      availability: 1
    },
    {
      id: 5,
      name: 'Mercedes C-Class',
      price: 750,
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Sièges chauffants', 'Caméra de recul'],
      seats: 5,
      fuel: 'Essence'
    },
    {
      id: 6,
      name: 'Nissan Leaf',
      price: 600,
      category: 'electric',
      image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Écologique', 'Charge rapide'],
      seats: 5,
      fuel: 'Électrique'
    },
    {
      id: 7,
      name: 'Ford Mustang',
      price: 900,
      category: 'sport',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Manuel', 'Moteur V8', 'Performance'],
      seats: 4,
      fuel: 'Essence'
    },
    {
      id: 8,
      name: 'Toyota RAV4',
      price: 650,
      category: 'suv',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['4x4', 'Espace de rangement', 'Haute position'],
      seats: 5,
      fuel: 'Essence'
    }
  ];

  let duration = 1;
  if (bookingData.startDate && bookingData.endDate) {
    const timeDiff = new Date(bookingData.endDate).getTime() - new Date(bookingData.startDate).getTime();
    duration = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (duration <= 0) {
      duration = 1;
    }
  }

  // Filter cars based on search and filters
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'low' && car.price <= 500) ||
      (priceFilter === 'medium' && car.price > 500 && car.price <= 750) ||
      (priceFilter === 'high' && car.price > 750);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCarSelect = (car) => {
    updateBookingData({ selectedCar: car });
    navigate('/user-info');
  };

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'sedan', name: 'Berlines' },
    { id: 'suv', name: 'SUV' },
    { id: 'luxury', name: 'Luxe' },
    { id: 'electric', name: 'Électrique' },
    { id: 'sport', name: 'Sport' }
  ];

  const priceRanges = [
    { id: 'all', name: 'Tous les prix' },
    { id: 'low', name: 'Économique (≤500 MAD)' },
    { id: 'medium', name: 'Moyen (501-750 MAD)' },
    { id: 'high', name: 'Premium (>750 MAD)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-2">Nos Véhicules Disponibles</h1>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Choisissez le véhicule qui vous convient le mieux</p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white rounded-lg shadow-md p-3 flex items-center justify-between text-sm font-medium text-gray-700"
          >
            <span>Filtres</span>
            <svg 
              className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className={`bg-white rounded-lg shadow-md p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Rechercher</label>
              <input
                type="text"
                placeholder="Nom du véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Prix</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            {filteredCars.length} véhicule{filteredCars.length !== 1 ? 's' : ''} trouvé{filteredCars.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 text-4xl sm:text-5xl lg:text-6xl mb-4">🚗</div>
            <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-2">Aucun véhicule trouvé</h3>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} duration={duration} onSelect={handleCarSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCars; 