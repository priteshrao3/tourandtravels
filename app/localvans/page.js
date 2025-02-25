'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NavigationBar from '../homepage/navigationbar';
import Footer from '../homepage/footer';
import Features from '../homepage/features';
import Faq from '../homepage/faq';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const fromCity = searchParams.get('fromCity');
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVans = async () => {
            try {
                const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
                const filteredVans = response.data.filter(van => van.from_city === fromCity);
                setVans(filteredVans);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vans:', error);
                setLoading(false);
            }
        };

        if (fromCity) {
            fetchVans();
        }
    }, [fromCity]);

    return (
        <div className="bg-blue-100">
            <NavigationBar />
            <h2 className="text-center py-5 text-4xl text-orange-500 font-bold capitalize">
                Local Cabs from {fromCity}
            </h2>

            {loading ? (
                <p className="text-center text-black">Loading cabs...</p>
            ) : vans.length > 0 ? (
                <div className="flex flex-wrap gap-6 md:px-40 bg-blue-100 py-5">
                    {vans.map((van) => (
                        <div key={van.id} className="flex flex-col md:flex-row w-full p-4 bg-white shadow-lg rounded-lg">
                            {/* Van Image */}
                            <div className="flex-shrink-0 w-full md:w-1/6 flex justify-center mb-4 md:mb-0">
                                <img
                                    src={`https://travelboking.pythonanywhere.com${van.image}`}
                                    alt={van.van_name}
                                    className="w-full h-auto rounded-md"
                                />
                            </div>

                            {/* Van Details */}
                            <div className="flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                                <span className="text-lg">
                                    <span className="font-bold text-black">Car Type</span> <br /> {van.van_name} <br />
                                    <span className="font-bold text-blue-500">More Details</span>
                                </span>
                            </div>

                            {/* Luggage */}
                            <div className="w-full md:w-1/6 mt-10 text-center text-black">
                                <span>Luggage: {van.luggage}</span>
                            </div>

                            {/* Seats */}
                            <div className="w-full md:w-1/6 mt-10 text-center text-black">
                                <span>Seats: {van.seats}</span>
                            </div>

                            {/* Price */}
                            <div className="w-full md:w-1/6 mt-10 text-center text-black">
                                <b className="text-green-600">₹{van.fare}</b>
                            </div>

                            {/* Select Van Button */}
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
                <p className="text-center text-black">No cabs available for {fromCity}.</p>
            )}

            <Features />
            <Faq />
            <Footer />
        </div>
    );
}
