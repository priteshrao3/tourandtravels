'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './navigationbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Faq from './faq';
import Footer from './footer';


function VanSearchPage() {
  const [vans, setVans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchParams, setSearchParams] = useState({
    fromCity: '',
    toCity: '',
    date: '',
    returnDate: '',
    category: '',
    time: ''
  });




  const [showPopup, setShowPopup] = useState(false);
  const [selectedVan, setSelectedVan] = useState(null);

  // Function to handle the "Select Van" button click
  const handleSelectVan = (van) => {
    setSelectedVan(van);
    setShowPopup(true);
  };



  const [activeTab, setActiveTab] = useState('One Way');
  const [filteredVans, setFilteredVans] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const currentTime = new Date().toISOString().substr(11, 5); // Format time as HH:MM
    setSearchParams(prev => ({
      ...prev,
      time: currentTime
    }));
  }, []);

  // Filter vans based on the search parameters
  const filterVans = () => {
    const filtered = vans.filter(van => {
      const matchesFromCity = searchParams.fromCity ? van.from_city.toLowerCase() === searchParams.fromCity.toLowerCase() : true;
      const matchesToCity = searchParams.toCity ? van.to_city.toLowerCase() === searchParams.toCity.toLowerCase() : true;
      const matchesDate = searchParams.date ? van.pickup_date === searchParams.date : true;
      const matchesCategory = searchParams.category ? van.category.toLowerCase() === searchParams.category.toLowerCase() : true;

      return matchesFromCity && matchesToCity && matchesDate && matchesCategory;
    });

    setFilteredVans(filtered);  // Update the filtered vans list
    setHasSearched(true);  // Set the flag to indicate that search has been made
  };

  // Handle search click
  const handleSearch = () => {
    filterVans();  // Filter the vans based on search criteria
    setIsModalOpen(true);  // Open the modal after the search
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
    const [fromCity, toCity] = route.split(' to ');  // Split the route into fromCity and toCity
    const filteredByRoute = vans.filter(van =>
      van.from_city.toLowerCase() === fromCity.toLowerCase() &&
      van.to_city.toLowerCase() === toCity.toLowerCase()
    );
    setFilteredVans(filteredByRoute);  // Update the filtered vans list based on selected route
    setSelectedRoute(route);  // Set the selected route
    setIsModalOpen(true);  // Open the modal when a route is selected
  };


  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="text-black">

      {/* Tabs */}
      <div className="bg-blue-500 p-4 pt-14">
        <div className="flex justify-center gap-4">
          {['One Way', 'Local', 'Tour', 'Round Trip', 'Tempo Traveller'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
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
          {['One Way', 'Tour', 'Round Trip', 'Tempo Traveller'].includes(activeTab) && (
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
      {/* Search Filters */}


      {/* One Way Popular Routes */}
      <div className="flex justify-center bg-blue-100 pb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold py-4 text-orange-500 mt-5">One Way Popular Routes</h2>
          <div className="flex flex-wrap gap-6 justify-center mt-5">
            {getRoutes().map(route => (
              <div
                key={route}
                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                onClick={() => filterVansByRoute(route)}
              >
                <h3 className="text-xl font-semibold mb-2 capitalize text-blue-900">{route}</h3>
                <p className="text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                <p className="text-xl text-blue-900">
                  ₹{vans.find(van => `${van.from_city} to ${van.to_city}` === route)?.fare || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Popular Taxi Tour Packages */}
      <div className="flex justify-center bg-blue-100 pb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold py-4 text-orange-500 mt-5">Popular Taxi Tour Packages</h2>
          <div className="flex flex-wrap gap-6 justify-center mt-5">
            {getTourPackages().map(van => (
              <div
                key={van.id}
                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
              >
                <h3 className="text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                <p className="text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                <p className="text-2xl text-blue-900">₹{van.fare}</p>
              </div>
            ))}

          </div>
        </div>
      </div>


      {/* Tempo Travler Popular Routes */}
      <div className="flex justify-center bg-blue-100 pb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold py-4 text-orange-500 mt-5">Tempo Travler Popular Routes </h2>
          <div className="flex flex-wrap gap-6 justify-center mt-5">
            {getTempoTravler().map(van => (
              <div
                key={van.id}
                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
              >
                <h3 className="text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                <p className="text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                <p className="text-2xl text-blue-900">₹{van.fare}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Force Urbania Popular Routes  */}
      <div className="flex justify-center bg-blue-100 pb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold py-4 text-orange-500 mt-5">Force Urbania Popular Routes</h2>
          <div className="flex flex-wrap gap-6 justify-center mt-5">
            {getForceUrbania().map(van => (
              <div
                key={van.id}
                className="w-full sm:w-80 lg:w-96 p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
              >
                <h3 className="text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                <p className="text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                <p className="text-2xl text-blue-900">₹{van.fare}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* getLuxuryCabs */}
      <div className="flex justify-center bg-blue-100 pb-10">
        <div className="text-center max-w-screen-xl">
          <h2 className="text-4xl font-bold py-4 text-orange-500 mt-5">Our Luxury Cabs</h2>
          <p className='text-black'>The Definitive Collection of Chauffeur-Driven Elegance: Unparalleled Luxury, Comfort, and Professionalism Await You</p>

          {/* Swiper Container */}
          <Swiper
            spaceBetween={20}         // Space between items
            slidesPerView={4}         // Show 4 items per slide
            loop={true}               // Loop through the items
            autoplay={{
              delay: 3000,            // Delay between transitions
              disableOnInteraction: false, // Allow autoplay even after user interaction
            }}
            navigation={true}        // Enable navigation (next/prev buttons)
            modules={[Navigation, Autoplay]} // Import necessary modules
            className="mt-5"
          >
            {/* Swiper Slides */}
            {getLuxuryCabs().map(van => (
              <SwiperSlide key={van.id}>
                <div
                  className="p-6 bg-white shadow-lg rounded-lg cursor-pointer text-center"
                  onClick={() => filterVansByRoute(`${van.from_city} to ${van.to_city}`)}
                >
                  <h3 className="text-2xl font-semibold mb-2 capitalize text-blue-900">{van.from_city} to {van.to_city}</h3>
                  <p className="text-lg font-medium mb-2 text-blue-900">Start Fare</p>
                  <p className="text-2xl text-blue-900">₹{van.fare}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>



















      {/* Full-Screen Modal for displaying filtered vans */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="w-full h-full relative overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 text-3xl bg-red-600 text-black px-2"
            >
              &times;
            </button>

            <NavigationBar />

            {/* Tabs */}
            <div className="bg-blue-500 p-4 pt-14">
              <div className="flex justify-center gap-4">
                {['One Way', 'Local', 'Tour', 'Round Trip', 'Tempo Traveller'].map(tab => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
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
                {['One Way', 'Tour', 'Round Trip', 'Tempo Traveller'].includes(activeTab) && (
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
            {/* Search Filters */}







            {/* Heading for the filtered vans route */}
            {filteredVans.length > 0 && (
              <div className="text-center py-5 pt-10 bg-blue-100">
                <h2 className="text-4xl text-orange-400 font-bold capitalize">
                  {filteredVans[0].from_city} To: {filteredVans[0].to_city}
                </h2>
              </div>
            )}

            {/* Van List in a single column */}
            {filteredVans.length > 0 ? (
              <div className="flex flex-wrap gap-6 md:px-40 bg-blue-100 py-5">
                {filteredVans.map((van) => (
                  <div key={van.id} className="flex flex-col md:flex-row w-full p-4 bg-white shadow-lg rounded-lg">
                    {/* Section 1: Van Image */}
                    <div className="taxi-list-left flex-shrink-0 w-full md:w-1/6 flex justify-center mb-4 md:mb-0">
                      <img src="https://sardartravels.in/uploads/cab//1702475754Maruti-Dzire--2.png" alt={van.van_name} className="w-full h-auto rounded-md" />
                    </div>

                    {/* Section 2: Van Type */}
                    <div className="taxi-type flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                      <span className="text-lg">
                        <span className="font-bold text-black">Car Type</span> <br /> {van.van_name} <br /> <span className="font-bold text-blue-500">More Details</span>
                      </span>
                    </div>

                    {/* Section 3: Luggage */}
                    <div className="taxi-luggage flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                      <i className="fa fa-suitcase-rolling text-gray-600"></i>
                      <span>{van.luggage} Luggage</span>
                    </div>

                    {/* Section 4: Seats */}
                    <div className="taxi-seats flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                      <i className="fa fa-user-tie text-gray-600"></i>
                      <span>{van.seats} Seats</span>
                    </div>

                    {/* Section 5: Price */}
                    <div className="taxi-price flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                      <div className="text-lg font-bold text-green-600">
                        <b itemProp="priceCurrency" content="USD">₹{van.fare}</b> <span className="text-sm">Inc. of Taxes*</span>
                      </div>
                    </div>

                    {/* Section 6: Select Van Button */}
                    <div className="taxi-cta flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
                      <a
                        onClick={() => handleSelectVan(van)}
                        className="cursor-pointer btn btn-yellow bg-yellow-500 text-white py-2 px-4 rounded-lg"
                      >
                        Select Van
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-bold text-3xl text-center p-5 text-red-700">No vans available for the selected criteria.</p>
            )}

            {/* Popup Form */}
            {showPopup && selectedVan && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg md:w-[30em]">
                  <h2 className="text-2xl font-bold mb-4">Van Booking Form</h2>

                  {/* Van Details */}
                  <p><strong>Going From:</strong> {filteredVans[0].from_city}</p>
                  <p><strong>Going To:</strong> {filteredVans[0].to_city}</p>
                  <p><strong>Selected Car:</strong> {selectedVan.van_name}</p>
                  <p><strong>Price:</strong> ₹{selectedVan.fare} Inc. of Taxes*</p>

                  {/* Form Fields */}
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Pick Up Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Pick Up Time</label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pickup_address" className="block text-sm font-medium text-gray-700">Pick Up Address</label>
                      <input
                        type="text"
                        id="pickup_address"
                        name="pickup_address"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg">Submit</button>
                  </form>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowPopup(false)}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}




            <div className='mt-5'>
              <Faq />
            </div>
            <p className='text-orange-400 font-bold text-3xl text-center p-5'>Visitors Guide</p>
            <p className='text-orange-400 font-bold text-3xl text-center p-5'>Terms & Condition</p>
            <Footer />
          </div>

        </div>
      )}
      {/* Full-Screen Modal for displaying filtered vans */}

    </div>
  );
}

export default VanSearchPage;
