'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import NavigationBar from '../homepage/navigationbar';
import Footer from '../homepage/footer';

export default function TempoTraveller() {
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
                Tempo Traveller From
            </h2>
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-green-600 text-3xl font-bold">Luxury Cabs</h2>
                    <p className="text-gray-600 mt-2">The Definitive Collection of Chauffeured Professionalism Await You</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="/1716915540wheelbase-long.jpg"
                            alt="Tempo Traveller 12+1"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold mb-2">
                                Tempo Traveller 12+1
                                <span className="text-green-600">₹28</span>
                                <sup className="text-sm text-gray-500">/km</sup>
                            </h4>
                            <p className="text-gray-600">
                                <span className="block">Seaters: 12</span>
                                <span className="block">Bag: 8</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="/1716915540wheelbase-long.jpg"
                            alt="Tempo Traveller 17+1"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold mb-2">
                                Tempo Traveller 17+1
                                <span className="text-green-600">₹30</span>
                                <sup className="text-sm text-gray-500">/km</sup>
                            </h4>
                            <p className="text-gray-600">
                                <span className="block">Seaters: 17</span>
                                <span className="block">Bag: 15</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="/1716915540wheelbase-long.jpg"
                            alt="Tempo Traveller 25+1"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold mb-2">
                                Tempo Traveller 25+1
                                <span className="text-green-600">₹40</span>
                                <sup className="text-sm text-gray-500">/km</sup>
                            </h4>
                            <p className="text-gray-600">
                                <span className="block">Seaters: 25</span>
                                <span className="block">Bag: 15</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="w-10 h-10 text-white bg-blue-500 rounded-full flex items-center justify-center">
                        1
                    </button>
                </div>
            </div>

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
