'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle visibility
  };

  return (
    <div className="container mx-auto px-20 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-orange-500">Frequently Asked Questions (FAQ)</h2>
      </div>
      
      <div className="space-y-4">
        {/* FAQ Item 1 */}
        <div className="bg-white shadow-lg rounded-lg">
          <h3
            className="cursor-pointer flex justify-between items-center px-6 py-4 text-xl font-medium text-gray-800"
            onClick={() => toggleFaq(0)}
          >
            <span>Is the taxi service available 24/7?</span>
            <FontAwesomeIcon
              icon={openIndex === 0 ? faMinus : faPlus}
              className="text-orange-600 ml-auto"
            />
          </h3>
          {openIndex === 0 && (
            <div className="px-6 pb-4 text-gray-600">
              <p>Yes, our taxi service operates 24/7 to ensure that you can book a taxi at any time that suits your travel needs.</p>
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="bg-white shadow-lg rounded-lg">
          <h3
            className="cursor-pointer flex justify-between items-center px-6 py-4 text-xl font-medium text-gray-800"
            onClick={() => toggleFaq(1)}
          >
            <span>How easy is it to book a taxi?</span>
            <FontAwesomeIcon
              icon={openIndex === 1 ? faMinus : faPlus}
              className="text-orange-600 ml-auto"
            />
          </h3>
          {openIndex === 1 && (
            <div className="px-6 pb-4 text-gray-600">
              <p>Very! Our taxi booking form, placed on the top of the page, makes your transfer reservation very simple and easy. You can make a booking in 2 minutes.</p>
            </div>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="bg-white shadow-lg rounded-lg">
          <h3
            className="cursor-pointer flex justify-between items-center px-6 py-4 text-xl font-medium text-gray-800"
            onClick={() => toggleFaq(2)}
          >
            <span>Ways to book a Taxi Service</span>
            <FontAwesomeIcon
              icon={openIndex === 2 ? faMinus : faPlus}
              className="text-orange-600 ml-auto"
            />
          </h3>
          {openIndex === 2 && (
            <div className="px-6 pb-4 text-gray-600">
              <p>You can book a taxi with Sardar Travels. Also, you can go to the simple contact form for booking and fill out the contact form. Or call by phone +91-7696666640.</p>
            </div>
          )}
        </div>

        {/* FAQ Item 4 */}
        <div className="bg-white shadow-lg rounded-lg">
          <h3
            className="cursor-pointer flex justify-between items-center px-6 py-4 text-xl font-medium text-gray-800"
            onClick={() => toggleFaq(3)}
          >
            <span>What if my travel plans change?</span>
            <FontAwesomeIcon
              icon={openIndex === 3 ? faMinus : faPlus}
              className="text-orange-600 ml-auto"
            />
          </h3>
          {openIndex === 3 && (
            <div className="px-6 pb-4 text-gray-600">
              <p>If there are any changes to your travel plans, please contact our customer service as soon as possible. We'll do our best to accommodate your requests, taking into consideration availability and timing.</p>
            </div>
          )}
        </div>

        {/* FAQ Item 5 */}
        <div className="bg-white shadow-lg rounded-lg">
          <h3
            className="cursor-pointer flex justify-between items-center px-6 py-4 text-xl font-medium text-gray-800"
            onClick={() => toggleFaq(4)}
          >
            <span>Can I get the contact details of the driver before my journey?</span>
            <FontAwesomeIcon
              icon={openIndex === 4 ? faMinus : faPlus}
              className="text-orange-600 ml-auto"
            />
          </h3>
          {openIndex === 4 && (
            <div className="px-6 pb-4 text-gray-600">
              <p>Yes, we provide driver details, including their name and contact number, a few hours before your scheduled pick-up time to facilitate smooth communication.</p>
            </div>
          )}
        </div>

        {/* Add more FAQ items as needed */}
      </div>
    </div>
  );
}

export default Faq;
