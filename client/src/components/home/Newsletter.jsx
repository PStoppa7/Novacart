function Newsletter() {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-4 text-lg">
          Subscribe to receive exclusive deals and new arrivals.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg px-4 py-3 text-gray-900 outline-none"
          />

          <button className="rounded-lg bg-black px-8 py-3 font-semibold transition hover:bg-gray-800">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;