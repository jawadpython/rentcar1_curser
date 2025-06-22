import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import CarCard from '../components/CarCard';

const AvailableCars = () => {
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Enhanced car data with more details
  const cars = [
    {
      id: 1,
      name: 'Toyota Camry',
      price: 50,
      category: 'sedan',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Climatisation', 'GPS'],
      seats: 5,
      fuel: 'Essence'
    },
    {
      id: 2,
      name: 'Honda Civic',
      price: 45,
      category: 'sedan',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Manuel', 'Climatisation', 'Bluetooth'],
      seats: 5,
      fuel: 'Essence'
    },
    {
      id: 3,
      name: 'Tesla Model 3',
      price: 80,
      category: 'electric',
      image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Autopilot', 'Superchargeur'],
      seats: 5,
      fuel: 'Électrique'
    },
    {
      id: 4,
      name: 'BMW 3 Series',
      price: 70,
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Sièges cuir', 'Système audio premium'],
      seats: 5,
      fuel: 'Essence'
    },
    {
      id: 5,
      name: 'Mercedes C-Class',
      price: 75,
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Sièges chauffants', 'Caméra de recul'],
      seats: 5,
      fuel: 'Essence'
    },
    {
      id: 6,
      name: 'Nissan Leaf',
      price: 60,
      category: 'electric',
      image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Automatique', 'Écologique', 'Charge rapide'],
      seats: 5,
      fuel: 'Électrique'
    },
    {
      id: 7,
      name: 'Ford Mustang',
      price: 90,
      category: 'sport',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['Manuel', 'Moteur V8', 'Performance'],
      seats: 4,
      fuel: 'Essence'
    },
    {
      id: 8,
      name: 'Toyota RAV4',
      price: 65,
      category: 'suv',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: ['4x4', 'Espace de rangement', 'Haute position'],
      seats: 5,
      fuel: 'Essence'
    }
  ];

  // Filter cars based on search and filters
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'low' && car.price <= 50) ||
      (priceFilter === 'medium' && car.price > 50 && car.price <= 75) ||
      (priceFilter === 'high' && car.price > 75);
    
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
    { id: 'low', name: 'Économique (≤50€)' },
    { id: 'medium', name: 'Moyen (51-75€)' },
    { id: 'high', name: 'Premium (>75€)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">Nos Véhicules Disponibles</h1>
          <p className="text-gray-600 text-sm sm:text-base">Choisissez le véhicule qui vous convient le mieux</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
              <input
                type="text"
                placeholder="Nom du véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {filteredCars.length} véhicule{filteredCars.length !== 1 ? 's' : ''} trouvé{filteredCars.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-400 text-5xl sm:text-6xl mb-4">🚗</div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Aucun véhicule trouvé</h3>
            <p className="text-gray-600 text-sm sm:text-base">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onSelect={handleCarSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCars; 