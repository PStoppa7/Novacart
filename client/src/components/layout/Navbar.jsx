import { Link, NavLink } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function Navbar() {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

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

        {/* Right Icons */}
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

          {/* User */}
          <Link to="/login">
            <FiUser
              size={22}
              className="cursor-pointer"
            />
          </Link>

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