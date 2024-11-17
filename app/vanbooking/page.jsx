'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../homepage/footer';
import NavigationBar from '../homepage/navigationbar';

function VanBooking() {
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
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            from_city: fromCity,
            to_city: toCity,
            van_name: vanName,
            fare,
        };

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('https://travelboking.pythonanywhere.com/van-booking/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setSuccess('Booking submitted successfully!');
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    pickup_address: '',
                    date: '',
                    time: '',
                    message: '',
                });
            } else {
                const errorData = await response.json();
                setError('Failed to submit: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=' '>
            <NavigationBar />
            {/* Heading for the trip details */}
            <h2 className="text-2xl font-bold p-4 text-center text-white bg-blue-500">
                {vanName} Booking From {fromCity} to {toCity} One-Way Trip
            </h2>

            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg md:w-[40em]">


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
                        <strong className="mr-2">Selected Car:</strong>
                        <span className="float-right">{vanName}</span>
                    </p>
                    <p className="text-black">
                        <strong className="mr-2">Price:</strong>
                        <span className="float-right">₹{fare} Inc. of Taxes*</span>
                    </p>


                    {/* Form Feedback */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-5">
                            <label htmlFor="name" className="block text-sm font-medium text-black">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
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
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
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
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
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
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
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
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
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
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
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
                                className="w-full p-1.5 mt-1 border border-gray-300 rounded-lg"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default VanBooking;
