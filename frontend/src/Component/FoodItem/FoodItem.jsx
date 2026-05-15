import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const idStr = String(id);
  
  console.log("ID:", idStr);
  console.log("Cart:", cartItems);

  return (
    <div className="w-full mx-auto rounded-2xl shadow-md">
      <div className="relative">
        <img className="w-full h-[200px] object-cover" src={image} alt={name} />

        {!cartItems[idStr] ? (
          <img
            className="w-[35px] absolute bottom-4 right-4 cursor-pointer"
            onClick={() => addToCart(idStr)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex gap-2 bg-white p-1 rounded-full">
            <img
              onClick={() => removeFromCart(idStr)}
              src={assets.remove_icon_red}
              className="w-[30px] cursor-pointer"
              alt="Remove item"
            />
            <p>{cartItems[idStr]}</p>
            <img
              onClick={() => addToCart(idStr)}
              src={assets.add_icon_green}
              className="w-[30px] cursor-pointer"
              alt="Increase item"
            />
          </div>
        )}
      </div>

      <div className="p-5">
        <p>{name}</p>
        <p>${Number(price)}</p>
      </div>
    </div>
  );
}

export default FoodItem;