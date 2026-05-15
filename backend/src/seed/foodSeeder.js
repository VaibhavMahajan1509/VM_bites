import mongoose from "mongoose";
import Food from "../models/Food.model.js";
import dotenv from "dotenv";

dotenv.config();

  const food_list = [
  {
    name: "Greek salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1778051545/food_1_zfkqcw.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Veg salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986513/food-items/gljxfiddjkq1qjt9ua1u.webp",
    price: 18,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Clover Salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986529/food-items/xjcusdqodqigq57r15i8.webp",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },
  {
    name: "Chicken Salad",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986535/food-items/mlspfdaia4aewqdqfvcj.webp",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Salad"
  },

  {
    name: "Lasagna Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986536/food-items/buxhqv2y7qserwr49ako.webp",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Peri Peri Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986538/food-items/sg88qkrov1ovm2zlco7q.png",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Chicken Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986539/food-items/tbmibk9x7anh1i4dxl8d.webp",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },
  {
    name: "Veg Rolls",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986540/food-items/plvz3rqgzeebqvjkab4f.webp",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Rolls"
  },

  {
    name: "Ripple Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777986543/food-items/pz70fwrxphti33ubk3ja.webp",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts"
  },
  {
    name: "Fruit Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991771/food-items/a5fuoh69z06qjdglvwrm.webp",
    price: 22,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts"
  },
  {
    name: "Jar Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991773/food-items/ti2vmu36nxjppnbfoihv.webp",
    price: 10,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts"
  },
  {
    name: "Vanilla Ice Cream",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991774/food-items/bu7py5go0ftuwdokrwe5.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Deserts"
  },

  {
    name: "Chicken Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991775/food-items/ckvdtbmcmlkyfqdrgdp1.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich"
  },
  {
    name: "Vegan Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991776/food-items/e89ggrqtg9idb90vwtow.webp",
    price: 18,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich"
  },
  {
    name: "Grilled Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991777/food-items/a2vlchy4bykcpbnih1yo.webp",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich"
  },
  {
    name: "Bread Sandwich",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991778/food-items/tzvnwqg8snuqqzumtvuf.webp",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich"
  },

  {
    name: "Cup Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991780/food-items/jq0r5yugthpkjsq6mc3t.webp",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake"
  },
  {
    name: "Vegan Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991781/food-items/mvrbdedyus92tfdxcgek.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake"
  },
  {
    name: "Butterscotch Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991782/food-items/pb96eroxe4scxndggoai.webp",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake"
  },
  {
    name: "Sliced Cake",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991784/food-items/xt7sjz31drfy0wnpnev6.webp",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Cake"
  },

  {
    name: "Garlic Mushroom",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991785/food-items/cwgverxdef2us4ymkkk3.webp",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg"
  },
  {
    name: "Fried Cauliflower",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991786/food-items/wuve0jdwvkohqgjmzked.webp",
    price: 22,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg"
  },
  {
    name: "Mix Veg Pulao",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991787/food-items/suvv2odlxxprwexnpxtq.webp",
    price: 10,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg"
  },
  {
    name: "Rice Zucchini",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991789/food-items/nchx6x9zojruarhgk6qq.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg"
  },

  {
    name: "Cheese Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991790/food-items/zsyxm0kkrnnbtmaqcbt9.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta"
  },
  {
    name: "Tomato Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991791/food-items/uvndgfq5eis1fokuwrs5.webp",
    price: 18,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta"
  },
  {
    name: "Creamy Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991792/food-items/oazlkwrjj8wzhunjaltg.webp",
    price: 16,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta"
  },
  {
    name: "Chicken Pasta",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991794/food-items/zuykismispcklvcqkwmg.webp",
    price: 24,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Pasta"
  },

  {
    name: "Butter Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991795/food-items/wv8nncggroethh4msjxs.webp",
    price: 14,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles"
  },
  {
    name: "Veg Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991797/food-items/dvueeaqsx0kk2johcyjg.webp",
    price: 12,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles"
  },
  {
    name: "Somen Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991799/food-items/bro3szwxtva2ybqxy7h3.webp",
    price: 20,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles"
  },
  {
    name: "Cooked Noodles",
    image: "https://res.cloudinary.com/dequpz6ey/image/upload/v1777991800/food-items/fwoi7jmgfot7hfu98ned.webp",
    price: 15,
    description: "Food provides essential nutrients for overall health and well-being",
    category: "Noodles"
  }
];

const seedFoods = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await Food.deleteMany({});
    console.log("🧹 Old data removed");

    await Food.insertMany(food_list);
    console.log("🍔 Food inserted");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log("❌ Seeder Error:", error);
    process.exit(1);
  }
};

seedFoods();