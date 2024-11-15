'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function VanListPage() {
  const [vans, setVans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  // Fetch vans and categories when component mounts
  useEffect(() => {
    // Fetch vans
    axios.get('https://travelboking.pythonanywhere.com/vans/')
      .then(response => setVans(response.data))
      .catch(error => console.error('Error fetching vans:', error));

    // Fetch categories
    axios.get('https://travelboking.pythonanywhere.com/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Filter vans by category and search text
  const filteredVans = vans.filter(van => {
    const matchesCategory = selectedCategory ? van.category === selectedCategory : true;
    const matchesSearchText = van.name.toLowerCase().includes(searchText.toLowerCase()) ||
                              van.from_city.toLowerCase().includes(searchText.toLowerCase()) ||
                              van.to_city.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSearchText;
  });

  // Handle van click to navigate to details page
  const handleVanClick = (vanId) => {
    router.push(`/van-details/${vanId}`); // Navigate to van details page
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Available Vans</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded border focus:border-blue-500 bg-white w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Search by city or name */}
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by city or van name"
          className="p-3 rounded border focus:border-blue-500 bg-white w-full sm:w-auto"
        />
      </div>

      {/* Van List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVans.map(van => (
          <div
            key={van.id}
            className="bg-white p-6 shadow-lg rounded-lg cursor-pointer"
            onClick={() => handleVanClick(van.id)}
          >
            <h2 className="text-2xl font-semibold text-blue-900">{van.name}</h2>
            <p className="text-gray-600 mb-2">Category: {van.category}</p>
            <p className="text-gray-600">Route: {van.from_city} to {van.to_city}</p>
            <p className="text-gray-600">Fare: ₹{van.fare}</p>
            <p className="text-gray-600">Date: {van.pickup_date}</p>
          </div>
        ))}
      </div>

      {/* No results found */}
      {filteredVans.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No vans found. Please adjust your filters or search.</p>
      )}
    </div>
  );
}

export default VanListPage;
