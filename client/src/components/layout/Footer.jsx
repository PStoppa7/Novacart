import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-3">

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            NovaCart
          </h2>

          <p className="mt-4 text-gray-400">
            Premium online shopping with quality products,
            fast delivery, and secure payments.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">
            Contact
          </h3>

          <p>support@novacart.com</p>
          <p>Johannesburg, South Africa</p>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400">
        © 2026 NovaCart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;