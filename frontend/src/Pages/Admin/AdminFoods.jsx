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
  const [fetchLoading, setFetchLoading] = useState(true);
  const [editId, setEditId] = useState(null);

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this food item?");
      if (!confirmDelete) return;

      await api.delete(`/admin/food/${id}`);
      alert("Food deleted");
      fetchFoods();
    } catch (err) {
      console.log("Delete Food Error:", err);
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            Loading foods...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Foods
        </h1>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                name: "",
                price: "",
                image: "",
                description: "",
                category: "",
              });
            }}
            className="text-sm sm:text-base text-red-600 hover:text-red-700 font-medium"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form
        onSubmit={addFood}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 mb-8 grid gap-3 sm:gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          rows="4"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-medium transition duration-200"
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

      <div className="grid gap-4">
        {foods.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center text-gray-500">
            No foods found
          </div>
        ) : (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0 border border-gray-200"
                />

                <div className="max-w-full">
                  <h2 className="font-semibold text-lg text-gray-900 break-words">
                    {food.name}
                  </h2>
                  <p className="text-gray-700 font-medium">₹{food.price}</p>
                  <p className="text-sm text-gray-500 break-words">
                    {food.category}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 break-words">
                    {food.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => editFood(food)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFood(food._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto transition"
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