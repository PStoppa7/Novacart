import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            Discover Your Next Favorite Product
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Shop the latest collections with fast delivery, secure checkout,
            and premium quality products.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
        </div>

        <div className="mt-12 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
            alt="Featured Product"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;