import { createContext, useEffect, useState } from "react";
import api from "../config/api";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);

  // FOODS
  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoodList(res.data || []);
    } catch (err) {
      console.error("Error fetching foods:", err);
      setFoodList([]);
    }
  };

  // CART 
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");

      const items =
        res.data?.cart?.items ||
        res.data?.items ||
        [];

      let cartData = {};

      items.forEach((item) => {
        const id = String(item.foodId?._id || item.foodId || item._id);
        cartData[id] = item.quantity;
      });

      setCartItems(cartData);
    } catch (err) {
      console.log("Fetch Cart Error:", err);
      setCartItems({});
    }
  };

  // ADD TO CART 
  const addToCart = async (itemId) => {
    const id = String(itemId);

    try {
      await api.post("/cart/add", {
        foodId: id,
        quantity: 1,
      });

      setCartItems((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // REMOVE FROM CART 
  const removeFromCart = async (itemId) => {
    const id = String(itemId);

    try {
      await api.post("/cart/remove", {
        foodId: id,
      });

      setCartItems((prev) => {
        const updated = { ...prev };

        if (updated[id] > 1) {
          updated[id] -= 1;
        } else {
          delete updated[id];
        }

        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  // TOTAL AMOUNT
  const getTotalCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const item = food_list.find((f) => String(f._id) === id);

      if (item) {
        total += item.price * cartItems[id];
      }
    }

    return total;
  };

  // RESET CART
  const resetCart = () => {
    setCartItems({});
  };

  // INIT LOAD 
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchFoods();
      await fetchCart();

      setLoading(false);
    };

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    fetchCart,
    resetCart, // 
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;