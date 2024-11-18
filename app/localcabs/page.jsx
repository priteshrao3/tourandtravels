'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import NavigationBar from '../homepage/navigationbar';
import Footer from '../homepage/footer';
import Features from '../homepage/features';
import Faq from '../homepage/faq';

export default function LocalCabs() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [filteredVans, setFilteredVans] = useState([]);

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

    const fetchCabsForCity = async (cityName) => {
        try {
            setLoading(true);
            const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
            const vans = response.data.filter(van => van.from_city === cityName);
            setFilteredVans(vans);
            setSelectedCity(cityName);
            setShowModal(true);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching vans:', error);
            setLoading(false);
        }
    };

    return (
        <div className='bg-blue-100'>
            <NavigationBar />
            <h2 className="md:text-5xl text-2xl font-bold md:p-10 p-2 text-center text-white bg-blue-500">
                Local Cab Service From
            </h2>

            <h2 className='text-black text-2xl text-center p-5 font-bold'>
                Select a City to View Cabs</h2>
            {loading ? (
                <p>Loading cities...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-5 md:px-28 px-2">
                    {cities.map((city) => (
                        <div
                            key={city.id}
                            onClick={() => fetchCabsForCity(city.name)}
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

            {showModal && (
                <div className="fixed inset-0 bg-white z-50">
                    <div className="w-full h-full relative overflow-y-auto">
                        <NavigationBar />
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-1 right-1 text-3xl bg-red-600 text-white px-2"
                        >
                            X
                        </button>

                        <h3 className="text-2xl font-semibold p-5 text-black text-center bg-blue-500">
                            Local Cab In {selectedCity}
                        </h3>

                        {filteredVans.length > 0 ? (
                            <div className="flex flex-wrap gap-6 md:px-40 bg-blue-100 py-5">
                                {filteredVans.map((van) => (
                                    <div key={van.id} className="flex flex-col md:flex-row w-full p-4 bg-white shadow-lg rounded-lg">
                                        {/* Section 1: Van Image */}

                                        <div className="taxi-list-left flex-shrink-0 w-full md:w-1/6 flex justify-center mb-4 md:mb-0">
                                            <img
                                                src={`https://travelboking.pythonanywhere.com${van.image}`}
                                                alt={van.van_name}
                                                className="w-full h-auto rounded-md"
                                            />
                                        </div>

                                        {/* Section 2: Van Type */}
                                        <div className="taxi-type flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                                            <span className="text-lg">
                                                <span className="font-bold text-black">Car Type</span> <br /><span className='text-black'> {van.van_name}</span> <br /> <span className="font-bold text-blue-500">More Details</span>
                                            </span>
                                        </div>

                                        {/* Section 3: Luggage */}
                                        <div className="w-full md:w-1/6 mt-10 text-center text-black">
                                            <span>Luggage: {van.luggage}</span>
                                        </div>

                                        {/* Section 4: Seats */}
                                        <div className="w-full md:w-1/6 mt-10 text-center text-black">
                                            <span>Seats: {van.seats}</span>
                                        </div>

                                        {/* Section 5: Price */}
                                        <div className="w-full md:w-1/6 mt-10 text-center text-black">
                                            <b className="text-green-600">₹{van.fare}</b>
                                        </div>

                                        {/* Section 6: Select Van Button */}
                                        <div className="w-full md:w-1/6 mt-10 text-center">
                                            <Link
                                                href={{
                                                    pathname: '/vanbooking',
                                                    query: {
                                                        from_city: van.from_city,
                                                        to_city: van.to_city,
                                                        van_name: van.van_name,
                                                        fare: van.fare,
                                                    },
                                                }}
                                                className="btn bg-yellow-500 text-white py-2 px-4 rounded-lg"
                                            >
                                                Select Van
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-black">No vans available for {selectedCity}.</p>
                        )}
                        <Features />
                        <Faq />
                        <Footer />
                    </div>
                </div>

            )}
            <Footer />
        </div>
    );
}
