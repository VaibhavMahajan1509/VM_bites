import React, { useEffect, useState } from "react";
import api from "../../config/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ORDERS =================
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
  // ================= UPDATE STATUS =================
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

  if (loading) {
    return <h1 className="p-6">Loading...</h1>;
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="flex flex-col gap-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white p-5 rounded shadow border"
            >

              {/* USER INFO */}
              <div className="mb-3">
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
              <div className="mb-3">

                <p className="font-semibold mb-2">
                  Items:
                </p>

                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 mb-2"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />

                    <div>
                      <p>{item.name}</p>

                      <p className="text-sm text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              {/* ORDER INFO */}
              <div className="flex items-center justify-between mt-4">

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
                  className="border p-2 rounded"
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