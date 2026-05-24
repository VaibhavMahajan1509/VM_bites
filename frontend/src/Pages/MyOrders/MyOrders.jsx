import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/user", {
        withCredentials: true,
      });

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setOrders([]); // 
        navigate("/");
      }
    }
  };

  // FIX: refetch + cleanup behavior
  useEffect(() => {
    fetchOrders();

    return () => {
      setOrders([]); // clears old data on unmount
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-sm"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {order.items.map((item, i) => (
                  <span key={i} className="text-sm text-gray-700">
                    {item.foodId?.name} x {item.quantity}
                  </span>
                ))}
              </div>

              <div className="flex justify-between">
                <p className="font-semibold">
                  Total: ₹{order.amount}
                </p>

                <p className="text-orange-500">
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;