'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import NavigationBar from '../homepage/navigationbar';
import Footer from '../homepage/footer';

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
        // Extract unique cities from 'from_city'
        const fromCities = Array.from(new Set(response.data.map((van) => van.from_city)));
        // Fetch the detailed city data (with images)
        const cityDetails = await axios.get('https://travelboking.pythonanywhere.com/cities/');
        const cityData = cityDetails.data.filter(city => fromCities.includes(city.name));
        setCities(cityData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className='bg-white'>
      <NavigationBar />
      <h2 className="text-5xl font-bold p-10 text-center text-white bg-blue-500">
        Popular Cities
      </h2>

      <h2 className='text-black text-3xl text-center p-5 font-bold'>Top Taxi Services by City</h2>
      {loading ? (
        <p>Loading cities...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/popularcitys/${city.name}`}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer"
            >
              {/* City Image */}
              {city.image && (
                <img
                  src={`https://travelboking.pythonanywhere.com${city.image}`}
                  alt={city.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              {/* City Name */}
              <h3 className="text-blue-500 hover:underline text-2xl font-semibold mb-2 text-center">
                {city.name}
              </h3>

              {/* Explore Services Button */}
              <div className="px-5 py-2 bg-yellow-500 text-white text-xl rounded-lg hover:bg-blue-600 transition-colors">
                Explore Services
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
