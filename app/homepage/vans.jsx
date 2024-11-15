'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

function VanResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters
  const fromCity = searchParams.get('fromCity');
  const toCity = searchParams.get('toCity');
  const date = searchParams.get('date');
  const category = searchParams.get('category');

  const [vans, setVans] = useState([]);

  // Fetch vans based on search parameters from the query string
  useEffect(() => {
    if (fromCity && toCity && category) {
      const queryParams = new URLSearchParams({
        from_city: fromCity, // Use keys as expected by the backend
        to_city: toCity,
        pickup_date: date,
        category
      }).toString();
  
      axios.get(`https://travelboking.pythonanywhere.com/vans/?${queryParams}`)
        .then((response) => setVans(response.data))
        .catch((error) => console.error('Error fetching vans:', error));
    }
  }, [fromCity, toCity, date, category]);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Van Search Results</h1>
      <div>
        {vans.length === 0 ? (
          <p>No vans found for the selected criteria.</p>
        ) : (
          vans.map((van) => (
            <div key={van.id} className="border-b py-4">
              <h2 className="text-2xl font-semibold">{van.van_name}</h2>
              <p className="text-lg">
                {van.from_city} to {van.to_city}
              </p>
              <p>Pickup Date: {van.pickup_date}</p>
              <p>Departure Time: {new Date(van.departure_time).toLocaleTimeString()}</p>
              <p>Seats: {van.seats}</p>
              <p>Category: {van.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VanResultsPage;
