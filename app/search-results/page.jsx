"use client";

import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NavigationBar from '../homepage/navigationbar';
import Features from '../homepage/features';
import Faq from '../homepage/faq';
import Footer from '../homepage/footer';
import SearchPage from '../homepage/searchpage';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [vans, setVans] = useState([]);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const res = await axios.get('https://travelboking.pythonanywhere.com/vans/');
        const filteredVans = res.data.filter(van =>
          van.from_city === searchParams.get('fromCity') &&
          van.to_city === searchParams.get('toCity')
        );

        setVans(filteredVans);
      } catch (error) {
        console.error('Error fetching vans:', error);
      }
    };

    fetchVans();
  }, [searchParams]);

  if (!vans || vans.length === 0) {
    return (
      <div className="text-center p-5">
        <p className="font-bold text-3xl text-red-700">No vans available for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="text-black">
      <NavigationBar />
      <SearchPage />
      
      <div className="text-center py-5 pt-10 bg-blue-100">
        <h2 className="md:text-4xl text-2xl text-orange-400 font-bold capitalize">
          {vans[0].from_city} To: {vans[0].to_city}
        </h2>
      </div>

      <div className="flex flex-wrap gap-6 md:px-40 bg-blue-100 py-5">
        {vans.map((van) => (
          <div key={van.id} className="md:flex flex-col md:flex-row w-full p-4 bg-white shadow-lg rounded-lg">
            <div className="taxi-list-left flex-shrink-0 w-full md:w-1/6 flex justify-center mb-4 md:mb-0">
              <img
                src={`https://travelboking.pythonanywhere.com${van.image}`}
                alt={van.van_name}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="taxi-type flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
              <span className="text-lg">
                <span className="font-bold text-black">Car Type</span> <br /> {van.van_name} <br /> 
                <span className="font-bold text-blue-500">More Details</span>
              </span>
            </div>

            <div className="taxi-luggage flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
              <i className="fa fa-suitcase-rolling text-gray-600"></i>
              <span>{van.luggage} Luggage</span>
            </div>

            <div className="taxi-seats flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
              <i className="fa fa-user-tie text-gray-600"></i>
              <span>{van.seats} Seats</span>
            </div>

            <div className="taxi-price flex items-center justify-center w-full md:w-1/6 mb-4 md:mb-0">
              <div className="text-lg font-bold text-green-600">
                <b itemProp="priceCurrency" content="USD">₹{van.fare}</b> <span className="text-sm">Inc. of Taxes*</span>
              </div>
            </div>

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

      <div className='mt-5'></div>
      <p className='text-orange-400 font-bold text-3xl text-center p-5'>Visitors Guide</p>
      <p className='text-orange-400 font-bold text-3xl text-center p-5'>Terms & Condition</p>

      <Features />
      <Faq />
      <Footer />
    </div>
  );
};

// Wrap in Suspense
const SearchResultsPage = () => (
  <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
    <SearchResults />
  </Suspense>
);

export default SearchResultsPage;
