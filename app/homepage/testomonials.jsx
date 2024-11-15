import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Satisfied Customer',
      feedback: 'This service was amazing! The team was very professional, and the booking process was smooth. I highly recommend them!',
      rating: 5,
      image: '/170195302763883_149161595123144_2468995_n.jpg' // Add an image path for each testimonial
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Happy Client',
      feedback: 'Great experience! The van was clean and comfortable, and the driver was very friendly. I will definitely use this service again.',
      rating: 4,
      image: '/170195302763883_149161595123144_2468995_n.jpg' // Add an image path for each testimonial
    },
    {
      id: 3,
      name: 'Michael Brown',
      title: 'Excellent Service',
      feedback: 'Booking was easy, and the ride was comfortable. I had a wonderful experience with this travel service.',
      rating: 5,
      image: '/170195302763883_149161595123144_2468995_n.jpg' // Add an image path for each testimonial
    }
  ];

  return (
    <div className="py-10 px-6 bg-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-orange-400">Travels Customer Reviews Real Experiences, Real Satisfaction</h2>
        <p className="text-lg text-black mt-4 md:px-20">
          Curious about the Sardar Travels experience? Hear it straight from our passengers. Discover genuine reviews that showcase the satisfaction, comfort, and reliability they've found in our service. Each ride is more than a journey; it's a testament to our commitment to excellence. Join the chorus of happy travelers who have chosen Sardar Travels for their unforgettable rides.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 lg:w-96 text-center"> {/* Centering the text inside the card */}
            {/* Image of the customer */}
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="mb-4">
              <div className="text-xl font-semibold text-blue-700">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.title}</div>
            </div>
            <p className="text-gray-700 mb-4">{testimonial.feedback}</p>
            <div className="flex justify-center gap-1 text-yellow-500">
              {[...Array(testimonial.rating)].map((_, index) => (
                <span key={index} className="text-xl">★</span>
              ))}
              {[...Array(5 - testimonial.rating)].map((_, index) => (
                <span key={index} className="text-xl text-gray-300">★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
