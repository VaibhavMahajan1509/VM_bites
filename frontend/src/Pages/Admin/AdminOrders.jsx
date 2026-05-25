import React, { useEffect, useState } from "react";
import api from "../../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.log("Update Status Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Admin Orders
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="grid gap-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="break-words">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      Customer Details
                    </h2>
                    <p className="text-gray-700">
                      <span className="font-medium">Customer:</span>{" "}
                      {order.userId?.name}
                    </p>
                    <p className="text-gray-700 break-words">
                      <span className="font-medium">Email:</span>{" "}
                      {order.userId?.email}
                    </p>
                  </div>

                  <div className="min-w-[160px]">
                    <p className="text-sm text-gray-500 mb-2">Status</p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-3 text-gray-900">Items</p>
                  <div className="grid gap-3">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-xl bg-gray-50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shrink-0 border border-gray-200"
                        />
                        <div className="text-center sm:text-left">
                          <p className="font-medium text-gray-900 break-words">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                  <div className="text-gray-800">
                    <p>
                      <span className="font-semibold">Total:</span> ₹
                      {order.amount}
                    </p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-gray-300 bg-white p-3 rounded-lg w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;