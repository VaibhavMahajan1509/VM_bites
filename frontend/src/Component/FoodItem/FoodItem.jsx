import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  const idStr = String(id);

  return (
    <div className="w-full mx-auto rounded-2xl shadow-md overflow-hidden bg-white">

      {/* IMAGE SECTION */}
      <div className="relative">
        <img
          className="w-full h-[200px] object-cover"
          src={image}
          alt={name}
        />

        {!cartItems[idStr] ? (
          <img
            className="w-[35px] absolute bottom-4 right-4 cursor-pointer"
            onClick={() => addToCart(idStr)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow">

            <img
              onClick={() => removeFromCart(idStr)}
              src={assets.remove_icon_red}
              className="w-[30px] cursor-pointer"
              alt="Remove item"
            />

            <p className="font-medium">
              {cartItems[idStr]}
            </p>

            <img
              onClick={() => addToCart(idStr)}
              src={assets.add_icon_green}
              className="w-[30px] cursor-pointer"
              alt="Increase item"
            />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <p className="text-lg font-semibold">
          {name}
        </p>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

        <p className="text-red-500 font-medium mt-3">
          ₹{Number(price)}
        </p>

      </div>
    </div>
  );
}

export default FoodItem;