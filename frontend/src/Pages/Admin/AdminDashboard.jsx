import React, { useState } from "react";

import AdminOrders from "./AdminOrders";
import AdminFoods from "./AdminFoods";

const AdminDashboard = () => {
  const [tab, setTab] = useState("orders");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-full lg:w-[250px] bg-gray-900 text-white p-4 sm:p-5 lg:min-h-screen">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
          Admin Panel
        </h1>

        <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          <button
            onClick={() => setTab("orders")}
            className={`min-w-[120px] lg:min-w-0 p-3 rounded-lg text-center lg:text-left transition duration-200 ${
              tab === "orders"
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-800 hover:bg-gray-700 text-gray-200"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setTab("foods")}
            className={`min-w-[120px] lg:min-w-0 p-3 rounded-lg text-center lg:text-left transition duration-200 ${
              tab === "foods"
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-800 hover:bg-gray-700 text-gray-200"
            }`}
          >
            Manage Foods
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 min-h-[calc(100vh-2rem)] lg:min-h-0">
          {tab === "orders" && <AdminOrders />}
          {tab === "foods" && <AdminFoods />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;