import React from "react";

const Shop = () => {
  // Sample medical products data
  const medicalProducts = [
    {
      id: 4,
      name: "Oximeter",
      description: "Blood oxygen saturation monitor",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Medical Gloves",
      description: "Box of 100 latex-free examination gloves",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Face Masks",
      description: "Pack of 50 surgical masks",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 1,
      name: "Digital Thermometer",
      description: "Fast and accurate temperature measurement",
      price: 24.99,
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 2,
      name: "Blood Pressure Monitor",
      description: "Automatic blood pressure cuff ",
      price: 89.99,
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 3,
      name: "First Aid Kit",
      description: "Comprehensive medical emergency kit",
      price: 34.99,
      image: "https://picsum.photos/300/200?random=2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Supplies Shop</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted source for high-quality medical products and healthcare essentials
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicalProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
