'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '@/app/homepage/navigationbar';

export default function Routes({ params }) {
  // Unwrap params using React.use() as required by the current Next.js version
  const { city } = React.use(params); 

  const [vans, setVans] = useState([]);
  const [filteredVans, setFilteredVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (city) {
      const fetchVans = async () => {
        try {
          const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
          console.log('Fetched data:', response.data);

          // Filter vans based on the 'from_city'
          const cityVans = response.data.filter(
            (van) => van.from_city.toLowerCase() === city.toLowerCase()
          );
          setVans(cityVans);
        } catch (error) {
          console.error('Error fetching vans:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchVans();
    }
  }, [city]);

  // Handle route click to filter vans for the selected route
  const handleRouteClick = (fromCity, toCity) => {
    const route = `${fromCity} to ${toCity}`;
    setSelectedRoute(route);

    // Filter vans based on selected route
    const filtered = vans.filter(
      (van) => van.from_city === fromCity && van.to_city === toCity
    );
    setFilteredVans(filtered);
    setShowModal(true); // Show modal when route is selected
  };

  // Function to format the date
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime()) ? 'Invalid Date' : formattedDate.toLocaleString();
  };

  // Group vans by category
  const groupVansByCategory = () => {
    return vans.reduce((categories, van) => {
      if (!categories[van.category]) {
        categories[van.category] = [];
      }
      categories[van.category].push(van);
      return categories;
    }, {});
  };

  if (!city) return <p>Loading city data...</p>;

  const categorizedVans = groupVansByCategory();

  return (
    <div className="text-black">
      <NavigationBar />

      {loading ? (
        <p>Loading routes...</p>
      ) : (
        <div>
          {/* Display available routes categorized by type in a grid of 3 cards */}
          {Object.keys(categorizedVans).length > 0 ? (
            <div>
              {Object.keys(categorizedVans).map((category) => (
                <div key={category} className="mb-8">
                  <h3 className="text-3xl font-bold mb-4">{category} from {city}</h3>
                  
                  {/* Grid of routes for each category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedVans[category].map((van) => (
                      <div
                        key={van.id}
                        className="border rounded-lg p-4 shadow-lg cursor-pointer"
                        onClick={() => handleRouteClick(van.from_city, van.to_city)}
                      >
                        <h4 className="text-xl font-semibold mb-2">
                          {van.from_city} to {van.to_city}
                        </h4>
                        <p className="text-sm">
                          <strong>Category:</strong> {van.category}
                        </p>
                        <p className="text-sm">
                          <strong>Seats:</strong> {van.seats}
                        </p>
                        <p className="text-sm">
                          <strong>Departure:</strong> {formatDate(van.departure_time)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No routes available from {city}.</p>
          )}
        </div>
      )}

      {/* Modal to show the filtered vans */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start z-50">
          <div className="bg-white w-full h-screen overflow-y-auto p-8 relative text-black">
            <NavigationBar />
            <button
              onClick={() => setShowModal(false)} // Close the modal
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-semibold"
            >
              X
            </button>

            <h3 className="text-2xl font-semibold mb-6">
              Vans for Route: {selectedRoute}
            </h3>

            {/* If filtered vans are available, show them */}
            {filteredVans.length > 0 ? (
              <ul>
                {filteredVans.map((van, index) => (
                  <li key={index} className="border-b pb-4 mb-4">
                    <div>
                      <strong className="text-lg">{van.van_name}</strong> (
                      {van.seats} seats)
                      <p className="text-sm">
                        From: {van.from_city} to {van.to_city}
                      </p>
                      <p className="text-sm">
                        Departure: {formatDate(van.departure_time)}
                      </p>
                      <p className="text-sm">
                        Pickup Date: {new Date(van.pickup_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm">Category: {van.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No vans available for this route.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
