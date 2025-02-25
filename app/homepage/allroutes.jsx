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
import VanSearchPage from './page';
import SearchPage from './searchpage';
import LuxuryCabsPage from './luxurycabs';

function AllRoutesPage() {
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

            {/* One Way Popular Routes */}
            <div className="flex justify-center bg-blue-100 md:pb-10 pb-5">
                <div className="text-center">
                    <h2 className="md:text-4xl text-2xl font-bold py-4 text-orange-500 mt-5">
                        One Way Popular Routes
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center mt-5">
                        {getRoutes().map(route => (
                            <div
                                key={route}
                                className="w-full sm:w-80 lg:w-96 md:p-6 p-2 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                                onClick={() => filterVansByRoute(route)}
                            >
                                {/* Smaller Image inside the route card */}
                                <img
                                    src="/1702475754Maruti-Dzire--2.png"
                                    alt="Maruti Dzire"
                                    className="w-32 h-24 mx-auto object-contain rounded-lg"
                                />

                                <div className="p-4">
                                    <h3 className="md:text-xl font-semibold mb-2 capitalize text-blue-900">{route}</h3>
                                    <p className="md:text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                                    <p className="md:text-xl text-blue-900">
                                        ₹{vans.find(van => `${van.from_city} to ${van.to_city}` === route)?.fare || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Popular Taxi Tour Packages */}
            <div className="flex justify-center bg-blue-100 md:pb-10 pb-5">
                <div className="text-center">
                    <h2 className="md:text-4xl text-2xl font-bold py-4 text-orange-500 mt-5">Popular Taxi Tour Packages</h2>
                    <div className="flex flex-wrap gap-6 justify-center mt-5">
                        {getTourPackages().map(van => (
                            <div
                                key={van.id}
                                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                                onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
                            >
                                {/* Smaller Image inside the route card */}
                                <img
                                    src="/1702475754Maruti-Dzire--2.png"
                                    alt="Maruti Dzire"
                                    className="w-32 h-24 mx-auto object-contain rounded-lg"
                                />
                                <div className="p-4">
                                    <h3 className="md:text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                                    <p className="md:text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                                    <p className="md:text-2xl text-blue-900">₹{van.fare}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tempo Travler Popular Routes */}
            <div className="flex justify-center bg-blue-100 md:pb-10 pb-5">
                <div className="text-center">
                    <h2 className="md:text-4xl text-2xl font-bold py-4 text-orange-500 mt-5">Tempo Travler Popular Routes </h2>
                    <div className="flex flex-wrap gap-6 justify-center mt-5">
                        {getTempoTravler().map(van => (
                            <div
                                key={van.id}
                                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                                onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
                            >
                                {/* Smaller Image inside the route card */}
                                <img
                                    src="/1702475754Maruti-Dzire--2.png"
                                    alt="Maruti Dzire"
                                    className="w-32 h-24 mx-auto object-contain rounded-lg"
                                />
                                <div className="p-4">
                                    <h3 className="md:text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                                    <p className="md:text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                                    <p className="md:text-2xl text-blue-900">₹{van.fare}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Force Urbania Popular Routes  */}
            <div className="flex justify-center bg-blue-100 md:pb-10 pb-5">
                <div className="text-center">
                    <h2 className="md:text-4xl text-2xl font-bold py-4 text-orange-500 mt-5">Force Urbania Popular Routes</h2>
                    <div className="flex flex-wrap gap-6 justify-center mt-5">
                        {getForceUrbania().map(van => (
                            <div
                                key={van.id}
                                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                                onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
                            >
                                {/* Smaller Image inside the route card */}
                                <img
                                    src="/1702475754Maruti-Dzire--2.png"
                                    alt="Maruti Dzire"
                                    className="w-32 h-24 mx-auto object-contain rounded-lg"
                                />
                                <div className="p-4">
                                    <h3 className="md:text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                                    <p className="md:text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                                    <p className="md:text-2xl text-blue-900">₹{van.fare}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <LuxuryCabsPage />
        </div>
    );
}

export default AllRoutesPage;