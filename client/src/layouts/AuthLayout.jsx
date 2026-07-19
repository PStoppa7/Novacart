import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2000&q=80",
    title: "Discover Premium Electronics",
    subtitle:
      "Shop the latest phones, laptops, accessories and more.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2000&q=80",
    title: "Fashion That Fits Your Lifestyle",
    subtitle:
      "Upgrade your wardrobe with trending collections.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2000&q=80",
    title: "Luxury Watches & Accessories",
    subtitle:
      "Timeless style for every occasion.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=80",
    title: "Feel Every Beat",
    subtitle:
      "Premium headphones for music lovers.",
  },
];

export default function AuthLayout() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ${
            current === index
              ? "opacity-100 scale-110"
              : "opacity-0 scale-100"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />

      {/* Glow */}
      <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/30 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[150px]" />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div className="grid w-full max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* Left Hero */}
          <div className="hidden lg:block animate-[fadeIn_1s_ease] text-white">

            <div className="inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-xl">
              Premium Online Shopping
            </div>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight">
              {slides[current].title}
            </h1>

            <p className="mt-6 max-w-xl text-xl leading-9 text-gray-200">
              {slides[current].subtitle}
            </p>

            <div className="mt-12 flex gap-12">

              <div>
                <h2 className="text-4xl font-bold">
                  10K+
                </h2>

                <p className="text-gray-300">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">
                  500+
                </h2>

                <p className="text-gray-300">
                  Premium Products
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">
                  24/7
                </h2>

                <p className="text-gray-300">
                  Support
                </p>
              </div>

            </div>

          </div>

          {/* Login Card */}
          <div className="flex justify-center">

            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-3xl animate-[slideUp_.8s_ease]">

              <div className="mb-8 text-center">

                <h1 className="text-5xl font-extrabold text-white">
                  NovaCart
                </h1>

                <p className="mt-3 text-gray-200">
                  Welcome back.
                  Sign in to continue shopping.
                </p>

              </div>

              <Outlet />
                          </div>

          </div>

        </div>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">

        {slides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-500 rounded-full ${
              current === index
                ? "w-12 h-3 bg-white"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          />

        ))}

      </div>

      {/* Floating Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[10%] top-[20%] h-5 w-5 animate-bounce rounded-full bg-white/20" />

        <div className="absolute left-[80%] top-[15%] h-4 w-4 animate-pulse rounded-full bg-blue-300/30" />

        <div className="absolute bottom-[15%] left-[20%] h-8 w-8 animate-pulse rounded-full bg-purple-400/20" />

        <div className="absolute right-[15%] top-[60%] h-6 w-6 animate-bounce rounded-full bg-white/20" />

      </div>

      <style>{`

        @keyframes slideUp{
          from{
            opacity:0;
            transform:translateY(50px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateX(-40px);
          }

          to{
            opacity:1;
            transform:translateX(0);
          }
        }

      `}</style>

    </div>
  );
}