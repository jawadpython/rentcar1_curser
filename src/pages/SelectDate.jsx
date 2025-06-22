import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';

const defaultHour = 12;

const formatDate = (date) => date ? format(date, 'eeee d MMM yyyy', { locale: fr }) : '';
const formatHour = (hour) => `${hour.toString().padStart(2, '0')}:00`;

const HourSlider = ({ value, onChange, disabled }) => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pill width
  const pillWidth = 80;
  const min = 0;
  const max = 23;
  const percent = (value - min) / (max - min);
  // The pill is centered on the thumb
  const pillLeft = percent * (trackWidth - pillWidth) + pillWidth / 2;

  return (
    <div className="relative w-full" style={{ height: 40 }}>
      {/* Teal line (track) */}
      <div ref={trackRef} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-teal-300 z-0" style={{ borderRadius: 2 }} />
      {/* Custom pill thumb */}
      <div
        className="absolute z-10 transition-all duration-200 pointer-events-none"
        style={{
          left: pillLeft ? `${pillLeft}px` : '0px',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span className="inline-block bg-white border-2 border-teal-300 text-teal-700 font-semibold rounded-full px-6 py-1 text-base shadow select-none" style={{ minWidth: pillWidth, textAlign: 'center', height: 36, lineHeight: '32px', boxSizing: 'border-box' }}>{formatHour(value)}</span>
      </div>
      {/* Visually hidden slider for accessibility */}
      <input
        ref={sliderRef}
        type="range"
        min={0}
        max={23}
        step={1}
        value={value}
        onChange={onChange}
        className="w-full h-2 mt-0 mb-0 z-20 relative custom-hour-slider"
        disabled={disabled}
        aria-label="Sélectionner l'heure"
        style={{ background: 'transparent', position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', opacity: 0, height: 36, cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      <style>{`
        .custom-hour-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
          background: transparent;
          border: none;
        }
        .custom-hour-slider::-moz-range-thumb {
          width: 0;
          height: 0;
          background: transparent;
          border: none;
        }
        .custom-hour-slider::-ms-thumb {
          width: 0;
          height: 0;
          background: transparent;
          border: none;
        }
        .custom-hour-slider::-webkit-slider-runnable-track {
          height: 2px;
          background: transparent;
        }
        .custom-hour-slider::-ms-fill-lower {
          background: transparent;
        }
        .custom-hour-slider::-ms-fill-upper {
          background: transparent;
        }
        .custom-hour-slider:focus {
          outline: none;
        }
        .custom-hour-slider {
          outline: none;
        }
      `}</style>
    </div>
  );
};

const SelectDate = () => {
  const navigate = useNavigate();
  const { updateBookingData } = useBooking();
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [startHour, setStartHour] = useState(defaultHour);
  const [endHour, setEndHour] = useState(defaultHour);
  const [submitting, setSubmitting] = useState(false);

  const handleRangeSelect = (selectedRange) => {
    setRange(selectedRange || { from: undefined, to: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!range.from || !range.to) {
      alert('Veuillez sélectionner une plage de dates.');
      return;
    }
    setSubmitting(true);
    updateBookingData({
      startDate: range.from.toISOString().split('T')[0],
      endDate: range.to.toISOString().split('T')[0],
      startTime: formatHour(startHour),
      endTime: formatHour(endHour),
    });
    setTimeout(() => {
      setSubmitting(false);
      navigate('/cars');
    }, 600);
  };

  const isValid = range.from && range.to;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fafbfa]">
      {/* Left: Calendar */}
      <div className="md:w-1/2 w-full p-4 sm:p-8 flex flex-col">
        <div className="flex items-center mb-2">
          <button onClick={() => navigate(-1)} className="text-2xl mr-3 hover:bg-gray-200 rounded-full p-1 transition-colors" aria-label="Retour">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-semibold leading-tight">Dates</h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-tight">Sélectionner la date de départ et de retour</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mt-4 border border-gray-100">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleRangeSelect}
            locale={fr}
            weekStartsOn={1}
            numberOfMonths={1}
            showOutsideDays
            modifiersClassNames={{
              selected: 'bg-teal-400 text-white rounded-full',
              range_start: 'bg-teal-500 text-white rounded-full',
              range_end: 'bg-teal-500 text-white rounded-full',
              in_range: 'bg-teal-100',
              today: 'border border-teal-400',
            }}
            styles={{
              caption: { fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' },
              head_cell: { color: '#222', fontWeight: '600', fontSize: '1rem', letterSpacing: '0.05em' },
              cell: { padding: '0.6rem', fontSize: '1rem' },
              nav_button: { color: '#222' },
            }}
          />
        </div>
      </div>
      {/* Right: Time Selection */}
      <div className="md:w-1/2 w-full flex flex-col justify-between p-4 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-1">Horaires</h2>
            <p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8">Sélectionner les heures de départ et d'arrivée</p>
            {/* Départ */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-sm sm:text-base">Départ</div>
                <div className="text-xs text-gray-500">{range.from ? formatDate(range.from) : ''}</div>
              </div>
              <HourSlider value={startHour} onChange={e => setStartHour(Number(e.target.value))} disabled={!range.from} />
            </div>
            {/* Retour */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-sm sm:text-base">Retour</div>
                <div className="text-xs text-gray-500">{range.to ? formatDate(range.to) : ''}</div>
              </div>
              <HourSlider value={endHour} onChange={e => setEndHour(Number(e.target.value))} disabled={!range.to} />
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors w-full text-base font-semibold disabled:opacity-60 mt-4"
          >
            {submitting ? 'Chargement...' : 'Valider les dates'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectDate; 