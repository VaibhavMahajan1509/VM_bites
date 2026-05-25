import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import api from "../../config/api";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin, setUser }) => {
  const [currState, setCurrState] = useState("Log in");
  const { fetchCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url =
        currState === "Create account" ? "/auth/signup" : "/auth/login";

      const response = await api.post(url, data, {
        withCredentials: true,
      });

      alert(response.data.message);

      setTimeout(() => {
        fetchCart();
      }, 200);

      setUser(response.data.user);

      setData({
        name: "",
        email: "",
        password: "",
      });

      setShowLogin(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] grid p-4">
      <form
        onSubmit={onSubmitHandler}
        className="place-self-center w-full max-w-[420px] bg-white flex flex-col gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl shadow-2xl border border-gray-100"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {currState}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {currState === "Create account"
                ? "Join us today"
                : "Welcome back"}
            </p>
          </div>

          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            className="w-4 sm:w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
            alt="Close"
          />
        </div>

        {currState === "Create account" && (
          <input
            name="name"
            placeholder="Full name"
            value={data.name}
            onChange={onChangeHandler}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            required
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={data.email}
          onChange={onChangeHandler}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandler}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          required
        />

        <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-medium transition duration-200 shadow-sm">
          {currState === "Create account" ? "Create account" : "Log in"}
        </button>

        <p
          onClick={() =>
            setCurrState(currState === "Log in" ? "Create account" : "Log in")
          }
          className="cursor-pointer text-sm text-center text-gray-600 hover:text-red-500 transition"
        >
          {currState === "Log in"
            ? "Create an account"
            : "Already have an account?"}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;