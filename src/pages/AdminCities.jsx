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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des villes</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col md:flex-row gap-4 items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="border rounded px-3 py-2" required />
        <input name="note" value={form.note} onChange={handleChange} placeholder="Note (optionnel)" className="border rounded px-3 py-2" />
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors">{editIdx !== null ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-4">Nom</th>
              <th className="py-3 px-4">Note</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-8 text-gray-500">Aucune ville.</td></tr>
            ) : cities.map((city, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{city.name}</td>
                <td className="py-3 px-4">{city.note}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleEdit(idx)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm mr-2">Éditer</button>
                  <button onClick={() => handleDelete(idx)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCities; 