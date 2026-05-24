import React from "react";
import axios from "axios";

const PaymentButton = ({ totalAmount, onSuccess }) => {
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
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Failed to load Razorpay. Check your internet.");
      return;
    }

    try {
      const { data } = await axios.post("/api/payment/create-order", {
        amount: totalAmount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "VM Bites 🍕",
        description: "Food Order Payment",
        order_id: data.order.id,
        handler: function (response) {
          // Payment success!
          alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
          onSuccess && onSuccess(response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#f97316" }, // Tailwind orange-500 🍊
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
    >
      Pay ₹{totalAmount} with Razorpay
    </button>
  );
};

export default PaymentButton;