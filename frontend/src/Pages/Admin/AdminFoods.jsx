import React, { useEffect, useState } from "react";
import api from "../../config/api";

const AdminFoods = () => {
  const [foods, setFoods] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= FETCH FOODS =================
  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");

      setFoods(res.data || []);
    } catch (err) {
      console.log("Fetch Foods Error:", err);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD FOOD =================
  const addFood = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/admin/food", form);

      alert("Food added successfully");

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });

      fetchFoods();

    } catch (err) {
      console.log("Add Food Error:", err);

      alert(
        err.response?.data?.message || "Failed to add food"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE FOOD =================
  const deleteFood = async (id) => {
    try {

      const confirmDelete = window.confirm(
        "Delete this food item?"
      );

      if (!confirmDelete) return;

      await api.delete(`/admin/food/${id}`);

      alert("Food deleted");

      fetchFoods();

    } catch (err) {
      console.log("Delete Food Error:", err);

      alert(
        err.response?.data?.message || "Failed to delete"
      );
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="p-6">

      {/* ================= TITLE ================= */}
      <h1 className="text-3xl font-bold mb-6">
        Manage Foods
      </h1>

      {/* ================= ADD FOOD FORM ================= */}
      <form
        onSubmit={addFood}
        className="bg-white p-5 rounded shadow mb-8 grid gap-3"
      >

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded"
          rows="3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>

      </form>

      {/* ================= FOOD LIST ================= */}
      <div className="grid gap-4">

        {foods.length === 0 ? (
          <p>No foods found</p>
        ) : (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >

              <div className="flex items-center gap-4">

                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    {food.name}
                  </h2>

                  <p className="text-gray-600">
                    ₹{food.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    {food.category}
                  </p>
                </div>

              </div>

              <button
                onClick={() => deleteFood(food._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default AdminFoods;