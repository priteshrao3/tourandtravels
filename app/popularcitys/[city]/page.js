'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '@/app/homepage/navigationbar';
import Footer from '@/app/homepage/footer';
import Link from 'next/link';
import Features from '@/app/homepage/features';
import Faq from '@/app/homepage/faq';

export default function Routes({ params }) {
  const [city, setCity] = useState('');
  const [vans, setVans] = useState([]);
  const [filteredVans, setFilteredVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityDetails, setCityDetails] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchParams() {
      // Unwrapping the `params` Promise
      const resolvedParams = await params;
      setCity(resolvedParams.city);
    }

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!city) return;

    const fetchCityDetails = async () => {
      try {
        const response = await axios.get('https://travelboking.pythonanywhere.com/cities/');
        const cityData = response.data.find((c) => c.name.toLowerCase() === city.toLowerCase());
        setCityDetails(cityData || null);
      } catch (error) {
        console.error('Error fetching city details:', error);
      }
    };

    const fetchVans = async () => {
      try {
        const response = await axios.get('https://travelboking.pythonanywhere.com/vans/');
        const cityVans = response.data.filter(
          (van) => van.from_city.toLowerCase() === city.toLowerCase()
        );
        setVans(cityVans);
      } catch (error) {
        console.error('Error fetching vans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
    fetchVans();
  }, [city]);

  const handleRouteClick = (fromCity, toCity) => {
    const route = `${fromCity} to ${toCity}`;
    setSelectedRoute(route);
    const filtered = vans.filter((van) => van.from_city === fromCity && van.to_city === toCity);
    setFilteredVans(filtered);
    setShowModal(true);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime()) ? 'Invalid Date' : formattedDate.toLocaleString();
  };

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

  return (
    <div className="text-black">
      <NavigationBar />
      <div className="text-white bg-blue-500 flex flex-col lg:flex-row justify-between items-center lg:items-start py-5 gap-8 md:px-20">
        {/* Text Section */}
        <div className="lg:text-left text-center md:mt-10">
          <h2 className="md:text-5xl text-3xl font-bold mb-4">Taxi Service in {city}</h2>
          <p className="text-lg px-3">
            Taxi Service in {city} | Local Cab Service in {city} | One Way Taxi Service {city}
          </p>
        </div>

        {/* City Image Section */}
        <div className="lg:text-right">
          {cityDetails && cityDetails.image ? (
            <img
              src={`https://travelboking.pythonanywhere.com${cityDetails.image}`}
              alt={`${cityDetails.name}`}
              className="w-72 h-auto object-cover rounded-md shadow-lg"
            />
          ) : (
            <p className="text-lg text-white">City image not available</p>
          )}
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
                    <div
                      key={van.id}
                      className="relative border rounded-lg p-4 shadow-lg bg-white"
                    >
                      {/* Button Section - Top Right */}
                      <button
                        className="absolute top-7 right-4 bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={() => handleRouteClick(van.from_city, van.to_city)}
                      >
                        View Vans
                      </button>

                      {/* Content Section */}
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {van.from_city} to {van.to_city}
                        </h4>
                        <p className="text-sm">
                          <strong>Fare Start From</strong>{' '}
                          <span className='text-xl font-bold text-black'>₹{van.fare}</span>/-Only
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

          <p className='text-3xl text-black p-2'>Visitors Guide:-</p>
          <p className='text-black p-4 md:p-1'>
            Chandigarh to Amritsar Taxi Service, Chandigarh to Ajnala Taxi Service, Chandigarh to Baba Bakala Taxi Service, Chandigarh to Majitha Taxi Service, Chandigarh to Barnala Taxi Service, Chandigarh to Tapa Taxi Service, Chandigarh to Bathinda Taxi Service, Chandigarh to Rampura Phul Taxi Service, Chandigarh to Talwandi Sabo Taxi Service, Chandigarh to Maur Taxi Service, Chandigarh to Faridkot Taxi Service, Chandigarh to Jaito Taxi Service, Chandigarh to Kot Kapura Taxi Service, Chandigarh to Amloh Taxi Service, Chandigarh to Bassi Pathana Taxi Service, Chandigarh to Fatehgarh Sahib Taxi Service, Chandigarh to Khamanon Taxi Service, Chandigarh to Abohar Taxi Service, Chandigarh to Fazilka Taxi Service, Chandigarh to Jalalabad Taxi Service, Chandigarh to Firozpur Taxi Service, Chandigarh to Guru Harsahai Taxi Service, Chandigarh to Zira Taxi Service, Chandigarh to Batala, Chandigarh to Dera Baba Nanak Taxi Service, Chandigarh to Gurdaspur Taxi Service, Chandigarh to Kalanaur Taxi Service, Chandigarh to Dasua Taxi Service, Chandigarh to Garhshankar Taxi Service, Chandigarh to Hoshiarpur Taxi Service, Chandigarh to Mukerian Taxi Service, Chandigarh to Jalandhar Taxi Service, Chandigarh to Nakodar Taxi Service, Chandigarh to Phillaur Taxi Service, Chandigarh to Shahkot Taxi Service, Chandigarh to Bhulath Taxi Service, Chandigarh to Kapurthala Taxi Service, Chandigarh to Phagwara Taxi Service, Chandigarh to Sultanpur Lodhi Taxi Service, Chandigarh to Jagraon Taxi Service, Chandigarh to Khanna Taxi Service, Chandigarh to Ludhiana Taxi Service, Chandigarh to Payal Taxi Service, Chandigarh to Raikot Taxi Service, Chandigarh to Samrala Taxi Service, Chandigarh to Budhlada Taxi Service, Chandigarh to Mansa Taxi Service, Chandigarh to Sardulgarh Taxi Service, Chandigarh to Bagha Purana Taxi Service, Chandigarh to Dharamkot Taxi Service, Chandigarh to Moga Taxi Service, Chandigarh to Nihal Singh Wala Taxi Service, Chandigarh to Gidderbaha Taxi Service, Chandigarh to Malout Taxi Service, Chandigarh to Shri Muktsar Sahib Taxi Service, Chandigarh to Dhar Kalan Taxi Service, Chandigarh to Pathankot Taxi Service, Chandigarh to Dudhan Sadhan Taxi Service, Chandigarh to Nabha Taxi Service, Chandigarh to Patiala Taxi Service, Chandigarh to Patran Taxi Service, Chandigarh to Chandigarh Taxi Service, Chandigarh to Samana Taxi Service, Chandigarh to Chandigarh Taxi Service, Chandigarh to Chamkaur Sahib Taxi Service, Chandigarh to Nangal Taxi Service, Chandigarh to Rup Nagar Taxi Service, Chandigarh to Ahmedgarh Taxi Service, Chandigarh to Bhawanigarh Taxi Service, Chandigarh to Dhuri Taxi Service, Chandigarh to Lehra Taxi Service, Chandigarh to Malerkotla Taxi Service, Chandigarh to Moonak Taxi Service, Chandigarh to Sangrur Taxi Service, Chandigarh to Sunam Taxi Service, Chandigarh to Dera Bassi Taxi Service, Chandigarh to Kharar Taxi Service, Chandigarh to Balachaur Taxi Service, Chandigarh to Banga Taxi Service, Chandigarh to Nawanshehar Taxi Service, Chandigarh to Khadur Sahib Taxi Service, Chandigarh to Patti Taxi Service, Chandigarh to Tarn Taran Taxi Service Haryana Taxi Service, Chandigarh to Ambala Taxi Service, Chandigarh to Bhiwani Taxi Service, Chandigarh to Charkhi Dadri Taxi Service, Chandigarh to Faridabad Taxi Service, Chandigarh to Fatehabad Taxi Service, Chandigarh to Chandigarh Taxi Service, Chandigarh to Hisar Taxi Service, Chandigarh to Jhajjar Taxi Service, Chandigarh to Jind Taxi Service, Chandigarh to Kaithal Taxi Service, Chandigarh to Karnal Taxi Service, Chandigarh to Kurukshetra Taxi Service, Chandigarh to Mahendragarh Taxi Service, Chandigarh to Nuh Taxi Service, Chandigarh to Palwal Taxi Service, Chandigarh to Panchkula Taxi Service, Chandigarh to Panipat Taxi Service, Chandigarh to Rewari Taxi Service, Chandigarh to Rohtak Taxi Service, Chandigarh to Sirsa Taxi Service, Chandigarh to Sonipat Taxi Service, Chandigarh to Yamunanagar, Chandigarh to Agra Taxi Service, Chandigarh to Aligarh Taxi Service, Chandigarh to PrayagRaj Taxi Service, Chandigarh to Ambedkar Nagar Taxi Service, Chandigarh to Amroha Taxi Service, Chandigarh to Auraiya Taxi Service, Chandigarh to Azamgarh Taxi Service, Chandigarh to Badaun Taxi Service, Chandigarh to Bahraich Taxi Service, Chandigarh to Ballia Taxi Service, Chandigarh to Balrampur Taxi Service, Chandigarh to Banda Taxi Service, Chandigarh to Barabanki Taxi Service, Chandigarh to Bareilly Taxi Service, Chandigarh to Basti Taxi Service, Chandigarh to Bijnor Taxi Service, Chandigarh to Bulandshahr Taxi Service, Chandigarh to Chandauli Taxi Service, Chandigarh to Etah Taxi Service, Chandigarh to Etawah Taxi Service, Chandigarh to Faizabad Taxi Service, Chandigarh to Farrukhabad Taxi Service, Chandigarh to Fatehpur Taxi Service, Chandigarh to Firozabad Taxi Service, Chandigarh to Gautam Buddha Nagar Taxi Service, Chandigarh to Ghaziabad Taxi Service, Chandigarh to Ghazipur Taxi Service, Chandigarh to Gonda Taxi Service, Chandigarh to Gorakhpur Taxi Service, Chandigarh to Hamirpur Taxi Service, Chandigarh to Hapur Taxi Service, Chandigarh to Hardoi Taxi Service, Chandigarh to Hathras Taxi Service, Chandigarh to Jaunpur Taxi Service, Chandigarh to Jhansi Taxi Service, Chandigarh to Lakhimpur Kheri Taxi Service, Chandigarh to Lalitpur Taxi Service, Chandigarh to Lucknow Taxi Service, Chandigarh to Mainpuri Taxi Service, Chandigarh to Mathura Taxi Service, Chandigarh to Meerut Taxi Service, Chandigarh to Mirzapur Taxi Service, Chandigarh to Moradabad Taxi Service, Chandigarh to Muzaffarnagar Taxi Service, Chandigarh to Pilibhit Taxi Service, Chandigarh to Pratapgarh Taxi Service, Chandigarh to Rae Bareli Taxi Service, Chandigarh to Rampur Taxi Service, Chandigarh to Saharanpur Taxi Service, Chandigarh to Sant Kabir Nagar Taxi Service, Chandigarh to Sant Ravidas Nagar Taxi Service, Chandigarh to Sambhal Taxi Service, Chandigarh to Shahjahanpur Taxi Service, Chandigarh to Shamli Taxi Service, Chandigarh to Sitapur Taxi Service, Chandigarh to Varanasi Taxi Service, Chandigarh to Bilaspur Taxi Service, Chandigarh to Naina Devi Taxi Service, Chandigarh to Chamba Taxi Service, Chandigarh to bharmour Taxi Service, Chandigarh to Kangra Taxi Service, Chandigarh to Kangra Taxi Service, Chandigarh to Nurpur Taxi Service, Chandigarh to Fatehpur Taxi Service, Chandigarh to Baijnath Taxi Service, Chandigarh to Jaisinghpur Taxi Service, Chandigarh to Dharamshala Taxi Service, Chandigarh to Palampur Taxi Service, Chandigarh to Hamirpur Taxi Service, Chandigarh to Barsar Taxi Service, Chandigarh to Hamirpur Taxi Service, Chandigarh to Sujanpur Taxi Service, Chandigarh to Nadaun Taxi Service, Chandigarh to Bhoranj Taxi Service, Chandigarh to Lahaul Spiti Taxi Service, Chandigarh to Keylong Taxi Service, Chandigarh to Kullu Taxi Service, Chandigarh to Nirmand Taxi Service, Chandigarh to Banjar Taxi Service, Chandigarh to Manali Taxi Service, Chandigarh to Mandi Taxi Service, Chandigarh to Sirmaur Taxi Service, Chandigarh to Kinnaur Taxi Service, Chandigarh to Kalpa Taxi Service, Chandigarh to Sangla Taxi Service, Chandigarh to Moorang Taxi Service, Chandigarh to Hangrang Taxi Service, Chandigarh to Tapri Taxi Service, Chandigarh to Shimla Taxi Service, Chandigarh to Rampur Taxi Service, Chandigarh to Theog Taxi Service, Chandigarh to Chaupal Taxi Service, Chandigarh to Kotkhai Taxi Service, Chandigarh to Rohru Taxi Service, Chandigarh to Nahan Taxi Service, Chandigarh to Renuka Taxi Service, Chandigarh to Shillai Taxi Service, Chandigarh to Rajgarh Taxi Service, Chandigarh to Pachhad Taxi Service, Chandigarh to Paonta Sahib Taxi Service, Chandigarh to Solan Taxi Service, Chandigarh to Kasauli Taxi Service, Chandigarh to Nalagarh Taxi Service, Chandigarh to Arki Taxi Service, Chandigarh to Kandaghat Taxi Service, Chandigarh to Baddi Taxi Service, Chandigarh to Ramshehar Taxi Service, Chandigarh to Una Taxi Service, Chandigarh to Ghanari Taxi Service, Chandigarh to Haroli Taxi Service, Chandigarh to Amb Taxi Service, Chandigarh to Bangana Taxi Service, Chandigarh to Didihat Taxi Service, Chandigarh to Pithoragarh Taxi Service, Chandigarh to Kashipur Taxi Service, Chandigarh to Udham Singh Nagar Taxi Service, Chandigarh to Kotdwar Taxi Service, Chandigarh to Pauri Garhwal Taxi Service, Chandigarh to Ramnagar Taxi Service, Chandigarh to Nainital Taxi Service, Chandigarh to Ranikhet Taxi Service, Chandigarh to Almora Taxi Service, Chandigarh to Rishikesh Taxi Service, Chandigarh to Dehradun Taxi Service, Chandigarh to Tehri Garhwal Taxi Service, Chandigarh to Pauri Garhwal Taxi Service, Chandigarh to Roorkee Taxi Service, Chandigarh to Haridwar Taxi Service
          </p>
        </div>

      )}

      {/* Modal to show the filtered vans */}
      {showModal && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="w-full h-full relative overflow-y-auto">
            <NavigationBar />
            <button
              onClick={() => setShowModal(false)} // Close the modal
              className="absolute top-1 right-1 text-3xl bg-red-600 text-black px-2"
            >
              X
            </button>

            <h3 className="text-2xl font-semibold p-5 text-white text-center bg-blue-500">
              Vans for Route: {selectedRoute}
            </h3>

            {/* If filtered vans are available, show them */}
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
                        className="cursor-pointer btn btn-yellow bg-yellow-500 text-white py-2 px-4 rounded-lg"
                      >
                        Select Van
                      </Link>
                    </div>


                  </div>
                ))}
              </div>
            ) : (
              <p>No vans available for this route.</p>
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
