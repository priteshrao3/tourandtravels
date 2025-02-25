'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import axios from 'axios';
import NavigationBar from '@/app/homepage/navigationbar';
import Footer from '@/app/homepage/footer';

export default function Routes({ params }) {
  const [city, setCity] = useState('');
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setCity(resolvedParams.city);
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!city) return;

    const fetchVans = async () => {
      try {
        const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
        const cityVans = response.data.filter((van) => van.from_city.toLowerCase() === city.toLowerCase());
        setVans(cityVans);
      } catch (error) {
        console.error('Error fetching vans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVans();
  }, [city]);

  const groupVansByCategory = () => {
    return vans.reduce((categories, van) => {
      if (!categories[van.category]) {
        categories[van.category] = [];
      }
      categories[van.category].push(van);
      return categories;
    }, {});
  };

  const categorizedVans = groupVansByCategory();

  // Function to navigate to the search results page
  const filterVansByRoute = (fromCity, toCity) => {
    router.push(`/search-results?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}`);
  };

  return (
    <div className="text-black">
      <NavigationBar />

      <div className="text-white bg-blue-500 flex flex-col lg:flex-row justify-between items-center lg:items-start py-5 gap-8 md:px-20">
        <div className="lg:text-left text-center md:mt-10">
          <h2 className="md:text-5xl text-3xl font-bold mb-4">Taxi Service in {city}</h2>
          <p className="text-lg px-3">Taxi Service in {city} | Local Cab Service in {city} | One Way Taxi Service {city}</p>
        </div>
      </div>

      {loading ? (
        <p>Loading routes...</p>
      ) : (
        <div className='md:px-20 md:py-10 bg-blue-100'>
          {Object.keys(categorizedVans).length > 0 ? (
            Object.keys(categorizedVans).map((category) => (
              <div key={category} className="md:mb-20">
                <h3 className="md:text-3xl text-2xl p-4 font-bold mb-4">{category} from {city}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
                  {categorizedVans[category].map((van) => (
                    <div key={van.id} className="relative border rounded-lg p-4 shadow-lg bg-white">
                      <button
                        className="absolute top-7 right-4 bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={() => filterVansByRoute(van.from_city, van.to_city)}
                      >
                        View Vans
                      </button>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{van.from_city} to {van.to_city}</h4>
                        <p className="text-sm">
                          <strong>Fare Start From</strong> <span className='text-xl font-bold text-black'>₹{van.fare}</span>/-Only
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No routes available from {city}.</p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
