// app/popularcitys/page.js
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import NavigationBar from '../homepage/navigationbar';

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
        const fromCities = Array.from(new Set(response.data.map((van) => van.from_city)));
        setCities(fromCities);
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
      <h2>City List</h2>
      {loading ? (
        <p>Loading cities...</p>
      ) : (
        <ul>
          {cities.map((city, index) => (
            <li key={index}>
              <Link href={`/popularcitys/${city}`} className="text-blue-500 hover:underline">
                {city}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
