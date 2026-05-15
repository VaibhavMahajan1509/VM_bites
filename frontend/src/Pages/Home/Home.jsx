import React, { useState } from "react";
import Header from "../../Component/Header/Header";
import ExploreMenu from "../../Component/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Component/FoodDisplay/FoodDisplay";
import AppDownload from "../../Component/AppDownload/AppDownload";

const Home = () => {

  const [category, setCategory] = useState("All");

  // SEARCH STATE
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* SEARCH BAR */}
        <div className="flex justify-center">

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[500px] border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-red-500"
          />

        </div>

        <ExploreMenu
          category={category}
          setCategory={setCategory}
        />

        <FoodDisplay
          category={category}
          search={search}
        />

        <AppDownload />

      </main>

    </div>
  );
};

export default Home;