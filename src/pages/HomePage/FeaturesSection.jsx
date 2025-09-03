import {
  VideoCameraIcon,
  ChatIcon,
  BeakerIcon,
  TruckIcon,
} from "@heroicons/react/outline";

export default function FeaturesSection() {
  const features = [
    {
      icon: VideoCameraIcon,
      title: "Video Consultations",
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      icon: ChatIcon,
      title: "Instant Messaging",
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      icon: BeakerIcon,
      title: "Digital Prescriptions",
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      icon: TruckIcon,
      title: "Medicine Delivery",
      color: "bg-pink-100",
      textColor: "text-pink-600",
    },
  ];

  return (
    <>
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Explore Our Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 ${feature.color} rounded-full mb-4`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Secure and seamless integration with our healthcare network
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
