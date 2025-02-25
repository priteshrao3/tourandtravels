"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';

function LuxuryCabsPage() {
    const [luxuryCabs, setLuxuryCabs] = useState([]);
    const router = useRouter();

    // Fetch only luxury cabs data directly
    useEffect(() => {
        axios.get('https://travelboking.pythonanywhere.com/vans/')
            .then(response => {
                if (Array.isArray(response.data)) {
                    const filteredLuxuryCabs = response.data.filter(van => 
                        van.category?.toUpperCase() === "LUXURY CABS" && van.from_city && van.to_city
                    );
                    setLuxuryCabs(filteredLuxuryCabs);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching luxury cabs:', error));
    }, []);

    // Handle van selection and navigate to the search results page with only luxury cabs
    const filterVansByRoute = (fromCity, toCity) => {
        if (!fromCity || !toCity) {
            console.error("Invalid city values");
            return;
        }
        router.push(`/search-results?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}&category=LUXURY CABS`);
    };

    return (
        <div className="flex justify-center bg-blue-100 pb-5 md:pb-10">
            <div className="text-center md:w-[90em] w-[25em] px-4 md:px-6">
                <h2 className="md:text-4xl text-2xl font-bold py-4 text-orange-500 mt-5">
                    Our Luxury Cabs
                </h2>
                <p className="text-black">
                    The Definitive Collection of Chauffeur-Driven Elegance. Unparalleled Luxury, Comfort, and Professionalism Await You.
                </p>

                {/* Swiper Container */}
                {luxuryCabs.length > 0 ? (
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}  // Default to 1 slide on mobile
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        className="mt-5"
                        breakpoints={{
                            640: {
                                slidesPerView: 4,  // For larger screens (640px and up), show 4 slides
                            },
                        }}
                    >
                        {/* Swiper Slides */}
                        {luxuryCabs.map((van) => (
                            <SwiperSlide key={van.id}>
                                <div
                                    className="p-4 md:p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                                    onClick={() => filterVansByRoute(van.from_city, van.to_city)}
                                >
                                    <img
                                        src={`https://travelboking.pythonanywhere.com${van.image}`}
                                        alt={van.van_name}
                                        className="w-full h-auto rounded-md"
                                    />
                                    <h3 className="text-2xl font-semibold mb-2 capitalize text-blue-900">
                                        {van.from_city} to {van.to_city}
                                    </h3>
                                    <p className="text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                                    <p className="text-2xl text-blue-900">₹{van.fare !== null ? van.fare : 'N/A'}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-red-500 mt-5">No luxury cabs available at the moment.</p>
                )}
            </div>
        </div>
    );
}

export default LuxuryCabsPage;
