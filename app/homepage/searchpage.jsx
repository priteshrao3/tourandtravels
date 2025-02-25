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

function SearchPage() {
    const [vans, setVans] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredVans, setFilteredVans] = useState([]);
    const [searchParams, setSearchParams] = useState({
        fromCity: '',
        toCity: '',
        date: '',
        returnDate: '',
        category: '',
        time: '',
    });

    const [activeTab, setActiveTab] = useState('One Way');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState('');
    const router = useRouter();

    // Fetch categories, cities, and vans data
    useEffect(() => {
        axios.get('https://travelboking.pythonanywhere.com/categories/')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));

        axios.get('https://travelboking.pythonanywhere.com/cities/')
            .then(response => setCities(response.data))
            .catch(error => console.error('Error fetching cities:', error));

        axios.get('https://travelboking.pythonanywhere.com/vans/')
            .then(response => {
                setVans(response.data);
                setFilteredVans(response.data);
            })
            .catch(error => console.error('Error fetching vans:', error));

        // Set the current time as the default time
        const currentTime = new Date().toISOString().substr(11, 5);
        setSearchParams(prev => ({
            ...prev,
            time: currentTime
        }));
    }, []);

    // Handle search click
    const handleSearch = () => {
        if (!searchParams.fromCity || !searchParams.toCity) {
            alert("Please select both From and To cities.");
            return;
        }

        router.push(
            `/search-results?fromCity=${encodeURIComponent(searchParams.fromCity)}&toCity=${encodeURIComponent(searchParams.toCity)}&date=${encodeURIComponent(searchParams.date)}&returnDate=${encodeURIComponent(searchParams.returnDate)}&category=${encodeURIComponent(searchParams.category)}&time=${encodeURIComponent(searchParams.time)}`
        );
    };


    // Get list of available routes based on van data
    const getRoutes = () => {
        const routes = [];
        vans.forEach(van => {
            if (van.category === "ONE WAY") {
                const route = `${van.from_city} to ${van.to_city}`;
                if (!routes.includes(route)) {
                    routes.push(route);
                }
            }
        });
        return routes;
    };

    // Get the "Tour Packages" vans
    const getTourPackages = () => {
        return vans.filter(van => van.category === "TOUR PACKAGES");
    };

    // Get Tempo Traveler routes
    const getTempoTravler = () => {
        return vans.filter(van => van.category === "TEMPO TRAVELLER");
    };

    // Get Force Urbania routes
    const getForceUrbania = () => {
        return vans.filter(van => van.category === "FORCE URBANIA");
    };

    // Get Luxury Cabs
    const getLuxuryCabs = () => {
        return vans.filter(van => van.category === "LUXURY CABS");
    };



    // Filter vans based on the selected route
    const filterVansByRoute = (route) => {
        console.log("Selected route:", route);

        if (!route.includes(' to ')) {
            console.error("Invalid route format. Expected format: 'City1 to City2'");
            return;
        }

        const [fromCity, toCity] = route.split(' to ').map(city => city.trim());

        // Navigate to the search results page with query parameters
        router.push(`/search-results?fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}`);
    };


    return (
        <div className="text-black">
            {/* Tabs */}
            <div className="bg-blue-500 md:p-4 py-5 md:pt-14">
                <div className="flex flex-wrap justify-center gap-4">
                    {['One Way', 'Local', 'Tour', 'Round Trip', 'Tempo Traveller', 'Force Urbania'].map(tab => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-black'} 
                    sm:px-6 sm:py-3 md:px-12 md:py-2 font-bold`}
                            onClick={() => {
                                setActiveTab(tab);
                                setSearchParams({
                                    fromCity: '',
                                    toCity: '',
                                    date: '',
                                    returnDate: '',
                                    category: '',
                                    time: '',
                                });
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Filters */}
            <div className="bg-blue-500 p-6 pb-14">
                <div className="flex flex-wrap gap-4 mb-4 justify-center">
                    {/* Show City dropdown for Local tab */}
                    {activeTab === 'Local' && (
                        <div className="w-full sm:w-auto">
                            <label htmlFor="fromCity" className="block text-sm font-bold text-center py-2 bg-white text-gray-700">Select City</label>
                            <select
                                id="fromCity"
                                value={searchParams.fromCity}
                                onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                                className="p-3 rounded border focus:border-blue-500 w-full bg-white"
                            >
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Show From City dropdown for other tabs */}
                    {activeTab !== 'Local' && (
                        <div className="w-full sm:w-auto">
                            <label htmlFor="fromCity" className="block text-sm font-bold text-center py-2 bg-white text-gray-700">Select Pickup City</label>
                            <select
                                id="fromCity"
                                value={searchParams.fromCity}
                                onChange={(e) => setSearchParams({ ...searchParams, fromCity: e.target.value })}
                                className="p-3 rounded border focus:border-blue-500 w-full bg-white"
                            >
                                <option value="">Select Pickup City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Show To City dropdown for relevant tabs */}
                    {['One Way', 'Local', 'Tour', 'Round Trip', 'Tempo Traveller', 'Force Urbania'].includes(activeTab) && (
                        <div className="w-full sm:w-auto">
                            <label htmlFor="toCity" className="block text-sm font-bold text-center py-2 bg-white text-gray-700">Select Drop-off City</label>
                            <select
                                id="toCity"
                                value={searchParams.toCity}
                                onChange={(e) => setSearchParams({ ...searchParams, toCity: e.target.value })}
                                className="p-3 rounded border focus:border-blue-500 w-full bg-white"
                            >
                                <option value="">Select Drop-off City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Date Picker */}
                    <div className="w-full sm:w-auto">
                        <label htmlFor="pickupDate" className="block text-sm font-bold bg-white text-center py-2 text-gray-700">Pickup Date</label>
                        <input
                            id="pickupDate"
                            type="date"
                            value={searchParams.date}
                            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                            className="p-3 rounded border focus:border-blue-500 w-full bg-white"
                        />
                    </div>

                    {/* Return Date for Round Trip */}
                    {activeTab === 'Round Trip' && (
                        <div className="w-full sm:w-auto">
                            <label htmlFor="returnDate" className="block text-sm font-bold bg-white text-center py-2 text-gray-700">Return Date</label>
                            <input
                                id="returnDate"
                                type="date"
                                value={searchParams.returnDate}
                                onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                                className="p-3 rounded border focus:border-blue-500 w-full bg-white"
                            />
                        </div>
                    )}

                    {/* Time Picker */}
                    <div className="w-full sm:w-auto">
                        <label htmlFor="time" className="block text-sm font-bold bg-white text-center py-2 text-gray-700">Select Time</label>
                        <input
                            id="time"
                            type="time"
                            value={searchParams.time}
                            onChange={(e) => setSearchParams({ ...searchParams, time: e.target.value })}
                            className="p-3 rounded border focus:border-blue-500 w-full bg-white"
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className="bg-yellow-400 font-bold text-xl text-white px-6 py-3 rounded-lg"
                    >
                        Search {activeTab}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;