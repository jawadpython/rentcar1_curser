import React, { useState } from 'react';

const getCars = () => JSON.parse(localStorage.getItem('cars') || '[]');
const saveCars = (cars) => localStorage.setItem('cars', JSON.stringify(cars));

const defaultCar = { name: '', image: '', price: 0 };

const AdminCars = () => {
  const [cars, setCars] = useState(getCars());
  const [form, setForm] = useState(defaultCar);
  const [editIdx, setEditIdx] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editIdx !== null) {
      updated = cars.map((c, i) => (i === editIdx ? form : c));
    } else {
      updated = [...cars, form];
    }
    setCars(updated);
    saveCars(updated);
    setForm(defaultCar);
    setEditIdx(null);
  };

  const handleEdit = (idx) => {
    setForm(cars[idx]);
    setEditIdx(idx);
  };

  const handleDelete = (idx) => {
    const updated = cars.filter((_, i) => i !== idx);
    setCars(updated);
    saveCars(updated);
    setForm(defaultCar);
    setEditIdx(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-2 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Gestion des voitures</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="border rounded px-3 py-2 w-full md:w-auto text-base focus:outline-none focus:ring-2 focus:ring-teal-400" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL de l'image" className="border rounded px-3 py-2 w-full md:w-auto text-base focus:outline-none focus:ring-2 focus:ring-teal-400" required />
        <input name="price" value={form.price} onChange={handleChange} type="number" min={0} placeholder="Prix/jour" className="border rounded px-3 py-2 w-full md:w-auto text-base focus:outline-none focus:ring-2 focus:ring-teal-400" required />
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors w-full md:w-auto text-base font-semibold">{editIdx !== null ? 'Modifier' : 'Ajouter'}</button>
      </form>
      {/* Card layout for mobile, table for md+ */}
      <div className="block md:hidden">
        {cars.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucune voiture.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {cars.map((car, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">{car.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(idx)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Éditer</button>
                    <button onClick={() => handleDelete(idx)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Supprimer</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={car.image} alt={car.name} className="w-20 h-12 object-cover rounded shadow" />
                  <span className="font-medium">{car.price} MAD / jour</span>
                </div>
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
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Prix/jour</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-500">Aucune voiture.</td></tr>
            ) : cars.map((car, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{car.name}</td>
                <td className="py-3 px-4"><img src={car.image} alt={car.name} className="w-20 h-12 object-cover rounded shadow" /></td>
                <td className="py-3 px-4">{car.price} MAD</td>
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

export default AdminCars; 