import React, { useState } from "react";

import AdminOrders from "./AdminOrders";
import AdminFoods from "./AdminFoods";

const AdminDashboard = () => {
  const [tab, setTab] = useState("orders");

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <div className="w-[250px] bg-gray-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-3">

          <button
            onClick={() => setTab("orders")}
            className={`p-3 rounded text-left transition ${
              tab === "orders"
                ? "bg-red-500"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setTab("foods")}
            className={`p-3 rounded text-left transition ${
              tab === "foods"
                ? "bg-red-500"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Manage Foods
          </button>

        </div>
      </div>

      {/*  CONTENT  */}
      <div className="flex-1 bg-gray-100 p-6">

        {tab === "orders" && <AdminOrders />}

        {tab === "foods" && <AdminFoods />}

      </div>
    </div>
  );
};

export default AdminDashboard;