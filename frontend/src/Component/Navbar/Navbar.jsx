import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import api from "../../config/api";

const Navbar = ({ setShowLogin, user, setUser }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const { getTotalCartAmount, resetCart } = useContext(StoreContext);

// logout
const logoutHandler = async () => {
  try {
    await api.post("/auth/logout");
  } catch {}

  setUser(null);
  resetCart();   
  navigate("/");
};

  return (
    <nav className="bg-white shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img src={assets.logo1} className="w-28" alt="logo" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-red-500">Home</Link>
          </li>
          <li>
            <a href="#menu" className="hover:text-red-500">Menu</a>
          </li>
          <li>
            <a href="#footer" className="hover:text-red-500">Contact</a>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CART */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
          >
            <img src={assets.basket_icon} className="w-6" alt="cart" />

            {getTotalCartAmount() > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>

          {/* AUTH */}
          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <div className="flex items-center gap-4">

                <Link to="/myorders" className="text-sm hover:text-red-500">
                  My Orders
                </Link>

                {/* ADMIN */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm font-semibold hover:text-red-500"
                  >
                    Admin Panel
                  </Link>
                )}

                <span className="text-sm font-medium">
                  {user.name}
                </span>

                <button
                  onClick={logoutHandler}
                  className="text-sm border px-4 py-1.5 rounded hover:bg-gray-100"
                >
                  Logout
                </button>

              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="border px-5 py-2 rounded hover:bg-gray-100"
              >
                Sign In
              </button>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-5 flex flex-col gap-4 text-lg">

          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#footer" onClick={() => setMobileMenuOpen(false)}>Contact</a>

          {user && (
            <>
              <Link to="/myorders" onClick={() => setMobileMenuOpen(false)}>
                My Orders
              </Link>

              {user?.role === "admin" && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="text-red-600 text-left"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <button
              onClick={() => {
                setShowLogin(true);
                setMobileMenuOpen(false);
              }}
            >
              Sign In
            </button>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;