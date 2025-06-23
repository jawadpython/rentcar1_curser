import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const UserInfo = () => {
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    licensePhoto: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [licensePhotoPreview, setLicensePhotoPreview] = useState(null);

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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^[+]?\d{8,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.licensePhoto) {
      newErrors.licensePhoto = 'La photo du permis est requise';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <button 
            onClick={handleBack} 
            className="text-xl hover:bg-gray-200 rounded-full p-1 transition-colors touch-manipulation" 
            aria-label="Retour"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Informations du client</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Complétez vos informations personnelles</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" htmlFor="firstName">Prénom *</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border rounded-lg px-3 py-2.5 sm:py-3 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
                placeholder="Prénom"
                autoComplete="given-name"
              />
              {errors.firstName && <div className="text-red-500 text-xs mt-1 break-words">{errors.firstName}</div>}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" htmlFor="lastName">Nom de famille *</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border rounded-lg px-3 py-2.5 sm:py-3 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
                placeholder="Nom de famille"
                autoComplete="family-name"
              />
              {errors.lastName && <div className="text-red-500 text-xs mt-1 break-words">{errors.lastName}</div>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" htmlFor="phone">Téléphone *</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border rounded-lg px-3 py-2.5 sm:py-3 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
                placeholder="Téléphone"
                autoComplete="tel"
              />
              {errors.phone && <div className="text-red-500 text-xs mt-1 break-words">{errors.phone}</div>}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" htmlFor="city">Ville *</label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="border rounded-lg px-3 py-2.5 sm:py-3 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
                placeholder="Ville"
                autoComplete="address-level2"
              />
              {errors.city && <div className="text-red-500 text-xs mt-1 break-words">{errors.city}</div>}
            </div>
          </div>

          {/* License Photo Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2" htmlFor="licensePhoto">Photo du permis de conduire *</label>
            <input
              id="licensePhoto"
              name="licensePhoto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm sm:text-base border rounded-lg py-2.5 sm:py-3 px-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:bg-teal-50 file:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
            />
            {licensePhotoPreview && (
              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <img src={licensePhotoPreview} alt="Aperçu du permis" className="w-24 sm:w-32 h-16 sm:h-20 object-cover rounded-lg shadow" />
                <button 
                  type="button" 
                  onClick={removeLicensePhoto} 
                  className="text-red-500 text-xs underline touch-manipulation"
                >
                  Retirer la photo
                </button>
              </div>
            )}
            {errors.licensePhoto && <div className="text-red-500 text-xs mt-1 break-words">{errors.licensePhoto}</div>}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-700 px-4 py-3 sm:py-4 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto text-sm sm:text-base font-semibold touch-manipulation"
            >
              Retour
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 text-white px-4 py-3 sm:py-4 rounded-lg hover:bg-teal-600 transition-colors w-full sm:w-auto text-sm sm:text-base font-semibold disabled:opacity-60 touch-manipulation"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Valider'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo; 