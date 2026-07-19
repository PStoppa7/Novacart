import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout, isAdmin } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          NovaCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden gap-8 md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/">Categories</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Wishlist */}
          <Link to="/wishlist">
            <div className="relative cursor-pointer">
              <FiHeart size={22} />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {wishlistItems.length}
              </span>
            </div>
          </Link>

          {/* Cart */}
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <FiShoppingCart size={22} />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItems.length}
              </span>
            </div>
          </Link>

          {/* Logged In */}
          {user ? (
            <div className="flex items-center gap-3">

              {isAdmin && (
                <Link
                  to="/admin"
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Admin
                </Link>
              )}

            <Link
  to="/account"
  className="rounded-lg px-3 py-2 font-medium transition hover:bg-gray-100 hover:text-blue-600"
>
  My Account
</Link>

              <Link
                to="/my-orders"
                className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                My Orders
              </Link>

              <div className="hidden items-center gap-2 md:flex">
                <FiUser size={20} />
                <span className="font-medium">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link to="/login">
              <FiUser
                size={22}
                className="cursor-pointer hover:text-blue-600"
              />
            </Link>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden">
            <FiMenu size={24} />
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;