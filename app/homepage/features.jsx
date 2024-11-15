import React from 'react';

function Features() {
  return (
    <div className="container mx-auto p-6 md:px-28">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">Features & Benefits of Taxi-Booking</h1>
      
      <p className="text-lg mb-6 text-black text-center px-20">
        In today s emerging tech world, human life is getting multiple services at the doorstep—from online food delivery to taxi booking through online platforms. People prefer services that require less interaction and can be managed directly from their smart devices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 24/7 Support */}
        <div className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg">
          <img src="/17019452761623747468support.png" alt="24/7 Support" className="w-16 h-16 object-cover" />
          <div>
            <h2 className="text-2xl font-semibold text-black">24/7 Support</h2>
            <p className="text-black">
              We accompany you both during and after the journey. If assistance is required, we are at your beck and call, ready to assist you at any point in your travel.
            </p>
          </div>
        </div>

        {/* Clean and Hygienic Car */}
        <div className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg">
          <img src="/1701945587Clean-car.png" alt="Clean and Hygienic Car" className="w-16 h-16 object-cover" />
          <div>
            <h2 className="text-2xl font-semibold text-black">Clean and Hygienic Car</h2>
            <p className="text-black">
              We commit to regular and thorough cleaning of our vehicles, ensuring that every ride is in a sanitized environment. This includes the disinfection of commonly touched surfaces.
            </p>
          </div>
        </div>
        
        {/* Expert Chauffeurs */}
        <div className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg">
          <img src="/1701945520taxi-driver.png" alt="Expert Chauffeurs" className="w-16 h-16 object-cover" />
          <div>
            <h2 className="text-2xl font-semibold text-black">Expert Chauffeurs</h2>
            <p className="text-black">
              Our chauffeurs are well-experienced and knowledgeable about routes, traffic patterns, and efficient navigation, ensuring that you reach your destination safely and on time.
            </p>
          </div>
        </div>

        {/* Zero Cancellation Charges */}
        <div className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-lg">
          <img src="/1702460918Zero-cancellation-charges.png" alt="Zero Cancellation Charges" className="w-16 h-16 object-cover" />
          <div>
            <h2 className="text-2xl font-semibold text-black">Zero Cancellation Charges</h2>
            <p className="text-black">
              Our zero cancellation charges policy offers flexibility for travelers. It enhances convenience by ensuring no penalties if you need to make changes to your plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
