import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import CarCard from '../components/CarCard';

const AvailableCars = () => {
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();

  // Dummy car data
  const cars = [
    {
      id: 1,
      name: 'Toyota Camry',
      price: 50,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 2,
      name: 'Honda Civic',
      price: 45,
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      name: 'Tesla Model 3',
      price: 80,
      image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 4,
      name: 'BMW 3 Series',
      price: 70,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  const handleCarSelect = (car) => {
    updateBookingData({ selectedCar: car });
    navigate('/confirmation');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onSelect={handleCarSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default AvailableCars; 