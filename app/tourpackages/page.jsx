'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import NavigationBar from '../homepage/navigationbar';
import Footer from '../homepage/footer';

export default function TourPackages() {
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
        <div className='bg-blue-100'>
            <NavigationBar />
            <h2 className="md:text-5xl text-2xl font-bold md:p-10 p-2 text-center text-white bg-blue-500">
                Taxi Tour Packages From
            </h2>
            {loading ? (
                <p>Loading cities...</p>
            ) : (
                <div className="grid grid-cols-1 mt-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-5 md:px-28 px-2">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={`/popularcitys/${city.name}`}
                            className="flex items-center justify-between bg-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer"
                        >
                            {/* City Name */}
                            <h3 className="text-blue-500 hover:underline capitalize text-2xl font-semibold text-left">
                                {city.name}
                            </h3>
                            {/* Explore Services Button */}
                            <div className="px-3 py-1 bg-yellow-500 text-white text-xl rounded-lg hover:bg-blue-600 transition-colors">
                                View Routes
                            </div>
                        </Link>

                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}
