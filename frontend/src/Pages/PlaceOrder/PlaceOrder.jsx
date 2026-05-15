import React, { useContext, useState } from "react";
import api from "../../config/api";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    cartItems,
    food_list,
    resetCart,
  } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const items = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          foodId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        items,
        amount: getTotalCartAmount() + 2,
      };

      await api.post("/order/place", orderData, {
        withCredentials: true,
      });

      resetCart();
      navigate("/myorders");
    } catch (error) {
      console.log(error);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={placeOrderHandler}
      className="flex flex-col md:flex-row gap-12 mt-24 px-6 max-w-7xl mx-auto"
    >
      {/* LEFT */}
      <div className="w-full md:max-w-[500px]">
        <h2 className="text-2xl font-semibold mb-6">
          Delivery Information
        </h2>

        <input
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Name"
          required
        />
        <input
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Email"
          required
        />
        <input
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Street"
          required
        />
        <input
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Phone"
          required
        />
      </div>

      {/* RIGHT */}
      <div className="w-full md:max-w-[500px]">
        <h2 className="text-xl font-semibold mb-6">
          Cart Summary
        </h2>

        <div className="space-y-3">
          <p>Subtotal: ${getTotalCartAmount()}</p>
          <p>Delivery: $2</p>
          <hr />
          <p className="font-bold">
            Total: ${getTotalCartAmount() + 2}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 disabled:opacity-60"
        >
          {loading ? "Placing Order..." : "PLACE ORDER"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;