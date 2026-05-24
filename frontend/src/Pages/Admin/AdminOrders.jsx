// AdminOrders.jsx

import React, { useEffect, useState } from "react";
import api from "../../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {

      setLoading(true);

      const res = await api.get("/admin/orders");

      setOrders(res.data || []);

    } catch (error) {

      console.log("Fetch Orders Error:", error);

      setOrders([]);

    } finally {

      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    try {

      await api.put(`/admin/orders/${orderId}`, {
        status,
      });

      fetchOrders();

    } catch (error) {

      console.log("Update Status Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">

        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-600 text-lg font-medium">
            Loading orders...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="flex flex-col gap-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white p-4 sm:p-5 rounded shadow border"
            >

              {/* USER INFO */}
              <div className="mb-4 break-words">

                <p>
                  <span className="font-semibold">
                    Customer:
                  </span>{" "}
                  {order.userId?.name}
                </p>

                <p>
                  <span className="font-semibold">
                    Email:
                  </span>{" "}
                  {order.userId?.email}
                </p>

              </div>

              {/* ITEMS */}
              <div className="mb-4">

                <p className="font-semibold mb-3">
                  Items:
                </p>

                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3 text-center sm:text-left"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded shrink-0"
                    />

                    <div>

                      <p className="break-words">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              {/* ORDER INFO */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">

                <div>

                  <p>
                    <span className="font-semibold">
                      Total:
                    </span>{" "}
                    ₹{order.amount}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Status:
                    </span>{" "}
                    {order.status}
                  </p>

                </div>

                {/* STATUS UPDATE */}
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-2 rounded w-full sm:w-52"
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="processing">
                    Processing
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>

                </select>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default AdminOrders;