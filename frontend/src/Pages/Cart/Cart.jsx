import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems = {},
    food_list = [],
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const isCartEmpty = !Object.values(cartItems).some((qty) => qty > 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-24 min-h-screen px-4">

      {/* HEADER */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-gray-500 font-medium">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr className="my-2" />

      {/* EMPTY CART */}
      {isCartEmpty ? (
        <div className="text-center mt-10">
          <p className="text-lg">Cart is empty</p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Go Home
          </button>
        </div>
      ) : (
        food_list
          .filter((item) => cartItems[String(item._id)] > 0)
          .map((item) => {
            const id = String(item._id);
            const qty = cartItems[id] || 0;

            return (
              <div key={id}>
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center py-3">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[50px]"
                  />

                  <p>{item.name}</p>

                  <p>${item.price}</p>

                  <p>{qty}</p>

                  <p>${item.price * qty}</p>

                  <p
                    onClick={() => removeFromCart(id)}
                    className="cursor-pointer text-red-500"
                  >
                    x
                  </p>

                </div>

                <hr />
              </div>
            );
          })
      )}

      {/* TOTAL */}
      {!isCartEmpty && (
        <div className="mt-10 flex flex-col items-end gap-4">
          <h2 className="text-xl font-semibold">
            Total: ${getTotalCartAmount()}
          </h2>

          <button
            onClick={() => navigate("/order")}
            className="bg-red-500 text-white px-6 py-2 rounded"
          >
            PLACE ORDER
          </button>
        </div>
      )}

    </div>
  );
};

export default Cart;