'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavigationBar from '../homepage/navigationbar';
import Footer from '../homepage/footer';
import Features from '../homepage/features';
import Faq from '../homepage/faq';

export default function LocalCabs() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
                const fromCities = Array.from(new Set(response.data.map((van) => van.from_city)));
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

    const handleCityClick = (cityName) => {
        router.push(`/localvans?fromCity=${cityName}`);
    };

    return (
        <div className='bg-blue-100'>
            <NavigationBar />
            <h2 className="md:text-5xl text-2xl font-bold md:p-10 p-2 text-center text-white bg-blue-500">
                Local Cab Service From
            </h2>

            <h2 className='text-black text-2xl text-center p-5 font-bold'>
                Select a City to View Cabs
            </h2>

            {loading ? (
                <p className="text-center text-black">Loading cities...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-5 md:px-28 px-2">
                    {cities.map((city) => (
                        <div
                            key={city.id}
                            onClick={() => handleCityClick(city.name)}
                            className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden p-4 cursor-pointer"
                        >
                            <h3 className="text-black hover:underline text-2xl font-semibold mb-2 text-center">
                                Local Taxi Service {city.name}
                            </h3>
                            <div className="w-full py-1 mt-1 text-center bg-yellow-500 text-black text-xl rounded-lg hover:bg-blue-600 transition-colors">
                                View Cabs
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Features />
            <Faq />
            <Footer />
        </div>
    );
}
