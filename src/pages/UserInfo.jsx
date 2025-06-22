import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const UserInfo = () => {
  const navigate = useNavigate();
  const { updateBookingData, getBookingData } = useBooking();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    licensePhoto: null,
    licenseExpiry: '',
    passportNumber: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licensePhotoPreview, setLicensePhotoPreview] = useState(null);

  const bookingData = getBookingData();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          licensePhoto: 'Veuillez sélectionner une image valide'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          licensePhoto: 'L\'image doit faire moins de 5MB'
        }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLicensePhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        licensePhoto: file
      }));

      // Clear error
      if (errors.licensePhoto) {
        setErrors(prev => ({
          ...prev,
          licensePhoto: ''
        }));
      }
    }
  };

  const removeLicensePhoto = () => {
    setFormData(prev => ({
      ...prev,
      licensePhoto: null
    }));
    setLicensePhotoPreview(null);
    setErrors(prev => ({
      ...prev,
      licensePhoto: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom de famille est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^[+]?\d{8,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    }

    if (!formData.licensePhoto) {
      newErrors.licensePhoto = 'La photo du permis est requise';
    }

    if (!formData.licenseExpiry.trim()) {
      newErrors.licenseExpiry = 'La date d\'expiration du permis est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert file to base64 for storage
      let licensePhotoBase64 = null;
      if (formData.licensePhoto) {
        licensePhotoBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(formData.licensePhoto);
        });
      }

      // Update booking data with user information
      const userInfoWithPhoto = {
        ...formData,
        licensePhoto: licensePhotoBase64
      };
      
      updateBookingData({ userInfo: userInfoWithPhoto });
      
      // Get the complete booking data
      const completeBookingData = {
        ...bookingData,
        userInfo: userInfoWithPhoto,
        bookingDate: new Date().toISOString(),
        bookingId: `BK${Date.now()}`
      };
      
      // Save to localStorage for admin panel
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(completeBookingData);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/cars');
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-2 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Informations du client</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Prénom"
              autoComplete="given-name"
            />
            {errors.firstName && <div className="text-red-500 text-xs mt-1 break-words">{errors.firstName}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="lastName">Nom de famille</label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Nom de famille"
              autoComplete="family-name"
            />
            {errors.lastName && <div className="text-red-500 text-xs mt-1 break-words">{errors.lastName}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Email"
              autoComplete="email"
            />
            {errors.email && <div className="text-red-500 text-xs mt-1 break-words">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Téléphone</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Téléphone"
              autoComplete="tel"
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1 break-words">{errors.phone}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">Adresse</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Adresse"
              autoComplete="street-address"
            />
            {errors.address && <div className="text-red-500 text-xs mt-1 break-words">{errors.address}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">Ville</label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Ville"
              autoComplete="address-level2"
            />
            {errors.city && <div className="text-red-500 text-xs mt-1 break-words">{errors.city}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="postalCode">Code postal</label>
            <input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Code postal"
              autoComplete="postal-code"
            />
            {errors.postalCode && <div className="text-red-500 text-xs mt-1 break-words">{errors.postalCode}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="licenseExpiry">Expiration du permis</label>
            <input
              id="licenseExpiry"
              name="licenseExpiry"
              type="date"
              value={formData.licenseExpiry}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.licenseExpiry && <div className="text-red-500 text-xs mt-1 break-words">{errors.licenseExpiry}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="passportNumber">Numéro de passeport (optionnel)</label>
            <input
              id="passportNumber"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Numéro de passeport"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="specialRequests">Demandes spéciales (optionnel)</label>
            <input
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Demandes spéciales"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="licensePhoto">Photo du permis de conduire</label>
          <input
            id="licensePhoto"
            name="licensePhoto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-base border rounded py-2 px-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-teal-50 file:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {licensePhotoPreview && (
            <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <img src={licensePhotoPreview} alt="Aperçu du permis" className="w-32 h-20 object-cover rounded shadow" />
              <button type="button" onClick={removeLicensePhoto} className="text-red-500 text-xs underline mt-1 sm:mt-0">Retirer la photo</button>
            </div>
          )}
          {errors.licensePhoto && <div className="text-red-500 text-xs mt-1 break-words">{errors.licensePhoto}</div>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors w-full sm:w-auto text-base font-semibold"
          >
            Retour
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors w-full sm:w-auto text-base font-semibold disabled:opacity-60"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Valider'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo; 