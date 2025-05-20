import mediCheckImg from "../../assets/MediCheck.png";
import { motion } from "framer-motion";

export default function ProductSlider() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Digital Thermometer",
      price: "₹599",
      image: mediCheckImg,
      offer: "20% OFF",
    },
    {
      id: 2,
      name: "Blood Pressure Rate",
      price: "₹1,299",
      image: mediCheckImg,
      offer: "15% OFF",
    },
    {
      id: 3,
      name: "Oxygen Concentrator",
      price: "₹45,999",
      image: mediCheckImg,
      offer: "EMI",
    },
    {
      id: 4,
      name: "Nebulizer Kit",
      price: "₹2,499",
      image: mediCheckImg,
      offer: "Bundle",
    },
    {
      id: 5,
      name: "Pulse Oximeter",
      price: "₹899",
      image: mediCheckImg,
      offer: "10% OFF",
    },
    {
      id: 6,
      name: "Glucometer",
      price: "₹1,499",
      image: mediCheckImg,
      offer: "Special",
    },
    {
      id: 7,
      name: "Stethoscope",
      price: "₹799",
      image: mediCheckImg,
      offer: "Best",
    },
  ];

  return (
    <div className="py-6 px-2 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-bold text-gray-900">Featured Medical Products</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -3, scale: 1.03 }}
              className="min-w-[320px] max-w-[320px] bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex-shrink-0 flex items-center h-[90px]"
            >
              <div className="flex-shrink-0 mr-3">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded-md border" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-base truncate mr-2">{product.name}</h3>
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">{product.offer}</span>
                </div>
                <p className="text-base font-bold text-blue-600 mb-1">{product.price}</p>
                <button className="w-fit bg-blue-50 text-blue-600 py-1 px-3 rounded font-medium hover:bg-blue-100 text-xs self-start">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
// .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }
