import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, search }) => {

  const { food_list } = useContext(StoreContext);

  if (!food_list.length) {
    return <p>Loading...</p>;
  }

  // FILTER LOGIC
  const filteredFoods = food_list.filter((item) => {

    const matchesCategory =
      category === "All" || category === item.category;

    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mt-8">

      {/* NO FOOD FOUND */}
      {filteredFoods.length === 0 ? (

        <p className="text-center text-gray-500 text-lg">
          No food found
        </p>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          {filteredFoods.map((item) => (

            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default FoodDisplay;