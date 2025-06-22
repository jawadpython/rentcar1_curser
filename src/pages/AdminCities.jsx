import React, { useState } from 'react';

const getCities = () => JSON.parse(localStorage.getItem('adminCities') || '[]');
const saveCities = (cities) => localStorage.setItem('adminCities', JSON.stringify(cities));

const defaultCity = { name: '', note: '' };

const AdminCities = () => {
  const [cities, setCities] = useState(getCities());
  const [form, setForm] = useState(defaultCity);
  const [editIdx, setEditIdx] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editIdx !== null) {
      updated = cities.map((c, i) => (i === editIdx ? form : c));
    } else {
      updated = [...cities, form];
    }
    setCities(updated);
    saveCities(updated);
    setForm(defaultCity);
    setEditIdx(null);
  };

  const handleEdit = (idx) => {
    setForm(cities[idx]);
    setEditIdx(idx);
  };

  const handleDelete = (idx) => {
    const updated = cities.filter((_, i) => i !== idx);
    setCities(updated);
    saveCities(updated);
    setForm(defaultCity);
    setEditIdx(null);
  };

  // Responsive: show cards on small screens, table on md+
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="max-w-4xl mx-auto mt-6 p-2 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Gestion des villes</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom"
          className="border rounded px-3 py-2 w-full md:w-auto text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note (optionnel)"
          className="border rounded px-3 py-2 w-full md:w-auto text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors w-full md:w-auto text-base font-semibold"
        >
          {editIdx !== null ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
      {/* Cards for mobile, table for md+ */}
      <div className="block md:hidden">
        {cities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucune ville.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {cities.map((city, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{city.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(idx)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      aria-label={`Éditer ${city.name}`}
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      aria-label={`Supprimer ${city.name}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                {city.note && (
                  <div className="text-gray-600 text-sm">{city.note}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg shadow hidden md:block">
        <table className="min-w-[500px] w-full bg-white text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-4">Nom</th>
              <th className="py-3 px-4">Note</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">Aucune ville.</td>
              </tr>
            ) : (
              cities.map((city, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{city.name}</td>
                  <td className="py-3 px-4">{city.note}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(idx)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mr-2"
                      aria-label={`Éditer ${city.name}`}
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      aria-label={`Supprimer ${city.name}`}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCities; 