'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Satisfied Customer',
      feedback: 'This service was amazing! The team was very professional, and the booking process was smooth. I highly recommend them!',
      rating: 5,
      image: '/170195302763883_149161595123144_2468995_n.jpg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Happy Client',
      feedback: 'Great experience! The van was clean and comfortable, and the driver was very friendly. I will definitely use this service again.',
      rating: 4,
      image: '/170195302763883_149161595123144_2468995_n.jpg'
    },
    {
      id: 3,
      name: 'Michael Brown',
      title: 'Excellent Service',
      feedback: 'Booking was easy, and the ride was comfortable. I had a wonderful experience with this travel service.',
      rating: 5,
      image: '/170195302763883_149161595123144_2468995_n.jpg'
    },
    {
      id: 4,
      name: 'Michael Brown',
      title: 'Excellent Service',
      feedback: 'Booking was easy, and the ride was comfortable. I had a wonderful experience with this travel service.',
      rating: 6,
      image: '/170195302763883_149161595123144_2468995_n.jpg'
    },
    {
      id: 5,
      name: 'Michael Brown',
      title: 'Excellent Service',
      feedback: 'Booking was easy, and the ride was comfortable. I had a wonderful experience with this travel service.',
      rating: 7,
      image: '/170195302763883_149161595123144_2468995_n.jpg'
    }
  ];

  return (
    <div className="py-10 md:px-20 px-2 bg-gray-100 ">
      <div className="text-center mb-10">
        <h2 className="md:text-4xl text-2xl font-bold text-orange-400">Travels Customer Reviews Real Experiences, Real Satisfaction</h2>
        <p className="md:text-lg text-black mt-4 md:px-20">
          Curious about the Sardar Travels experience? Hear it straight from our passengers. Discover genuine reviews that showcase the satisfaction, comfort, and reliability they've found in our service. Each ride is more than a journey; it's a testament to our commitment to excellence. Join the chorus of happy travelers who have chosen Sardar Travels for their unforgettable rides.
        </p>
      </div>

      {/* Swiper Container */}
      <Swiper
        spaceBetween={50} // Space between slides
        slidesPerView={1} // Default to 1 slide visible
        loop={true} // Enable looping of slides
        autoplay={{ delay: 3000 }} // Auto slide every 3 seconds
        breakpoints={{
          320: {
            slidesPerView: 1, // 1 slide on mobile
          },
          768: {
            slidesPerView: 2, // 2 slides on medium screens
          },
          1024: {
            slidesPerView: 3, // 3 slides on large screens
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
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
                {[...Array(Math.min(testimonial.rating, 5))].map((_, index) => (
                  <span key={index} className="text-xl">★</span>
                ))}
                {[...Array(5 - Math.min(testimonial.rating, 5))].map((_, index) => (
                  <span key={index} className="text-xl text-gray-300">★</span>
                ))}
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonials;
