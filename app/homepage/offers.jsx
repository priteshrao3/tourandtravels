import React from 'react';

function Offers() {
  // Sample offers data
  const offers = [
    {
      id: 1,
      title: 'Summer Sale!',
      description: 'Get up to 50% off on all travel packages. Limited time offer.',
      image: '/1717137875taxi_call__11 [Converted]-01.jpg',
      link: '/offers/summer-sale'
    },
    {
      id: 2,
      title: 'Family Package Deal',
      description: 'Enjoy a special discount on family travel packages this month.',
      image: '/1717137826taxi_call__11 [Converted]-02.jpg',
      link: '/offers/family-package'
    },
    {
      id: 3,
      title: 'Weekend Getaway',
      description: 'Book your weekend trip now and save 30%. Hurry, offer ends soon!',
      image: '/1717137851taxi_call__11 [Converted]-03.jpg',
      link: '/offers/weekend-getaway'
    }
  ];

  return (
    <div className="md:py-12 md:px-20 bg-gray-100">
      <div className="text-center mb-10">
        <h2 className="md:text-4xl text-2xl font-bold text-orange-400">Exclusive Offers Just for You</h2>
        <p className="md:text-lg text-black mt-4 md:px-20">
          Take advantage of our limited-time offers to make your travels even more affordable and enjoyable. Explore these amazing deals now!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            {/* Title at the top */}
            <h3 className="text-xl font-semibold text-black text-center mb-4">{offer.title}</h3>

            {/* Image in the center with some padding */}
            <div className="w-full h-48 overflow-hidden mb-4">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Description centered below the image */}
            <p className="text-gray-600 text-center mt-2">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
