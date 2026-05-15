import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import LoginPopup from "./Component/LoginPopup/LoginPopup";

import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import MyOrders from "./Pages/MyOrders/MyOrders";

import AdminDashboard from "./Pages/Admin/AdminDashboard";

import api from "./config/api";

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ================= CURRENT USER =================
  useEffect(() => {

    const fetchUser = async () => {
      try {

        const res = await api.get(
          "/auth/me",
          {
            withCredentials: true,
          }
        );

        setUser(res.data.user);

      } catch (error) {

        setUser(null);

      } finally {

        setLoading(false);

      }
    };

    fetchUser();

  }, []);

  // ================= ADMIN PROTECTION =================
  const AdminRoute = ({ children }) => {

    if (loading) {
      return (
        <div className="mt-24 text-center">
          Loading...
        </div>
      );
    }

    // not logged in
    if (!user) {
      return <Navigate to="/" />;
    }

    // not admin
    if (user.role !== "admin") {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <>

      {/* LOGIN POPUP */}
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setUser={setUser}
        />
      )}

      <div className="app min-h-screen">

        {/* NAVBAR */}
        <Navbar
          setShowLogin={setShowLogin}
          user={user}
          setUser={setUser}
        />

        {/* ROUTES */}
        <Routes>

          {/* ================= USER ROUTES ================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/order"
            element={<PlaceOrder />}
          />

          <Route
            path="/myorders"
            element={<MyOrders />}
          />

          {/* ================= ADMIN ROUTE ================= */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

        </Routes>

      </div>

      {/* FOOTER */}
      <Footer />

    </>
  );
};

export default App;