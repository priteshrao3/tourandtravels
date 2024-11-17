'use client';
import React, { useState } from 'react';
import Footer from '../homepage/footer';
import NavigationBar from '../homepage/navigationbar';

function VanBooking({ fromCity, toCity, vanName, fare }) {
    // State for the form data
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        date: '',
        time: ''
    });

    // State for form submission status
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulating a form submission (replace with your API call)
        setTimeout(() => {
            setLoading(false);
            setSuccess('Booking request submitted successfully!');
            // Reset form data after successful submission
            setFormData({
                name: '',
                mobile: '',
                date: '',
                time: ''
            });
        }, 2000);
    };

    return (
        <div>
            <NavigationBar />

            {/* Heading for the trip details */}
            <h2 className="text-2xl font-bold p-4 text-center text-white bg-blue-500">
                {vanName} Booking From {fromCity} to {toCity} One-Way Trip
            </h2>

            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg md:w-[40em]">

                    {/* Form Feedback */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
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
