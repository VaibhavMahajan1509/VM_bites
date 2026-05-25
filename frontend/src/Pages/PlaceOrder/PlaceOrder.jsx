import React, { useContext, useState } from "react";
import api from "../../config/api";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, resetCart } =
    useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Failed to load Razorpay. Check internet.");
        return;
      }

      // Step 1 — Creating Razorpay order from backend
      const { data } = await api.post("/payment/create-order", {
        amount: getTotalCartAmount() + 2,
      });

      // Step 2 — Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "VM Bites",
        description: "Food Order Payment",
        order_id: data.order.id,
        handler: async function (response) {
          // Step 3 — Payment success, now save order to DB
          const items = food_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => ({
              foodId: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: cartItems[item._id],
            }));

          await api.post(
            "/order/place",
            {
              items,
              amount: getTotalCartAmount() + 2,
              paymentId: response.razorpay_payment_id,
            },
            { withCredentials: true },
          );

          resetCart();
          setFormData({ name: "", email: "", street: "", phone: "" });
          navigate("/myorders");
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#ef4444" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col md:flex-row gap-12 mt-24 px-6 max-w-7xl mx-auto"
    >
      {/* LEFT */}
      <div className="w-full md:max-w-[500px]">
        <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Email"
          required
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Street"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Phone"
          required
        />
      </div>

      {/* RIGHT */}
      <div className="w-full md:max-w-[500px]">
        <h2 className="text-xl font-semibold mb-6">Cart Summary</h2>

        <div className="space-y-3">
          <p>Subtotal: ${getTotalCartAmount()}</p>
          <p>Delivery: $2</p>
          <hr />
          <p className="font-bold">Total: ${getTotalCartAmount() + 2}</p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handlePayment}
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 disabled:opacity-60"
        >
          {loading ? "Processing Payment..." : "PROCEED TO PAYMENT"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
