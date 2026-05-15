import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import api from "../../config/api";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin, setUser }) => {
  const [currState, setCurrState] = useState("Login");
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
        currState === "Sign Up"
          ? "/auth/signup"
          : "/auth/login";

      const response = await api.post(url, data, {
        withCredentials: true,
      });

      alert(response.data.message);

      // IMPORTANT: wait a bit for cookie to settle
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
    <div className="fixed z-10 w-full h-full bg-black/60 grid">
      <form
        onSubmit={onSubmitHandler}
        className="place-self-center w-[330px] bg-white flex flex-col gap-5 p-6 rounded"
      >
        {/* HEADER */}
        <div className="flex justify-between">
          <h2 className="font-semibold">{currState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            className="w-4 cursor-pointer"
          />
        </div>

        {currState === "Sign Up" && (
          <input
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={onChangeHandler}
            className="border p-2"
            required
          />
        )}

        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={onChangeHandler}
          className="border p-2"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandler}
          className="border p-2"
          required
        />

        <button className="bg-red-500 text-white p-2">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p
          onClick={() =>
            setCurrState(currState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer text-sm text-center"
        >
          {currState === "Login"
            ? "Create new account"
            : "Already have account?"}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;