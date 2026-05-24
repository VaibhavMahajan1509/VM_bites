// AdminFoods.jsx

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

  // FETCH LOADING
  const [fetchLoading, setFetchLoading] = useState(true);

  // EDIT STATE
  const [editId, setEditId] = useState(null);

  // FETCH FOODS
  const fetchFoods = async () => {
    try {

      setFetchLoading(true);

      const res = await api.get("/foods");

      setFoods(res.data || []);

    } catch (err) {

      console.log("Fetch Foods Error:", err);

    } finally {

      setFetchLoading(false);
    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // EDIT FOOD
  const editFood = (food) => {
    setEditId(food._id);

    setForm({
      name: food.name,
      price: food.price,
      image: food.image,
      description: food.description,
      category: food.category,
    });
  };

  // ADD / UPDATE FOOD
  const addFood = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      if (editId) {

        await api.put(`/admin/food/${editId}`, form);

        alert("Food updated successfully");

        setEditId(null);

      } else {

        await api.post("/admin/food", form);

        alert("Food added successfully");
      }

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });

      fetchFoods();

    } catch (err) {

      console.log("Food Error:", err);

      alert(
        err.response?.data?.message || "Operation failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // DELETE FOOD
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

  // LOAD DATA
  useEffect(() => {
    fetchFoods();
  }, []);

  // LOADING UI
  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">

        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-600 text-lg font-medium">
            Loading foods...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Manage Foods
      </h1>

      {/* FORM */}
      <form
        onSubmit={addFood}
        className="bg-white p-4 sm:p-5 rounded shadow mb-8 grid gap-3"
      >

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          rows="3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded"
        >
          {loading
            ? editId
              ? "Updating..."
              : "Adding..."
            : editId
            ? "Update Food"
            : "Add Food"}
        </button>

      </form>

      {/* FOOD LIST */}
      <div className="grid gap-4">

        {foods.length === 0 ? (
          <p>No foods found</p>
        ) : (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >

              {/* LEFT */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">

                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded shrink-0"
                />

                <div>
                  <h2 className="font-semibold text-lg break-words">
                    {food.name}
                  </h2>

                  <p className="text-gray-600">
                    ₹{food.price}
                  </p>

                  <p className="text-sm text-gray-500 break-words">
                    {food.category}
                  </p>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap justify-center gap-2 w-full sm:w-auto">

                <button
                  onClick={() => editFood(food)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFood(food._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default AdminFoods;