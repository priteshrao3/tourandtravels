'use client';
import React, { useState, Suspense } from 'react';
import Footer from '../homepage/footer';
import NavigationBar from '../homepage/navigationbar';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function VanBooking() {
    // Wrap the code that uses useSearchParams with Suspense
    const searchParams = useSearchParams();
    
    // Extract query parameters
    const fromCity = searchParams.get('from_city') || '[City Name]';
    const toCity = searchParams.get('to_city') || '[City Name]';
    const vanName = searchParams.get('van_name') || '[Van Name]';
    const fare = searchParams.get('fare') || '[Price]';

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        pickup_address: '',
        date: '',
        time: '',
        message: '',
        from_city: fromCity,  // added to send with the form
        to_city: toCity,      // added to send with the form
        van_name: vanName,    // added to send with the form
        fare: fare,           // added to send with the form
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            pickup_address: formData.pickup_address,
            pickup_date: formData.date,   // already a string
            pickup_time: formData.time,   // already a string
            message: formData.message,
            from_city: formData.from_city,
            to_city: formData.to_city,
            van_name: formData.van_name,
            fare: parseFloat(formData.fare), // Ensure fare is a valid number
        };

        setLoading(true);  // Start loading indicator
        try {
            const response = await axios.post('https://travelboking.pythonanywhere.com/api/van-booking/', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                setSuccess('Booking submitted successfully!');
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    pickup_address: '',
                    date: '',
                    time: '',
                    message: '',
                    from_city: fromCity,
                    to_city: toCity,
                    van_name: vanName,
                    fare: fare,
                });
            } else {
                setError('Failed to submit: ' + JSON.stringify(response.data));
            }
        } catch (error) {
            console.error('Error submitting the form:', error.response ? error.response.data : error.message);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);  // Stop loading indicator
        }
    };

    return (
        <div>
            <NavigationBar />

            <h2 className="text-2xl font-bold p-4 text-center text-black bg-blue-500">
                {vanName} Booking From {fromCity} to {toCity} One-Way Trip
            </h2>

            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg md:w-[30em]">
                    <h2 className="text-2xl font-bold mb-4 text-black text-center">
                        {vanName} Booking From {fromCity} to {toCity} One-Way Trip
                    </h2>

                    {/* Van Details */}
                    <p className="text-black">
                        <strong className="mr-2">Going From:</strong>
                        <span className="float-right">{fromCity}</span>
                    </p>
                    <p className="text-black">
                        <strong className="mr-2">Going To:</strong>
                        <span className="float-right">{toCity}</span>
                    </p>
                    <p className="text-black">
                        <strong className="mr-2">Selected Van:</strong>
                        <span className="float-right">{vanName}</span>
                    </p>
                    <p className="text-black">
                        <strong className="mr-2">Price:</strong>
                        <span className="float-right">₹{fare} Inc. of Taxes*</span>
                    </p>

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-7">
                            <label htmlFor="name" className="block text-sm font-medium text-black">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="block text-sm font-medium text-black">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="block text-sm font-medium text-black">
                                Pick Up Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="time" className="block text-sm font-medium text-black">
                                Pick Up Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pickup_address" className="block text-sm font-medium text-black">
                                Pick Up Address
                            </label>
                            <input
                                type="text"
                                id="pickup_address"
                                name="pickup_address"
                                value={formData.pickup_address}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-medium text-black">
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="block text-sm font-medium text-black">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg text-black"
                                rows="4"
                            />
                        </div>

                        {loading ? (
                            <button type="button" className="w-full bg-blue-500 text-white py-2 rounded-lg" disabled>
                                Loading...
                            </button>
                        ) : (
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
                                Submit
                            </button>
                        )}
                    </form>

                    {error && <p className="text-red-500 mt-3">{error}</p>}
                    {success && <p className="text-green-500 mt-3 text-center">{success}</p>}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function WrappedVanBooking() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VanBooking />
        </Suspense>
    );
}
