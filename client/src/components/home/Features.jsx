import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={40} />,
    title: "Free Delivery",
    description: "Free shipping on orders over R1000.",
  },
  {
    icon: <FiShield size={40} />,
    title: "Secure Payments",
    description: "Safe and encrypted checkout every time.",
  },
  {
    icon: <FiRefreshCw size={40} />,
    title: "Easy Returns",
    description: "30-day hassle-free returns.",
  },
  {
    icon: <FiHeadphones size={40} />,
    title: "24/7 Support",
    description: "Our team is here whenever you need help.",
  },
];

function Features() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Why Choose NovaCart?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex justify-center text-blue-600">
                {feature.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;